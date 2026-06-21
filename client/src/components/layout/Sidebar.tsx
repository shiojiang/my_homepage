import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, User, FileText, Mail, Settings, PanelLeftClose, PanelLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useSidebarStore } from '@/stores/sidebarStore'

const navItems = [
  { to: '/', icon: Home, label: '首页' },
  { to: '/about', icon: User, label: '关于' },
  { to: '/posts', icon: FileText, label: '动态' },
  { to: '/contact', icon: Mail, label: '联系' },
  { to: '/settings', icon: Settings, label: '设置' },
]

export default function Sidebar() {
  const { collapsed, toggle } = useSidebarStore()

  return (
    <aside
      className={cn(
        'border-r border-border bg-card flex flex-col transition-all duration-300',
        collapsed ? 'w-16' : 'w-60',
      )}
    >
      {/* Logo */}
      <div className={cn('h-16 flex items-center border-b border-border', collapsed ? 'justify-center' : 'px-6')}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="w-8 h-8 rounded-lg bg-bilibili-pink flex items-center justify-center flex-shrink-0"
        >
          <span className="text-white font-bold text-sm">H</span>
        </motion.div>
        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="font-semibold text-lg ml-3 whitespace-nowrap overflow-hidden"
            >
              My Space
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            title={collapsed ? item.label : undefined}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                collapsed && 'justify-center px-2',
                isActive
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
              )
            }
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>

      {/* Toggle + Footer */}
      <div className={cn('border-t border-border', collapsed ? 'p-2' : 'p-4')}>
        <button
          onClick={toggle}
          className={cn(
            'flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors w-full',
            collapsed ? 'justify-center p-2' : 'px-3 py-2',
          )}
        >
          {collapsed ? (
            <PanelLeft className="w-4 h-4" />
          ) : (
            <>
              <PanelLeftClose className="w-4 h-4" />
              <span>收起侧边栏</span>
            </>
          )}
        </button>
        <AnimatePresence>
          {!collapsed && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xs text-muted-foreground text-center mt-3"
            >
              © 2026 My Homepage
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </aside>
  )
}
