## 技术方案

### 路由新增

```
App.tsx
├── /                  → HomePage (公开)
├── /posts/:id         → PostDetailPage (公开)
├── /login             → LoginPage (仅未登录)
├── /register          → RegisterPage (仅未登录)
├── /settings          → SettingsPage (需登录，PrivateRoute)
```

### 状态管理

```
authStore (Zustand + persist)
├── token: string | null
├── user: { id, username, email } | null
├── isLoggedIn: boolean
├── login(token, user) → localStorage.setItem
├── logout() → clear
└── setUser(user) → update
```

### 组件新增

| 组件 | 路径 | 用途 |
|------|------|------|
| `LoginPage` | `pages/LoginPage.tsx` | 登录表单 |
| `RegisterPage` | `pages/RegisterPage.tsx` | 注册表单 |
| `SettingsPage` | `pages/SettingsPage.tsx` | 个人资料编辑 |
| `PrivateRoute` | `components/auth/PrivateRoute.tsx` | 路由守卫 |

### 组件修改

| 组件 | 改动 |
|------|------|
| `Header` | 登录态切换（登录按钮 / 头像+退出） |
| `Layout` | 用户信息传递给 Header |
| `HomePage` | 使用 authStore.user 替换 useUser() |

### 数据流

```
注册/登录 → Auth API → JWT Token → authStore → localStorage
                                              ↓
                               Axios 拦截器注入 Authorization
                                              ↓
                               API 请求（受保护接口）
                                              ↓
                               401 → 清除 Token → 跳转 /login
```
