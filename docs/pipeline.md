---
title: Pipeline 构建
lang: zh-CN
---

# Pipeline 构建

::: danger 实现进度
- `pug-backend`：0%
- `pugw-frontend`：0%
:::

Pipeline 是 PUG 的用户态基本复用单元，通过对管道进行拼接，用户可以组装出符合自己需求的 Pipeline 以供不同 Workflow 复用。

我们把构建 Pipeline，即管道从前至后连为一体的过程称为**管道拼接**（Pipeline connect）。

## POST /pipeline

创建新 Pipeline。

## GET /pipeline

获取用户可用的 Pipeline，表现为 JSON 数组形式。

```json
```

## GET /pipeline/:id

获得对应 `id` 的 Pipeline 信息。

## PATCH /pipeline/:id

修改对应 `id` 的 Pipeline 信息。

## DELETE /pipeline/:id

删除对应 `id` 的 Pipeline