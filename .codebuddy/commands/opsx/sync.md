---
name: OPSX: Sync
description: "将变更中的 delta spec 同步到主 spec"
argument-hint: "[命令参数]"
---

将变更中的 delta spec 同步到主 spec。

这是 **agent 驱动**的操作——需要读取 delta spec 并直接编辑主 spec 来应用变更。这允许智能合并（例如添加场景而不复制整个需求）。

**输入**：可选在 `/opsx:sync` 后指定变更名称（如 `/opsx:sync add-auth`）。如省略，尝试从对话上下文推断。如果不明确，必须提示用户选择可用变更。

**步骤**

1. **如果没有提供变更名称，提示选择**

   运行 `openspec list --json` 获取可用变更。使用 **AskUserQuestion 工具**让用户选择。

   显示有 delta spec（`specs/` 目录下）的变更。

   **重要**：不要猜测或自动选择变更。始终让用户选择。

2. **解析变更上下文**

   运行：
   ```bash
   openspec status --change "<name>" --json
   ```

   如果 status 报告 `actionContext.mode: "workspace-planning"`，说明工作区 spec 同步不受支持，停止。不要回退到仓库本地路径或编辑链接仓库。

3. **查找 delta spec**

   使用 status JSON 中的 `artifactPaths.specs.existingOutputPaths` 作为 delta spec 文件列表。

   每个 delta spec 文件包含以下章节：
   - `## ADDED Requirements` - 要新增的需求
   - `## MODIFIED Requirements` - 要修改的需求
   - `## REMOVED Requirements` - 要删除的需求
   - `## RENAMED Requirements` - 要重命名的需求（FROM:/TO: 格式）

   如果没有找到 delta spec，通知用户并停止。

4. **对每个 delta spec，应用变更到主 spec**

   对于 CLI 返回的每个仓库本地能力 delta spec 路径：

   a. **读取 delta spec**，理解预期的变更

   b. **读取主 spec**（`openspec/specs/<capability>/spec.md`，可能尚不存在）

   c. **智能应用变更**：

      **ADDED Requirements（新增需求）：**
      - 如果需求在主 spec 中不存在 → 添加
      - 如果已存在 → 更新以匹配（视为隐式 MODIFIED）

      **MODIFIED Requirements（修改需求）：**
      - 在主 spec 中找到该需求
      - 应用变更——可以是：
        - 添加新场景（不需要复制已有场景）
        - 修改已有场景
        - 更改需求描述
      - 保留 delta 中未提到的场景/内容

      **REMOVED Requirements（删除需求）：**
      - 从主 spec 中删除整个需求块

      **RENAMED Requirements（重命名需求）：**
      - 找到 FROM 需求，重命名为 TO

   d. **如果能力尚不存在，创建新主 spec**：
      - 创建 `openspec/specs/<capability>/spec.md`
      - 添加 Purpose 章节（可简洁，标记为 TBD）
      - 添加 Requirements 章节，包含 ADDED 的需求

5. **显示摘要**

   应用所有变更后，总结：
   - 更新了哪些能力
   - 做了哪些变更（新增/修改/删除/重命名）

**Delta Spec 格式参考**

```markdown
## ADDED Requirements

### Requirement: 新功能名称
系统应当做某事。

#### Scenario: 基本场景
- **WHEN** 用户执行 X
- **THEN** 系统执行 Y

## MODIFIED Requirements

### Requirement: 已有功能名称
#### Scenario: 要添加的新场景
- **WHEN** 用户执行 A
- **THEN** 系统执行 B

## REMOVED Requirements

### Requirement: 已弃用的功能

## RENAMED Requirements

- FROM: `### Requirement: 旧名称`
- TO: `### Requirement: 新名称`
```

**关键原则：智能合并**

与程序化合并不同，可以应用**部分更新**：
- 要添加场景，只需将其放在 MODIFIED 下——不要复制已有场景
- delta 代表*意图*，而非完整替换
- 用判断力合理合并变更

**成功输出**

```
## Spec 已同步：<change-name>

已更新主 spec：

**<capability-1>**：
- 新增需求："新功能"
- 修改需求："已有功能"（添加了 1 个场景）

**<capability-2>**：
- 创建了新 spec 文件
- 新增需求："另一个功能"

主 spec 已更新。变更保持活跃——实现完成后归档。
```

**护栏原则**
- 变更前读取 delta spec 和主 spec
- 保留 delta 中未提及的已有内容
- 如有不明确，请求澄清
- 边做边显示正在变更的内容
- 操作应为幂等——运行两次结果相同
