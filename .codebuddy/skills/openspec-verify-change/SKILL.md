---
name: openspec-verify-change
description: 验证已实现变更的质量——执行编译检查、类型检查、Spec 验收。当用户完成实现后、归档前想确认代码质量时使用。
license: MIT
compatibility: 需要 openspec CLI。
metadata:
  author: openspec
  version: "1.0"
  generatedBy: "1.4.1"
---

对已实现的变更进行全面验证。

**输入**：可选指定变更名称。如省略，尝试从对话上下文推断。

**步骤**

1. **选择变更**

   如果提供了名称，直接使用。否则从对话上下文推断。如不明确，运行 `openspec list --json` 后用 **AskUserQuestion 工具**让用户选择。

2. **读取上下文**

   ```bash
   openspec status --change "<name>" --json
   ```
   解析 `changeRoot`、`artifactPaths`。

3. **检查任务完整性**

   读取 tasks.md：
   - 统计 `[x]`（已完成）和 `[ ]`（未完成）
   - 如有未完成任务 → 报告并问是否继续验证

4. **检测变更范围**

   扫描本次 change 涉及的文件路径：
   - `client/` 有变更 → 前端检查
   - `server/` 有变更 → 后端检查
   - 两边都有 → 全栈检查

5. **执行构建验证**（根据检测结果）

   **前端变更：**
   ```bash
   cd client && npx tsc --noEmit
   ```
   如失败 → 记录类型错误

   ```bash
   cd client && npx vite build
   ```
   如失败 → 记录构建错误

   **后端变更：**
   ```bash
   cd server && npx nest build
   ```
   如失败 → 记录编译错误

   ```bash
   cd server && npx prisma generate
   ```
   如失败 → 记录 Schema 错误

6. **Spec 对照验收**

   读取 `specs/` 中的验收场景，逐项检查：
   - 每个 Scenario 是否有对应的实现？
   - WHEN/THEN 条件是否可验证？
   - 边界和异常场景是否覆盖？

7. **生成验证报告**

   汇总所有检查结果，写入 `verify.md`：

   ```
   ## 验证报告：<change-name>
   
   **时间**：YYYY-MM-DD HH:MM
   **结果**：✅ 通过 / ⚠️ 部分通过 / ❌ 未通过
   
   ### 任务完整性
   - 总任务：N  |  已完成：M  |  未完成：K
   
   ### 构建验证
   | 检查项 | 结果 |
   |--------|------|
   | TypeScript 类型检查 | ✅ / ❌ |
   | Vite 生产构建 | ✅ / ❌ |
   | Nest.js 编译 | ✅ / ❌ |
   | Prisma Schema | ✅ / ❌ |
   
   ### Spec 验收
   | 验收场景 | 状态 |
   |----------|------|
   | 场景1：xxx | ✅ / ❌ |
   
   ### 结论
   <总结和建议>
   ```

**输出**

验证通过：
```
## 验证通过 ✅

**变更：** <change-name>
**检查项：** 全部通过

可以归档此变更。
```

验证失败：
```
## 验证未通过 ❌

**变更：** <change-name>

**问题：**
1. TypeScript 类型错误：client/src/pages/HomePage.tsx:42
2. Vite 构建失败：未找到模块 @/components/Xxx

请修复后重新验证。
```

**护栏原则**
- 验证不通过不阻塞用户，仅报告并建议
- 构建失败的详细信息要在报告中列出
- verify.md 应写入 change 目录，可供后续归档参考
