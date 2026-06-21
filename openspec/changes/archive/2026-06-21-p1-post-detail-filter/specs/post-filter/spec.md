## Requirements

### Requirement: 分类筛选
系统 SHALL 支持按分类筛选文章列表。

#### Scenario: 选择分类
- **WHEN** 用户在下拉或标签中选择某个分类（如 tech、life）
- **THEN** 系统只展示该分类的文章，URL 参数同步 `?category=tech`

#### Scenario: 清除筛选
- **WHEN** 用户选择"全部"分类
- **THEN** 系统展示所有文章

### Requirement: 分页导航
系统 SHALL 支持文章列表分页。

#### Scenario: 翻到下一页
- **WHEN** 用户点击"下一页"
- **THEN** 系统加载下一页文章，URL 参数同步 `?page=2`

#### Scenario: 只有一页
- **WHEN** 总文章数不足一页
- **THEN** 系统隐藏分页控件
