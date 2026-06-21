## Why

P0 已完成文章列表基础展示和搜索，但缺少分类筛选、分页翻页和文章详情页。用户无法按分类浏览、无法翻页查看旧文章、无法点击卡片阅读全文。这些是内容型个人站的必备功能。

## What Changes

- 文章列表增加分类筛选（下拉或标签切换）
- 文章列表增加分页控件（上一页/下一页）
- 新增文章详情页 `/posts/:id`，展示标题、正文、标签、发布信息
- 新增前端路由，支持分类参数和分页参数

## Capabilities

### New Capabilities
- `post-detail`: 文章详情页展示（标题、正文、标签、作者、发布日期）
- `post-filter`: 文章分类筛选 + 分页导航

### Modified Capabilities
- `post-list`: 增强搜索栏，添加分类筛选下拉和分页控件

## Impact

- **前端**: 新增 `pages/PostDetailPage.tsx`、`components/home/CategoryFilter.tsx`、`components/home/Pagination.tsx`，修改 `PostList.tsx`、`App.tsx`
- **后端**: 已有 Post API 支持分类和分页参数，无需修改
