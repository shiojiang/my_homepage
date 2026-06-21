import { motion } from 'framer-motion'
import { Search, Bell, Sun, Moon } from 'lucide-react'
import { useThemeStore } from '@/stores/themeStore'
import { cn } from '@/lib/utils'

export default function Header() {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
      {/* Search Bar */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="搜索内容..."
            className="w-full pl-10 pr-4 py-2 rounded-full bg-muted text-sm border border-transparent focus:border-primary/50 focus:bg-background transition-all duration-200 outline-none"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3">
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
          {theme === 'dark' ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </motion.button>

        {/* Avatar */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-9 h-9 rounded-full bg-gradient-to-br from-bilibili-pink to-bilibili-blue flex items-center justify-center cursor-pointer"
        >
          <span className="text-white text-sm font-semibold">我</span>
        </motion.div>
      </div>
    </header>
  )
}
