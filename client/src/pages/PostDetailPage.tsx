import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Eye, Tag } from 'lucide-react'
import { motion } from 'framer-motion'
import { usePost } from '@/hooks/usePost'
import { SkeletonHero } from '@/components/common/SkeletonCard'

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data: post, isLoading } = usePost(id!)

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <SkeletonHero />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto text-center py-20">
        <h2 className="text-2xl font-bold mb-2">文章不存在</h2>
        <p className="text-muted-foreground mb-4">该文章可能已被删除或链接无效</p>
        <Link to="/" className="text-primary hover:underline text-sm">
          ← 返回首页
        </Link>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      {/* 返回按钮 */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        返回
      </Link>

      {/* 标题 & 元信息 */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {new Date(post.createdAt).toLocaleDateString('zh-CN')}
          </span>
          <span className="flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            {post.viewCount} 次阅读
          </span>
          <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs">
            {post.category}
          </span>
        </div>
      </header>

      {/* 标签 */}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <Tag className="w-4 h-4 text-muted-foreground" />
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 bg-muted rounded-full text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* 正文 */}
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        {post.content.split('\n').map((line, i) => (
          <p key={i} className="mb-3 leading-relaxed">
            {line}
          </p>
        ))}
      </article>

      {/* 底部 */}
      <footer className="mt-10 pt-6 border-t border-border text-sm text-muted-foreground">
        <span>{post.author.username}</span>
        <span className="mx-2">·</span>
        <span>{post._count.likes} 赞</span>
        <span className="mx-2">·</span>
        <span>{post._count.comments} 评论</span>
      </footer>
    </motion.div>
  )
}
