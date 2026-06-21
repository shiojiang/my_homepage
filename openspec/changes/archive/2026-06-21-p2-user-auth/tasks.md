## 实现任务

### 前端

- [x] 1. 新增 `stores/authStore.ts`（Zustand + persist，Token/用户/登录状态）
- [x] 2. 新增 `components/auth/PrivateRoute.tsx`（路由守卫，未登录跳转 /login）
- [x] 3. 新增 `pages/LoginPage.tsx`（登录表单，对接 `POST /api/auth/login`）
- [x] 4. 新增 `pages/RegisterPage.tsx`（注册表单，对接 `POST /api/auth/register`）
- [x] 5. 新增 `pages/SettingsPage.tsx`（编辑资料表单，对接 `PUT /api/users/profile`）
- [x] 6. 修改 `App.tsx`，添加 /login /register /settings 路由 + PrivateRoute
- [x] 7. 修改 `Header`，登录态切换（未登录→登录按钮，已登录→头像+退出）
- [x] 8. 修改 `HomePage`，优先使用 authStore.user，回退到 useUser()

### 后端

- [x] 9. 确认 auth login/register + user/profile 接口与前端对齐
