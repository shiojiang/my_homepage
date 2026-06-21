import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'
import { hashPassword } from '../src/common/crypto'

config() // 加载 .env

const prisma = new PrismaClient()

async function main() {
  // 创建管理员用户
  const password = hashPassword('admin123')
  const user = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@example.com',
      password,
      bio: '全栈开发者，热爱技术与创造',
      location: '中国',
      website: 'https://example.com',
    },
  })

  // 创建示例文章
  const posts = [
    {
      title: '欢迎来到我的个人空间',
      content: '这是一个使用 React + Nest.js + SQLite 构建的全栈个人首页项目。\n\n技术栈：\n- 前端：React 18 + TypeScript + Vite + Tailwind CSS\n- 后端：Nest.js + Prisma\n- 数据库：SQLite\n\n你可以在这里发布动态、管理内容、展示作品。',
      summary: '全栈个人首页项目介绍',
      category: 'tech',
      tags: JSON.stringify(['React', 'Nest.js', 'TypeScript']),
      published: true,
    },
    {
      title: '为什么选择 React 作为前端框架',
      content: 'React 拥有最丰富的生态系统，Hooks 让状态管理变得简单，函数式编程思维让代码更可预测。\n\n配合 Vite 的极速开发体验和 Tailwind CSS 的原子化样式，开发效率极高。',
      summary: 'React 框架选择与思考',
      category: 'tech',
      tags: JSON.stringify(['React', '前端']),
      published: true,
    },
    {
      title: '2026 学习计划与目标',
      content: '新的一年，继续深入学习全栈技术栈：\n1. 深入 Nest.js 微服务架构\n2. 学习 Docker 与 K8s\n3. 掌握 CI/CD 自动化部署\n4. 阅读 12 本技术书籍',
      summary: '年度学习计划',
      category: 'life',
      tags: JSON.stringify(['学习', '规划']),
      published: true,
    },
  ]

  for (const post of posts) {
    await prisma.post.create({
      data: {
        ...post,
        authorId: user.id,
      },
    })
  }

  console.log('✅ Seed data created successfully')
  console.log(`   User: admin@example.com / admin123`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
