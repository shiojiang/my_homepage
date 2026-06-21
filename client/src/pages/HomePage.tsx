import { motion } from 'framer-motion'
import { Github, Twitter, Mail, MapPin, Calendar, ArrowRight } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function HomePage() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* Hero Section */}
      <motion.section
        variants={itemVariants}
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
            <span className="text-white text-3xl font-bold">👋</span>
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            你好，我是 <span className="underline decoration-white/40 underline-offset-4">开发者</span>
          </h1>
          <p className="text-white/80 text-lg max-w-lg mb-6">
            Full Stack Developer · 热爱技术与创造 · 记录学习与生活
          </p>

          <div className="flex flex-wrap gap-4 text-white/70 text-sm">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" /> 中国
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> 加入于 2026
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

      {/* Stats Cards */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: '文章', value: '0', icon: '📝' },
          { label: '项目', value: '0', icon: '🚀' },
          { label: '标签', value: '0', icon: '🏷️' },
          { label: '友链', value: '0', icon: '🔗' },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-card border border-border rounded-xl p-5 text-center"
          >
            <span className="text-2xl">{stat.icon}</span>
            <p className="text-2xl font-bold mt-2">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Posts Section */}
      <motion.section variants={itemVariants}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">最新动态</h2>
          <motion.a
            href="#"
            whileHover={{ x: 4 }}
            className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            查看全部 <ArrowRight className="w-4 h-4" />
          </motion.a>
        </div>

        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <motion.article
              key={i}
              whileHover={{ scale: 1.01 }}
              className="bg-card border border-border rounded-xl p-5 flex gap-4 items-start cursor-pointer group"
            >
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-bilibili-pink/20 to-bilibili-blue/20 flex-shrink-0 flex items-center justify-center text-2xl">
                📄
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium group-hover:text-primary transition-colors truncate">
                  欢迎来到我的个人空间
                </h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  这是一个使用 React + Nest.js 构建的全栈个人首页项目。你可以在这里发布动态、管理内容、展示作品。
                </p>
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span>2026-06-21</span>
                  <span>·</span>
                  <span>公告</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>
    </motion.div>
  )
}
