import { motion } from 'framer-motion'
import { SkeletonStats } from '@/components/common/SkeletonCard'

interface StatsDashboardProps {
  posts?: number
  comments?: number
  tags?: number
  links?: number
  isLoading?: boolean
}

const statsConfig = [
  { key: 'posts', label: '文章', icon: '📝' },
  { key: 'comments', label: '评论', icon: '💬' },
  { key: 'tags', label: '标签', icon: '🏷️' },
  { key: 'links', label: '友链', icon: '🔗' },
] as const

export default function StatsDashboard({ posts = 0, comments = 0, tags = 0, links = 0, isLoading }: StatsDashboardProps) {
  if (isLoading) return <SkeletonStats />

  const values: Record<string, number> = { posts, comments, tags, links }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4"
    >
      {statsConfig.map(({ key, label, icon }) => (
        <motion.div
          key={key}
          whileHover={{ scale: 1.02, y: -2 }}
          className="bg-card border border-border rounded-xl p-5 text-center"
        >
          <span className="text-2xl">{icon}</span>
          <p className="text-2xl font-bold mt-2">{values[key]}</p>
          <p className="text-sm text-muted-foreground">{label}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}
