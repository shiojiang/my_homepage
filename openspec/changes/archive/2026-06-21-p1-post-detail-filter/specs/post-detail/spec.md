## Requirements

### Requirement: 文章详情页
系统 SHALL 提供文章详情页，展示完整内容。

#### Scenario: 正常访问文章详情
- **WHEN** 用户点击文章卡片或访问 `/posts/:id`
- **THEN** 系统展示文章标题、正文、标签、作者、发布日期、浏览数

#### Scenario: 文章不存在
- **WHEN** 用户访问不存在的文章 ID
- **THEN** 系统展示"文章不存在"页面

### Requirement: 骨架屏加载
系统 SHALL 在详情页加载时展示骨架屏。

#### Scenario: 详情加载中
- **WHEN** 文章数据请求中
- **THEN** 系统展示详情页骨架屏
