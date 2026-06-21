import { motion } from 'framer-motion'
import HeroSection from '@/components/home/HeroSection'
import StatsDashboard from '@/components/home/StatsDashboard'
import PostList from '@/components/home/PostList'
import { useUser } from '@/hooks/useUser'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

export default function HomePage() {
  const { data: user, isLoading: userLoading } = useUser()

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* Hero 区 — 真实用户信息 */}
      <HeroSection
        username={user?.username}
        bio={user?.bio ?? undefined}
        location={user?.location ?? undefined}
        createdAt={user?.createdAt}
        isLoading={userLoading}
      />

      {/* 统计面板 — 真实数据 */}
      <StatsDashboard
        posts={user?._count.posts}
        comments={user?._count.comments}
        isLoading={userLoading}
      />

      {/* 文章列表 — 搜索+分页 */}
      <PostList />
    </motion.div>
  )
}
