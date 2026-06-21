## Requirements

### Requirement: 文章列表展示
系统 SHALL 在首页展示最新的文章/动态列表。

#### Scenario: 正常加载文章列表
- **WHEN** 用户访问首页
- **THEN** 系统从后端获取文章列表，按创建时间倒序展示（标题、摘要、分类、发布日期）

#### Scenario: 空列表
- **WHEN** 后端返回 0 篇文章
- **THEN** 系统显示"暂无动态"空态提示

#### Scenario: 加载中
- **WHEN** 文章数据请求中
- **THEN** 系统展示骨架屏加载态

### Requirement: 文章搜索
系统 SHALL 支持按关键词搜索文章。

#### Scenario: 搜索有结果
- **WHEN** 用户在搜索框输入关键词并触发搜索
- **THEN** 系统调用后端搜索接口，展示匹配的文章列表

#### Scenario: 搜索无结果
- **WHEN** 关键词无匹配文章
- **THEN** 系统显示"未找到相关内容"
