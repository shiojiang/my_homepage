---
name: openspec-apply-change
description: 实现 OpenSpec 变更中的任务。当用户想开始实现、继续实现或完成任务时使用。
license: MIT
compatibility: 需要 openspec CLI。
metadata:
  author: openspec
  version: "1.0"
  generatedBy: "1.4.1"
---

实现 OpenSpec 变更中的任务。

**输入**：可选指定变更名称。如省略，尝试从对话上下文推断。如果不明确，必须提示用户选择可用变更。

**步骤**

1. **选择变更**

   如果提供了名称，直接使用。否则：
   - 从对话上下文推断（如果用户提到过某个变更）
   - 如果只有一个活跃变更，自动选择
   - 如果不明确，运行 `openspec list --json` 获取可用变更，使用 **AskUserQuestion 工具**让用户选择

   始终宣告："使用变更：<name>" 及如何覆盖（如 `/opsx:apply <other>`）。

2. **检查状态以了解 schema**
   ```bash
   openspec status --change "<name>" --json
   ```
   解析 JSON 了解：
   - `schemaName`：正在使用的工作流（如 "spec-driven"）
   - `planningHome`、`changeRoot`、`actionContext`：规划范围和编辑约束
   - 哪个 artifact 包含任务（spec-driven 通常为 "tasks"，其他 schema 查看 status）

3. **获取实施指令**

   ```bash
   openspec instructions apply --change "<name>" --json
   ```

   返回：
   - `contextFiles`：artifact ID → 具体文件路径数组（因 schema 而异，可能是 proposal/specs/design/tasks 或 spec/tests/implementation/docs）
   - Progress（总计、已完成、剩余）
   - 带状态的任务列表
   - 基于当前状态的动态指令

   **处理各状态：**
   - 如果 `state: "blocked"`（缺少 artifact）：显示消息，建议使用 openspec-continue-change
   - 如果 `state: "all_done"`：恭喜，建议归档
   - 否则：继续进行实现

   **工作区守卫：** 如果 status JSON 报告 `actionContext.mode: "workspace-planning"` 且 `allowedEditRoots` 为空，说明完整工作区实施不受支持。将链接仓库和文件夹视为只读上下文，要求用户选择受影响的区域，并在编辑文件前停止。

4. **读取上下文文件**

   读取实施指令输出中 `contextFiles` 下列出的所有文件路径。
   文件取决于使用的 schema：
   - **spec-driven**：proposal、specs、design、tasks
   - 其他 schema：遵循 CLI 输出的 contextFiles

5. **显示当前进度**

   显示：
   - 使用的 schema
   - 进度："N/M 任务已完成"
   - 剩余任务概览
   - CLI 的动态指令

6. **实现任务（循环直到完成或阻塞）**

   对于每个待处理任务：
   - 显示正在处理哪个任务
   - 进行所需的代码变更
   - 保持变更最小化和聚焦
   - 在任务文件中标记完成：`- [ ]` → `- [x]`
   - 继续下一个任务

   **暂停条件：**
   - 任务不明确 → 请求澄清
   - 实现过程中发现设计问题 → 建议更新 artifact
   - 遇到错误或阻塞 → 报告并等待指导
   - 用户中断

7. **完成或暂停时显示状态**

   显示：
   - 本次完成的任务
   - 总体进度："N/M 任务已完成"
   - 如果全部完成：建议归档
   - 如果暂停：说明原因并等待指导

**实现过程中的输出**

```
## 正在实现：<change-name>（schema：<schema-name>）

正在处理任务 3/7：<任务描述>
[...实现中...]
✓ 任务完成

正在处理任务 4/7：<任务描述>
[...实现中...]
✓ 任务完成
```

**完成时的输出**

```
## 实现完成

**变更：** <change-name>
**Schema：** <schema-name>
**进度：** 7/7 任务已完成 ✓

### 本次完成
- [x] 任务 1
- [x] 任务 2
...

所有任务已完成！可以归档此变更。
```

**暂停时的输出（遇到问题）**

```
## 实现已暂停

**变更：** <change-name>
**Schema：** <schema-name>
**进度：** 4/7 任务已完成

### 遇到的问题
<问题描述>

**选项：**
1. <选项 1>
2. <选项 2>
3. 其他方案

你希望怎么做？
```

**护栏原则**
- 持续执行任务直到完成或阻塞
- 开始前始终读取上下文文件（来自实施指令输出）
- 如果任务不明确，暂停并询问后再实现
- 如果实现过程中发现问题，暂停并建议更新 artifact
- 保持代码变更最小化且限定在任务范围内
- 完成每个任务后立即更新任务复选框
- 遇到错误、阻塞或不明确需求时暂停——不要猜测
- 使用 CLI 输出的 contextFiles，不要假设具体文件名

**灵活工作流集成**

此 skill 支持"对变更执行操作"模型：

- **可随时调用**：在所有 artifact 完成前（如果任务已存在）、部分实现后、与其他操作交错
- **允许 artifact 更新**：如果实现过程中发现设计问题，建议更新 artifact——不锁定阶段，灵活工作
