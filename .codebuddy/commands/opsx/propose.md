---
name: OPSX: 提案
description: "创建新变更——生成提案、设计、规格与任务"
argument-hint: "[命令参数]"
---

创建新变更，一次性生成所有 artifact。

将生成以下 artifact：
- proposal.md（做什么 & 为什么）
- design.md（怎么做）
- tasks.md（实现步骤）

准备实现时，执行 /opsx:apply

---

**输入**：`/opsx:propose` 后面的参数为变更名称（kebab-case），或用户想要构建的功能描述。

**步骤**

1. **如果没有提供输入，询问用户想构建什么**

   使用 **AskUserQuestion 工具**（开放式，无预设选项）询问：
   > "你想做什么变更？描述你想构建或修复的功能。"

   根据描述推导 kebab-case 名称（如 "添加用户认证" → `add-user-auth`）。

   **重要**：必须理解用户需求后再继续。

2. **创建变更目录**
   ```bash
   openspec new change "<name>"
   ```
   这会在 CLI 解析的 planning home 中创建脚手架变更。

3. **获取 artifact 构建顺序**
   ```bash
   openspec status --change "<name>" --json
   ```
   解析 JSON 获取：
   - `applyRequires`：实现前需要的 artifact ID 列表（如 `["tasks"]`）
   - `artifacts`：所有 artifact 及其状态和依赖
   - `planningHome`、`changeRoot`、`artifactPaths`、`actionContext`：路径和范围上下文

4. **按依赖顺序创建 artifact，直到满足 apply 条件**

   使用 **TodoWrite 工具**跟踪进度。

   按依赖顺序循环处理 artifact（先处理无依赖的）：

   a. **对于每个状态为 `ready` 的 artifact**：
      - 获取指令：
        ```bash
        openspec instructions <artifact-id> --change "<name>" --json
        ```
      - 指令 JSON 包含：
        - `context`：项目背景（给你的约束，不要写入输出文件）
        - `rules`：artifact 特定规则（给你的约束，不要写入输出文件）
        - `template`：输出文件的结构模板
        - `instruction`：该 artifact 类型的 schema 指引
        - `resolvedOutputPath`：artifact 输出路径
        - `dependencies`：需要读取上下文的已完成 artifact
      - 读取已完成依赖文件获取上下文
      - 使用 `template` 作为结构创建 artifact 文件，写入 `resolvedOutputPath`
      - 应用 `context` 和 `rules` 作为约束——但不要复制到文件中
      - 显示简要进度："已创建 <artifact-id>"

   b. **继续直到所有 `applyRequires` artifact 完成**
      - 每创建一个 artifact 后重新运行 `openspec status --change "<name>" --json`
      - 检查 `applyRequires` 中每个 artifact ID 的 `status` 是否为 `"done"`
      - 所有 `applyRequires` artifact 完成后停止

   c. **如果 artifact 需要用户输入**（上下文不明确）：
      - 使用 **AskUserQuestion 工具**澄清
      - 然后继续创建

5. **显示最终状态**
   ```bash
   openspec status --change "<name>"
   ```

**输出**

完成所有 artifact 后总结：
- 变更名称和位置
- 已创建的 artifact 列表及简要说明
- 就绪状态："所有 artifact 已创建！可以开始实现了。"
- 提示："执行 `/opsx:apply` 或让我开始实现任务。"

**Artifact 创建指南**

- 遵循 `openspec instructions` 中每个 artifact 类型的 `instruction` 字段
- schema 定义了每个 artifact 应包含的内容——遵循它
- 创建新 artifact 前读取依赖 artifact 获取上下文
- 使用 `template` 作为输出文件结构——填充其各章节
- **重要**：`context` 和 `rules` 是给你的约束，不是文件内容
  - 不要将 `<context>`、`<rules>`、`<project_context>` 块复制到 artifact 中

**护栏原则**
- 创建实现所需的所有 artifact（由 schema 的 `apply.requires` 定义）
- 创建新 artifact 前始终读取依赖 artifact
- 如果上下文严重不明确，询问用户——但倾向于做出合理判断以保持进度
- 如果同名变更已存在，询问用户是继续还是新建
- 继续下一步前验证每个 artifact 文件已写入
