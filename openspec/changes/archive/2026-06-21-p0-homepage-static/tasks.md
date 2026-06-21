## 实现任务

### 前端

- [x] 1. 抽离 SearchBar 为独立组件，更新 Header 引用
- [x] 2. 创建 EmptyState 空态组件
- [x] 3. 创建 SkeletonCard 骨架屏组件
- [x] 4. 创建 `hooks/useUser.ts`，对接 `GET /api/users/:id`
- [x] 5. 创建 `hooks/usePosts.ts`，对接 `GET /api/posts`（分页+搜索+筛选）
- [x] 6. 创建 HeroSection 组件，替换 HomePage 中硬编码 Hero 区
- [x] 7. 创建 StatsDashboard 组件，展示真实统计数据
- [x] 8. 创建 PostCard + PostList 组件，对接文章列表
- [x] 9. 重构 `pages/HomePage.tsx`，组装所有新组件

### 后端

- [x] 10. 补充 `GET /api/users/:id/stats` 统计接口（文章数/标签数等）
