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

## 📋 OpenSpec 编码规范

本项目使用 OpenSpec 驱动开发，所有功能迭代必须遵循以下工作流。

### 工作流概览

```
explore → propose → apply → verify → archive
  (可选)   (必须)    (必须)   (推荐)    (必须)
```

### 完整步骤

| 步骤 | 命令 | 必要性 | 职责 | 产出物 |
|------|------|--------|------|--------|
| ① 探索 | `/opsx:explore` | 可选 | 思考讨论、调查问题、对比技术方案 | 无文件 |
| ② 提案 | `/opsx:propose` | **必须** | 创建变更目录，编写提案与任务拆解 | `proposal.md` / `design.md` / `tasks.md` |
| ③ 实施 | `/opsx:apply` | **必须** | 按 tasks.md 逐项编码实现，标记完成状态 | 代码变更 |
| ④ 验证 | `/opsx:verify` | 推荐 `*` | 编译检查、类型检查、Spec 验收 | `verify.md` |
| ⑤ 同步 | `/opsx:sync` | 可选 | 将 delta spec 合并到主 spec | 主 spec 更新 |
| ⑥ 归档 | `/opsx:archive` | **必须** | 变更移入 `archive/`，完成闭环 | 归档目录 |

### 最小可行流程

最简开发闭环仅需 **3 步**：

```bash
/opsx:propose  →  /opsx:apply  →  /opsx:archive
```

- **propose**：描述需求，AI 自动生成 `proposal.md`（做什么）、`design.md`（怎么做）、`tasks.md`（实现步骤）
- **apply**：AI 按任务列表逐项编码，完成后自动勾选 `[x]`
- **archive**：变更归档至 `openspec/changes/archive/YYYY-MM-DD-<name>/`，可选同步 spec

### 编码原则

1. **先提案再编码**：所有功能开发、Bug 修复、重构均需先创建 OpenSpec 变更
2. **任务驱动**：编码严格按 `tasks.md` 顺序执行，不跳步、不偏离
3. **最小化变更**：每次仅聚焦当前任务，避免引入无关改动
4. **完成后归档**：验证通过后及时归档，保持 `openspec/changes/` 干净
5. **复杂需求先探索**：技术方案不明确时用 `/opsx:explore` 充分讨论再提案

### 目录结构

```
openspec/
├── specs/                  # 主 spec（功能规格说明）
└── changes/                # 活跃变更
    ├── add-user-auth/      # 变更目录
    │   ├── proposal.md
    │   ├── design.md
    │   ├── tasks.md
    │   └── verify.md
    └── archive/            # 已归档变更
        └── 2026-06-21-add-user-auth/
```

> `*` `verify` 为项目自定义步骤（非 OpenSpec 官方），在 apply 和 archive 之间增加编译检查与 Spec 验收。

---

## 🎯 复杂度递进路线

| 阶段 | 功能 | 技术点 | 进度 |
|------|------|--------|------|
| **P0** 基础 | 个人主页、Hero 区、统计面板、搜索 | 静态页面 → 响应式布局 → API 对接 | ✅ 已完成 |
| **P1** 浏览 | 文章列表、分类筛选、搜索、分页、文章详情 | RESTful API → TanStack Query 缓存 → React Router | ✅ 已完成 |
| **P2** 用户 | 注册/登录、个人中心、Token 管理、路由守卫 | JWT 认证 → Zustand persist → PrivateRoute | ✅ 已完成 |
| **P3** 创作 | 发文编辑器、文章管理、评论、点赞、标签云 | Markdown 编辑 → 关联查询 → 乐观更新 | ⬜ 待开始 |
| **P4** 进阶 | 头像/封面上传、消息通知、数据看板、国际化 | Multer 上传 → WebSocket → ECharts → i18n | ⬜ 待开始 |

### 最近更新 (2026-06-21)

**P2 用户认证**
- 新增 LoginPage / RegisterPage（注册成功浮层提示）
- 新增 authStore（Zustand persist Token + 用户状态）
- 新增 PrivateRoute 路由守卫（未登录→/login）
- 新增 SettingsPage 个人资料编辑
- Header 登录态切换（登录按钮 / 头像+下拉菜单退出）
- Axios 401 拦截器排除 /auth/ 路径

**P1 动态列表与详情**
- 新增 CategoryFilter 分类标签切换（全部/技术/生活/综合）
- 新增 Pagination 分页控件（上一页/下一页）
- 新增 PostDetailPage `/posts/:id` 文章详情页
- PostCard 支持点击跳转到详情页
- App.tsx 新增 `/posts/:id` 路由

**P0 基础展示**
- HomePage：拆分为 HeroSection / StatsDashboard / PostList / PostCard 组件
- 新增 SearchBar / EmptyState / SkeletonCard 通用组件
- 新增 useUser / usePosts hooks，对接 TanStack Query
- 新增 searchStore (Zustand)，实现搜索实时联动
- 支持加载骨架屏、空态、错误状态

**后端**
- 新增 `GET /api/users/me` 用户信息接口
- 新增 `GET /api/users/:id/stats` 统计接口
- bcrypt 替换为 Node crypto（Windows SQLite 兼容）
- Post tags 适配 SQLite JSON 存储

**基础设施**
- 本地开发切换 SQLite，零依赖启动
- OpenSpec 6 步工作流就绪（propose → explore → apply → verify → archive）
- GitHub Pages 自动部署
- 深色/浅色主题切换（Tailwind darkMode + Zustand + ThemeProvider）
