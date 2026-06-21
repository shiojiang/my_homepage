## Why

个人站需要用户体系：访问者可以注册账号、登录系统、编辑个人资料。后台 API 已有 Auth/User 模块，前端缺注册/登录页面、Token 管理和权限控制。

## What Changes

- 新增注册页面 `/register` 和登录页面 `/login`
- 前端 Zustand 管理 JWT Token 和用户状态
- Axios 拦截器自动附加 Token，401 自动跳转登录
- Header 登录态切换（未登录显示登录按钮，已登录显示头像/退出）
- 设置页 `/settings` 支持编辑个人资料（需登录）
- HomePage 使用登录用户信息替代 `/users/me`

## Capabilities

### New Capabilities
- `user-auth`: 注册、登录、Token 管理、退出
- `user-settings`: 个人资料编辑（昵称、简介、位置、网站）

### Modified Capabilities
- `user-profile`: 展示当前登录用户信息（替代 `/users/me`）
- `post-list`: 后续评论功能需登录态

## Impact

- **前端**: 新增 LoginPage / RegisterPage / SettingsPage，新增 authStore、PrivateRoute
- **后端**: 已有 Auth/User API 无需修改，确认 JWT 验证正常
