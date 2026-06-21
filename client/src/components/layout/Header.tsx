import { motion } from 'framer-motion'
import { Bell, Sun, Moon } from 'lucide-react'
import { useThemeStore } from '@/stores/themeStore'
import { useSearchStore } from '@/stores/searchStore'
import SearchBar from '@/components/common/SearchBar'

export default function Header() {
  const { theme, toggleTheme } = useThemeStore()
  const { keyword, setKeyword } = useSearchStore()

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
      {/* Search Bar */}
      <SearchBar value={keyword} onChange={setKeyword} />

      {/* Right Actions */}
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
