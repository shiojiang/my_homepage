---
name: openspec-archive-change
description: 归档实验性工作流中已完成的变更。当用户想在实现完成后最终归档变更时使用。
license: MIT
compatibility: 需要 openspec CLI。
metadata:
  author: openspec
  version: "1.0"
  generatedBy: "1.4.1"
---

归档实验性工作流中已完成的变更。

**输入**：可选指定变更名称。如省略，尝试从对话上下文推断。如果不明确，必须提示用户选择可用变更。

**前置检查**：是否已执行 openspec-verify-change？

检查 `changeRoot` 下是否存在 `verify.md`：
- **不存在** → 提示建议先验证代码质量。用户确认后继续
- **存在且结果为 ❌** → 显示验证失败详情，警告归档。用户确认后继续
- **存在且结果为 ✅** → 继续

**步骤**

1. **如果没有提供变更名称，提示选择**

   运行 `openspec list --json` 获取可用变更。使用 **AskUserQuestion 工具**让用户选择。

   只显示活跃变更（尚未归档的）。
   如有可用则包含每个变更使用的 schema。

   **重要**：不要猜测或自动选择变更。始终让用户选择。

2. **检查 artifact 完成状态**

   运行 `openspec status --change "<name>" --json` 检查 artifact 完成情况。

   解析 JSON 了解：
   - `schemaName`：使用的工作流
   - `planningHome`、`changeRoot`、`artifactPaths`、`actionContext`：路径和范围上下文
   - `artifacts`：artifact 列表及其状态（`done` 或其他）

   如果 status 报告 `actionContext.mode: "workspace-planning"`，说明工作区归档不受支持，停止。不要将工作区变更移动到仓库本地归档或编辑链接仓库。

   **如果有任何 artifact 未完成：**
   - 显示警告列出未完成的 artifact
   - 使用 **AskUserQuestion 工具**确认用户是否继续
   - 用户确认后继续

3. **检查任务完成状态**

   读取任务文件（通常为 `tasks.md`）检查未完成的任务。

   统计标记为 `- [ ]`（未完成）和 `- [x]`（已完成）的任务数。

   **如果发现未完成任务：**
   - 显示警告显示未完成任务数量
   - 使用 **AskUserQuestion 工具**确认用户是否继续
   - 用户确认后继续

   **如果任务文件不存在：** 继续，无任务相关警告。

4. **评估 delta spec 同步状态**

   使用 status JSON 中的 `artifactPaths.specs.existingOutputPaths` 检查 delta spec。如果不存在，跳过同步提示继续。

   **如果存在 delta spec：**
   - 将每个 delta spec 与 `openspec/specs/<capability>/spec.md` 的主 spec 进行对比
   - 确定将应用哪些变更（新增、修改、删除、重命名）
   - 提示前显示合并摘要

   **提示选项：**
   - 如有变更需求："立即同步（推荐）"、"不同步直接归档"
   - 如果已同步："立即归档"、"再次同步"、"取消"

   如果用户选择同步，使用 Task 工具（subagent_type: "general-purpose"，prompt: "使用 Skill 工具调用 openspec-sync-specs 处理变更 '<name>'。Delta spec 分析：<包含分析的 delta spec 摘要>"）。无论选择如何，继续归档。

5. **执行归档**

   在 `planningHome.changesDir` 下创建 `archive` 目录（如不存在）：
   ```bash
   mkdir -p "<planningHome.changesDir>/archive"
   ```

   使用当前日期生成目标名称：`YYYY-MM-DD-<change-name>`

   **检查目标是否已存在：**
   - 如果是：失败并报错，建议重命名现有归档或使用不同日期
   - 如果否：将 `changeRoot` 移动到归档目录

   ```bash
   mv "<changeRoot>" "<planningHome.changesDir>/archive/YYYY-MM-DD-<name>"
   ```

6. **显示摘要**

   显示归档完成摘要，包括：
   - 变更名称
   - 使用的 schema
   - 归档位置
   - 是否已同步 spec（如适用）
   - 任何警告说明（未完成的 artifact/任务）

**成功输出**

```
## 归档完成

**变更：** <change-name>
**Schema：** <schema-name>
**归档至：** <planningHome.changesDir>/archive/YYYY-MM-DD-<name>/
**Specs：** ✓ 已同步至主 spec（或 "无 delta spec" 或 "已跳过同步"）

所有 artifact 已完成。所有任务已完成。
```

**护栏原则**
- 未提供变更名称时始终提示选择
- 使用 artifact graph（openspec status --json）检查完成状态
- 不要因警告而阻止归档——仅告知并确认
- 移动到归档时保留 .openspec.yaml（随目录移动）
- 显示清晰的操作摘要
- 如果请求同步，使用 openspec-sync-specs 方案（agent 驱动）
- 如果存在 delta spec，始终运行同步评估并在提示前显示合并摘要
