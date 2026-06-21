import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Save, User, MapPin, Globe, FileText } from 'lucide-react'
import api from '@/services/api'
import { useAuthStore } from '@/stores/authStore'

export default function SettingsPage() {
  const user = useAuthStore((s) => s.user)
  const setUser = useAuthStore((s) => s.setUser)

  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [location, setLocation] = useState('')
  const [website, setWebsite] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  // 加载当前资料
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return
      try {
        const res = await api.get(`/users/${user.id}`) as any
        setUsername(res.username || '')
        setBio(res.bio || '')
        setLocation(res.location || '')
        setWebsite(res.website || '')
      } catch { /* ignore */ }
    }
    loadProfile()
  }, [user])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const res = await api.put('/users/profile', { username, bio, location, website }) as any
      setUser({ ...user!, username: res.username })
      setMessage('保存成功')
    } catch (err: any) {
      setMessage(err?.response?.data?.message || '保存失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-bold mb-6">个人设置</h1>

        <form onSubmit={handleSave} className="bg-card border border-border rounded-xl p-6 space-y-4">
          {message && (
            <div className={`text-sm p-3 rounded-lg ${message.includes('成功') ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'}`}>
              {message}
            </div>
          )}

          <div>
            <label className="text-sm font-medium mb-1.5 block">昵称</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                maxLength={20}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-transparent focus:border-primary/50 outline-none text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">简介</label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                maxLength={200}
                rows={2}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-transparent focus:border-primary/50 outline-none text-sm transition-all resize-none"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">所在地</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                maxLength={50}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-transparent focus:border-primary/50 outline-none text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">个人网站</label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-transparent focus:border-primary/50 outline-none text-sm transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-bilibili-pink to-bilibili-blue text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            {loading ? '保存中...' : '保存'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
