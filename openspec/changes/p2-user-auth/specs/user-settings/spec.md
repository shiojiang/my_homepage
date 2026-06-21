## Requirements

### Requirement: 个人资料编辑
系统 SHALL 支持已登录用户编辑个人资料。

#### Scenario: 编辑成功
- **WHEN** 用户在设置页修改昵称/简介/位置/网站并保存
- **THEN** 系统调用 `PUT /api/users/profile`，提示保存成功

#### Scenario: 未登录访问
- **WHEN** 未登录用户访问 `/settings`
- **THEN** 系统重定向到 `/login`
