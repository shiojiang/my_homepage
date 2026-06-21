import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const CATEGORIES = [
  { key: '', label: '全部' },
  { key: 'tech', label: '技术' },
  { key: 'life', label: '生活' },
  { key: 'general', label: '综合' },
]

interface CategoryFilterProps {
  selected: string
  onChange: (category: string) => void
}

export default function CategoryFilter({ selected, onChange }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {CATEGORIES.map(({ key, label }) => (
        <motion.button
          key={key}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onChange(key)}
          className={cn(
            'px-4 py-1.5 rounded-full text-sm font-medium transition-colors border',
            selected === key
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-card text-muted-foreground border-border hover:bg-accent',
          )}
        >
          {label}
        </motion.button>
      ))}
    </div>
  )
}
