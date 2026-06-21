import { motion } from 'framer-motion'
import HeroSection from '@/components/home/HeroSection'
import StatsDashboard from '@/components/home/StatsDashboard'
import PostList from '@/components/home/PostList'
import { useAuthStore } from '@/stores/authStore'
import { useUser } from '@/hooks/useUser'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

export default function HomePage() {
  const authUser = useAuthStore((s) => s.user)
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn)
  const { data: defaultUser, isLoading: userLoading } = useUser()

  // 优先用登录用户，否则用 API 首个用户
  const displayUser = isLoggedIn && authUser
    ? { ...authUser, bio: null, location: null, createdAt: '', _count: { posts: 0, comments: 0 } }
    : defaultUser

  const isLoading = isLoggedIn ? false : userLoading

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto space-y-8"
    >
      <HeroSection
        username={displayUser?.username}
        bio={displayUser?.bio ?? undefined}
        location={displayUser?.location ?? undefined}
        createdAt={displayUser?.createdAt}
        isLoading={isLoading && !displayUser}
      />

      <StatsDashboard
        posts={displayUser?._count?.posts}
        comments={displayUser?._count?.comments}
        isLoading={isLoading && !displayUser}
      />

      <PostList />
    </motion.div>
  )
}
