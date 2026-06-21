import { motion } from 'framer-motion'

interface PostCardProps {
  title: string
  summary?: string | null
  category: string
  tags: string[]
  createdAt: string
  commentCount: number
  likeCount: number
}

export default function PostCard({ title, summary, category, tags, createdAt, commentCount, likeCount }: PostCardProps) {
  return (
    <motion.article
      whileHover={{ scale: 1.01 }}
      className="bg-card border border-border rounded-xl p-5 flex gap-4 items-start cursor-pointer group"
    >
      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-bilibili-pink/20 to-bilibili-blue/20 flex-shrink-0 flex items-center justify-center text-2xl">
        {tags[0] ? tags[0].charAt(0).toUpperCase() : '📄'}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-medium group-hover:text-primary transition-colors truncate">
          {title}
        </h3>
        {summary && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{summary}</p>
        )}
        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
          <span>{new Date(createdAt).toLocaleDateString('zh-CN')}</span>
          <span>·</span>
          <span>{category}</span>
          <span>·</span>
          <span>{likeCount} 赞</span>
          <span>·</span>
          <span>{commentCount} 评论</span>
        </div>
      </div>
    </motion.article>
  )
}
