import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { usePosts } from '@/hooks/usePosts'
import { useSearchStore } from '@/stores/searchStore'
import PostCard from './PostCard'
import CategoryFilter from './CategoryFilter'
import Pagination from './Pagination'
import { SkeletonCard } from '@/components/common/SkeletonCard'
import EmptyState from '@/components/common/EmptyState'

export default function PostList() {
  const { keyword } = useSearchStore()
  const [category, setCategory] = useState('')
  const [page, setPage] = useState(1)

  const { data, isLoading } = usePosts({
    page,
    pageSize: 10,
    category: category || undefined,
    keyword: keyword || undefined,
  })

  const posts = data?.items ?? []
  const total = data?.total ?? 0

  // 切换分类时重置页码
  const handleCategoryChange = (c: string) => {
    setCategory(c)
    setPage(1)
  }

  if (isLoading) {
    return (
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">最新动态</h2>
        </div>
        <div className="grid gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">最新动态</h2>
        <motion.a
          href="/posts"
          whileHover={{ x: 4 }}
          className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
        >
          查看全部 <ArrowRight className="w-4 h-4" />
        </motion.a>
      </div>

      {/* 分类筛选 */}
      <div className="mb-4">
        <CategoryFilter selected={category} onChange={handleCategoryChange} />
      </div>

      {/* 文章列表 */}
      {posts.length === 0 ? (
        <EmptyState
          title={keyword || category ? '未找到相关内容' : '暂无动态'}
          description={keyword ? `未找到与"${keyword}"相关的内容` : '这里还没有发布任何内容'}
        />
      ) : (
        <>
          <div className="grid gap-4">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                summary={post.summary}
                category={post.category}
                tags={post.tags}
                createdAt={post.createdAt}
                commentCount={post._count.comments}
                likeCount={post._count.likes}
              />
            ))}
          </div>

          {/* 分页 */}
          <Pagination
            page={page}
            pageSize={10}
            total={total}
            onChange={setPage}
          />
        </>
      )}
    </motion.section>
  )
}
