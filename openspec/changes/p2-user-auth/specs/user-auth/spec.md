## Requirements

### Requirement: 用户注册
系统 SHALL 提供注册页面，允许新用户创建账号。

#### Scenario: 注册成功
- **WHEN** 用户填写用户名、邮箱、密码并提交
- **THEN** 系统创建账号、生成 JWT Token、自动登录并跳转首页

#### Scenario: 用户名已存在
- **WHEN** 注册用户名已被占用
- **THEN** 系统提示"用户名或邮箱已存在"

#### Scenario: 密码过短
- **WHEN** 密码少于 6 位
- **THEN** 系统提示密码长度不足

### Requirement: 用户登录
系统 SHALL 提供登录页面。

#### Scenario: 登录成功
- **WHEN** 用户输入正确邮箱和密码
- **THEN** 系统返回 JWT Token，存入 localStorage，跳转首页

#### Scenario: 密码错误
- **WHEN** 密码不正确
- **THEN** 系统提示"邮箱或密码错误"

### Requirement: Token 管理
系统 SHALL 自动管理 Token 的存储、附加和过期处理。

#### Scenario: 请求附带 Token
- **WHEN** 已登录用户发起 API 请求
- **THEN** Axios 拦截器自动在 Authorization 头附加 Bearer Token

#### Scenario: Token 过期
- **WHEN** 服务端返回 401
- **THEN** 系统清除本地 Token，跳转登录页

### Requirement: 退出登录
系统 SHALL 提供退出登录功能。

#### Scenario: 退出成功
- **WHEN** 用户点击退出按钮
- **THEN** 系统清除 Token 和用户状态，跳转首页
