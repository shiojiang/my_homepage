## 技术方案

### 组件拆分

```
HomePage
├── HeroSection          # Hero 区 → 对接 GET /api/users/:id
│   ├── Avatar
│   ├── UserInfo (昵称、简介、位置、时间)
│   └── SocialLinks (GitHub/Twitter/Email)
├── StatsDashboard       # 统计卡片 → 从 user._count 计算
│   └── StatsCard ×4
└── PostList             # 动态列表 → 对接 GET /api/posts
    ├── SearchBar        # 搜索 → GET /api/posts?keyword=xxx
    └── PostCard ×N      # 文章卡片 (标题、摘要、分类、日期)
```

### 数据流

```
TanStack Query (缓存层)
    │
    ├── useUser(id)        → GET /api/users/:id
    ├── usePosts(query)    → GET /api/posts?page&pageSize&category&keyword
    └── useStats()         → from usePosts 的 total 字段 + user._count
```

### API 对接

| 前端 Hook | 后端接口 | 说明 |
|-----------|----------|------|
| `useUser(userId)` | `GET /api/users/:id` | 用户信息 |
| `usePosts(query)` | `GET /api/posts` | 文章分页+搜索+筛选 |
| `useUpdateUser()` | `PUT /api/users/profile` | 编辑资料（需 JWT） |

### 状态处理

| 状态 | 前端表现 |
|------|----------|
| loading | 骨架屏 (SkeletonCard) |
| error | toast 提示 + 重试按钮 |
| empty | 空态插图 + "暂无内容" |
| success | 正常渲染内容 |

### 新增组件清单

| 组件 | 文件路径 | 用途 |
|------|----------|------|
| `HeroSection` | `components/home/HeroSection.tsx` | Hero 信息区 |
| `StatsDashboard` | `components/home/StatsDashboard.tsx` | 统计面板 |
| `PostCard` | `components/home/PostCard.tsx` | 文章卡片 |
| `PostList` | `components/home/PostList.tsx` | 文章列表容器 |
| `SearchBar` | `components/common/SearchBar.tsx` | 搜索栏（从 Header 抽离） |
| `SkeletonCard` | `components/common/SkeletonCard.tsx` | 骨架屏 |
| `EmptyState` | `components/common/EmptyState.tsx` | 空态组件 |
