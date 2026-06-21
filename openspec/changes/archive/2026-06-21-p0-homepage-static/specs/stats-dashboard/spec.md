## Requirements

### Requirement: 首页统计展示
系统 SHALL 在首页展示用户的数据统计面板。

#### Scenario: 正常加载统计数据
- **WHEN** 用户访问首页
- **THEN** 系统展示文章数、标签数等统计卡片，数据来自后端

#### Scenario: 数据为 0
- **WHEN** 后端返回统计均为 0
- **THEN** 系统正常展示数值 0，不报错不隐藏
