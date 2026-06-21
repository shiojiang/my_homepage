import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Mail, Lock, UserPlus } from 'lucide-react'
import api from '@/services/api'
import { useAuthStore } from '@/stores/authStore'

export default function RegisterPage() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await api.post('/auth/register', { username, email, password }) as any
      login(res.accessToken, res.user)
      navigate('/')
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || '注册失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-bilibili-pink to-bilibili-blue flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold">创建账号</h1>
          <p className="text-sm text-muted-foreground mt-1">加入你的个人空间</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 space-y-4">
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">{error}</div>
          )}

          <div>
            <label className="text-sm font-medium mb-1.5 block">用户名</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={2}
                placeholder="请输入用户名"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-transparent focus:border-primary/50 focus:bg-background outline-none text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">邮箱</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="请输入邮箱"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-transparent focus:border-primary/50 focus:bg-background outline-none text-sm transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1.5 block">密码</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="请输入密码（至少6位）"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-muted border border-transparent focus:border-primary/50 focus:bg-background outline-none text-sm transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-bilibili-pink to-bilibili-blue text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? '注册中...' : '注册'}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            已有账号？{' '}
            <Link to="/login" className="text-primary hover:underline">
              立即登录
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  )
}
