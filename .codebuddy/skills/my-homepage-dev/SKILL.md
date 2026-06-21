---
name: my-homepage-dev
description: >
  个人全栈首页项目 (my-homepage) 开发助手。适用于项目的功能迭代、bug 修复、前后端联调等开发任务。
  技术栈：React 18 + Vite + Tailwind + shadcn/ui (前端), Nest.js + Prisma + PostgreSQL (后端)。
  每次开发完成后，自动更新 README 中的功能进度记录，区分前端/后端变更。
---

# My Homepage 项目开发规范

## 项目概述

全栈 Monorepo 项目：`client/` (React 前端) + `server/` (Nest.js 后端)。

## 开发流程

### 1. 理解需求
- 确认是前端、后端还是全栈任务
- 对照 `README.md` 中的 🎯 复杂度递进路线，判断属于 P0~P4 哪个阶段

### 2. 编码规范

**前端 (client/)**
- 组件放在 `client/src/components/`，页面放在 `client/src/pages/`
- 状态用 Zustand (stores/)，请求用 TanStack Query (hooks/)
- API 调用统一走 `client/src/services/api.ts`
- 样式用 Tailwind CSS，工具函数用 `client/src/lib/utils.ts` 的 `cn()`
- 路由在 `client/src/App.tsx` 中定义

**后端 (server/)**
- 模块放在 `server/src/modules/<name>/`，每个模块含 `*.module.ts / *.service.ts / *.controller.ts / dto/`
- 数据库操作走 PrismaService (全局注入)
- 需要认证的接口加 `@UseGuards(JwtAuthGuard)`
- DTO 用 class-validator 装饰器校验
- Swagger 标签加 `@ApiTags('xxx')`

**通用约束**
- 前后端统一 TypeScript，类型定义放接口侧
- 修改后确保 TypeScript 编译通过、Vite 构建通过
- 不要更改 `.env`、`docker-compose.yml` 等基础设施文件

### 3. 进度记录 (关键步骤)

**每次开发完成后，必须更新 `README.md` 的 `🎯 复杂度递进路线` 部分：**

在表格中添加一列 **进度** 状态，格式如下：

```
| 阶段 | 功能 | 技术点 | 进度 |
|------|------|--------|------|
| P0 | ... | ... | ✅ 已完成 / 🔧 进行中 |
```

同时在表格下方用简洁的 bullet 列表记录本次变更：

```
### 最近更新 (YYYY-MM-DD)

**前端**
- xx页面：新增xx组件
- xx功能：对接xx接口

**后端**
- xx模块：新增xx API
- xx表：新增xx字段
```

如果 README 中还没有「进度」列和「最近更新」区块，则新增。

### 4. 提交代码
- **不要自动提交**：功能实现完成后，先报告变更摘要让用户审核，用户确认后再执行 `git add . && git commit -m "..." && git push`
- 提交信息区分前缀：`feat:` 新功能 / `fix:` 修复 / `docs:` 文档 / `style:` 样式 / `refactor:` 重构

### 5. 完成确认
- 前端变更：确认 `npx tsc --noEmit` 和 `npx vite build` 通过
- 后端变更：确认 `npx nest build` 和 `npx prisma generate` 通过
