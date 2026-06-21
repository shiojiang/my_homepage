## Why

当前首页 Hero 区、统计卡片、动态列表均为硬编码假数据，用户无法看到真实的个人信息和内容。后端 User/Post API 已就绪，需要前端对接，完成 P0 静态→动态的转变。

## What Changes

- 首页 Hero 区展示真实用户信息（昵称、简介、位置、入站时间）
- 统计卡片从后端拉取文章数、标签数等真实数据
- 最新动态列表对接 Post API，支持空态和加载态
- 个人设置页面对接用户信息编辑 API
- 搜索框实现前端关键词过滤

## Capabilities

### New Capabilities
- `user-profile`: 用户信息展示与编辑（昵称、头像、简介、位置、个人网站）
- `post-list`: 文章列表展示、分类筛选、搜索、分页
- `stats-dashboard`: 首页统计面板（文章数、标签数等）

### Modified Capabilities
<!-- 无已有 spec，留空 -->

## Impact

- **前端**: `client/src/pages/HomePage.tsx` 重构，新增 `UserCard`、`PostCard`、`StatsCard`、`SettingsPage` 等组件
- **后端**: 已有 User/Post API 无需修改，可能需要补充用户统计接口
- **依赖**: TanStack Query 负责数据获取和缓存
