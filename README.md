# My Homepage - 个人首页全栈项目

## 🛠 技术栈

| 层级 | 技术 | 版本 | 用途 |
|------|------|------|------|
| **语言** | TypeScript | ^5.x | 前后端统一类型安全 |
| **前端框架** | React | ^18.x | UI 构建 |
| **构建工具** | Vite | ^5.x | 秒级热更新，开发体验极佳 |
| **路由** | React Router | ^6.x | SPA 前端路由 |
| **状态管理** | Zustand | ^4.x | 全局状态（主题、用户等） |
| **数据请求** | TanStack Query (React Query) | ^5.x | 服务端状态、缓存、自动刷新 |
| **HTTP 客户端** | Axios | ^1.x | API 请求封装 + 拦截器 |
| **CSS 框架** | Tailwind CSS | ^3.x | 原子化样式 |
| **UI 组件** | shadcn/ui | latest | 源码级可定制组件库 |
| **动画** | Framer Motion | ^11.x | 页面过渡、交互动效 |
| **图标** | Lucide React | latest | 现代 SVG 图标库 |
| **后端框架** | Nest.js | ^10.x | 模块化企业级后端架构 |
| **ORM** | Prisma | ^5.x | 类型安全的数据库操作 |
| **数据库** | PostgreSQL | ^16.x | 关系型数据库 |
| **认证** | JWT + bcrypt | latest | 用户认证与密码加密 |
| **文件上传** | Multer | ^1.x | 头像/封面等静态资源 |
| **API 文档** | Swagger (Nest.js) | latest | 自动生成 RESTful 文档 |
| **参数校验** | class-validator | ^0.14 | DTO 自动校验 |
| **包管理** | pnpm | latest | Monorepo 工作空间 |
| **容器化** | Docker + Docker Compose | latest | 一键部署（PG + Server + Nginx） |

## 🚀 快速开始

### 前置要求

- Node.js >= 18
- pnpm >= 8
- Docker & Docker Compose (用于数据库)

### 安装依赖

```bash
pnpm install
```

### 启动数据库

```bash
docker-compose up -d postgres
```

### 初始化数据库

```bash
pnpm db:push
```

### 启动开发环境

```bash
# 同时启动前后端
pnpm dev

# 或分别启动
pnpm dev:client   # 前端 http://localhost:5173
pnpm dev:server   # 后端 http://localhost:3000
```

### API 文档

后端启动后访问: http://localhost:3000/api/docs

## 📁 项目结构

```
my-homepage/
├── client/                # React 前端
│   ├── src/
│   │   ├── components/    # 通用组件 + shadcn/ui
│   │   ├── pages/         # 路由页面
│   │   ├── hooks/         # 自定义 Hooks
│   │   ├── stores/        # Zustand 状态
│   │   ├── services/      # API 请求封装
│   │   ├── lib/           # 工具函数
│   │   └── types/         # TypeScript 类型
├── server/                # Nest.js 后端
│   ├── src/
│   │   └── modules/       # 功能模块
│   └── prisma/            # 数据库 Schema
└── docker-compose.yml     # 容器编排
```

## 🎯 复杂度递进路线

| 阶段 | 功能 | 技术点 |
|------|------|--------|
| **P0** 基础 | 个人主页展示、个人信息编辑、社交链接 | 静态页面 → 响应式布局 → API 对接 |
| **P1** 动态 | 博客/动态列表、分类筛选、搜索、分页 | RESTful API → 数据库 CRUD → TanStack Query 缓存 |
| **P2** 用户 | 注册/登录、个人中心、权限控制、评论互动 | JWT 认证 → bcrypt 加密 → Guard 守卫 → 关联查询 |
| **P3** 进阶 | 文件上传、点赞收藏、消息通知、数据统计 | Multer 上传 → WebSocket 实时通知 → 事务操作 |
| **P4** 高阶 | 数据看板、深色/浅色主题切换、i18n 国际化 | ECharts 图表 → Zustand 持久化 → i18next 多语言 |

> 当前进度：脚手架搭建完成，后端 4 个核心模块 API 就绪，前端框架就绪。
