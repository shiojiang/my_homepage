## 技术方案

### 路由设计

```
App.tsx
├── /                          → HomePage
├── /posts                     → PostListPage (独立文章列表页)
├── /posts/:id                 → PostDetailPage
└── /posts?category=xxx&page=n → URL 参数驱动筛选
```

### 组件新增

| 组件 | 路径 | 用途 |
|------|------|------|
| `CategoryFilter` | `components/home/CategoryFilter.tsx` | 分类下拉/标签切换 |
| `Pagination` | `components/home/Pagination.tsx` | 分页控件 |
| `PostDetailPage` | `pages/PostDetailPage.tsx` | 文章详情页 |

### 组件修改

| 组件 | 改动 |
|------|------|
| `PostList` | 集成 CategoryFilter 和 Pagination |
| `App.tsx` | 新增 `/posts/:id` 路由 |

### 数据流

```
PostListPage
├── CategoryFilter → setCategory → URL params
├── PostList → usePosts({category, page, keyword})
└── Pagination → setPage → URL params

PostDetailPage
└── usePost(id) → GET /api/posts/:id
```
