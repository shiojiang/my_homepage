import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, User, FileText, Mail, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/', icon: Home, label: '首页' },
  { to: '/about', icon: User, label: '关于' },
  { to: '/posts', icon: FileText, label: '动态' },
  { to: '/contact', icon: Mail, label: '联系' },
  { to: '/settings', icon: Settings, label: '设置' },
]

export default function Sidebar() {
  return (
    <aside className="w-60 border-r border-border bg-card flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="w-8 h-8 rounded-lg bg-bilibili-pink flex items-center justify-center mr-3"
        >
          <span className="text-white font-bold text-sm">H</span>
        </motion.div>
        <span className="font-semibold text-lg">My Space</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              )
            }
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          © 2026 My Homepage
        </p>
      </div>
    </aside>
  )
}
