---
title: Pipe 构建
lang: zh-CN
---

# Pipe 构建

::: warning 实现进度
- `pug-backend`：100%
- `pugw-frontend`：0%
:::

构建后的管道是组成 Pipeline 的基本构件，负责最简单的单个功能。

我们把管道根据参数构建的过程成为**管道构建**（Pipe Extruding）。

## POST /pipes

进行新管道构建。

值得注意的是，管道一经构建后就**无法修改**，只能删除后重新创建。

### 请求参数

| 参数名      | 类型        | 必须 | 描述                               | 默认值 |
| ----------- | ----------- | ---- | ---------------------------------- | ------ |
| module      | string      | 是   | 设置该管道构建使用的 Module        | -      |
| pipe        | string      | 是   | 设置该管道构建使用的 Pipe          | -      |
| name        | string      | 是   | 设置该管道构建后的名称             | -      |
| arguments   | JSON Object | 是   | 设置该管道构建的参数               | -      |
| description | string      | 否   | 设置该管道构建后的简介             | ""     |
| public      | bool        | 否   | 设置该管道构建后是否对所有用户可用 | true   |


## GET /pipes

获取用户可用的已构建管道，表现为 JSON 数组形式。

```json
[
  {
    "id": 2,
    "owner": {
      "uuid": "cb5af947-ab38-4f4b-9a13-d807b3a784cc",
      "username": "yesterday1742322",
      "level": 0,
      "setting": {
        "account": {
          "name": "某昨",
          "email": "mmf@mmf.moe",
          "icon": "233"
        }
      }
    },
    "module": "youtube-dl",
    "pipe": "download",
    "name": "test",
    "description": "hmmm",
    "public": true,
    "arguments": "{}"
  }
]
```

## GET /pipes/:id

获得对应 `id` 的管道构建信息。

```json
{
  "id": 2,
  "owner": {
    "uuid": "cb5af947-ab38-4f4b-9a13-d807b3a784cc",
    "username": "yesterday1742322",
    "level": 0,
    "setting": {
      "account": {
        "name": "某昨",
        "email": "mmf@mmf.moe",
        "icon": "233"
      }
    }
  },
  "module": "youtube-dl",
  "pipe": "download",
  "name": "test",
  "description": "hmmm",
  "public": true,
  "arguments": "{}"
}
```

## DELETE /pipes/:id

删除对应 `id` 的管道构建。
