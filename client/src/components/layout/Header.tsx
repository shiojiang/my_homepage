import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Bell, Sun, Moon, LogOut, User, Settings, LogIn } from 'lucide-react'
import { useThemeStore } from '@/stores/themeStore'
import { useAuthStore } from '@/stores/authStore'
import { useSearchStore } from '@/stores/searchStore'
import SearchBar from '@/components/common/SearchBar'
import { useState, useRef, useEffect } from 'react'

export default function Header() {
  const { theme, toggleTheme } = useThemeStore()
  const { keyword, setKeyword } = useSearchStore()
  const { isLoggedIn, user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
      <SearchBar value={keyword} onChange={setKeyword} />

      <div className="flex items-center gap-3 ml-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 rounded-full hover:bg-muted transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-bilibili-pink rounded-full" />
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-muted transition-colors"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </motion.button>

        {/* 登录态 */}
        {isLoggedIn ? (
          <div className="relative" ref={menuRef}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 rounded-full bg-gradient-to-br from-bilibili-pink to-bilibili-blue flex items-center justify-center cursor-pointer"
            >
              <span className="text-white text-sm font-semibold">
                {user?.username?.charAt(0).toUpperCase() || '我'}
              </span>
            </motion.div>

            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-12 w-40 bg-card border border-border rounded-lg shadow-lg py-1 z-50"
              >
                <span className="block px-4 py-2 text-xs text-muted-foreground border-b border-border">
                  {user?.username}
                </span>
                <Link
                  to="/settings"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent transition-colors"
                >
                  <Settings className="w-4 h-4" /> 设置
                </Link>
                <button
                  onClick={() => { logout(); setMenuOpen(false); navigate('/') }}
                  className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-accent transition-colors w-full text-left text-destructive"
                >
                  <LogOut className="w-4 h-4" /> 退出
                </button>
              </motion.div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
          >
            <LogIn className="w-4 h-4" />
            登录
          </Link>
        )}
      </div>
    </header>
  )
}
