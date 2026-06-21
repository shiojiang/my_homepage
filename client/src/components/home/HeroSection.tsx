import { motion } from 'framer-motion'
import { MapPin, Calendar, Github, Twitter, Mail } from 'lucide-react'
import { SkeletonHero } from '@/components/common/SkeletonCard'

interface HeroSectionProps {
  username?: string
  bio?: string
  location?: string
  createdAt?: string
  isLoading?: boolean
}

export default function HeroSection({ username, bio, location, createdAt, isLoading }: HeroSectionProps) {
  if (isLoading) return <SkeletonHero />

  const joinYear = createdAt ? new Date(createdAt).getFullYear() : '—'

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-bilibili-pink via-bilibili-pink-light to-bilibili-blue p-8 md:p-12"
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
          className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-6 border-2 border-white/30"
        >
          <span className="text-white text-3xl font-bold">{username?.[0]?.toUpperCase() || '👋'}</span>
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
          你好，我是 <span className="underline decoration-white/40 underline-offset-4">{username || '开发者'}</span>
        </h1>
        <p className="text-white/80 text-lg max-w-lg mb-6">
          {bio || 'Full Stack Developer · 热爱技术与创造 · 记录学习与生活'}
        </p>

        <div className="flex flex-wrap gap-4 text-white/70 text-sm">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" /> {location || '中国'}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" /> 加入于 {joinYear}
          </span>
        </div>

        <div className="flex gap-3 mt-6">
          {[
            { icon: Github, label: 'GitHub' },
            { icon: Twitter, label: 'Twitter' },
            { icon: Mail, label: 'Email' },
          ].map(({ icon: Icon, label }) => (
            <motion.a
              key={label}
              href="#"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              title={label}
            >
              <Icon className="w-5 h-5" />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
