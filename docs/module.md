---
title: Module 与 Pipe 管理
lang: zh-CN
---

# Module 与 Pipe 管理

::: warning 实现进度
- `pug-backend`：90%
- `pugw-frontend`：0%
:::

管道（Pipe）是 PUG 中最小的单元，负责单一的功能。管道的可用种类在 PUG 编译后已经确定，无法在运行时修改（Plugin 系统尚未实现）。

管道依托模块（Module）存在，模块作为一类管道的集合，起命名空间的作用。

由于模块的静态性，因此对模块的管理也不存在删除这一选项，只能调整使用权限。用户只能在 `[0, 自身权限]` 区间内调整使用权限。

## GET /module

获取可用的模块列表。返回可用模块的 `JSON` 数组：

```json
[
  {
    "name": "name",
    "description": "desc",
    "author": ["author"],
    "usage": ""
  }
]
```

## GET /module/:module

获取指定模块的详细属性。

### 返回状态

| 状态码 | 简介                                                     |
| ------ | -------------------------------------------------------- |
| 200    | 获取成功。返回该模块的 `JSON` 说明，与上文列表格式一致。 |
| 403    | 用户没有使用该模块的权限。                               |
| 404    | 模块不存在。                                             |

## PATCH /module/:module

修改模块的使用权限。

### 请求参数

| 参数名 | 类型 | 必须 | 描述                                                         | 默认值 |
| ------ | ---- | ---- | ------------------------------------------------------------ | ------ |
| level  | int  | 是   | 设置能够使用该模块的最低使用权限等级，不得超过自身的权限等级 | 0      |


### 返回状态

| 状态码     | 简介                                             |
| ---------- | ------------------------------------------------ |
| 200        | 修改成功。返回当前该用户可用的**模块名称**数组。 |
| 400        | 输入非法。                                       |
| 403        | 用户没有修改模块使用用户等级的权限。             |
| 404        | 模块不存在。                                     |
| 409(draft) | 存在正在使用该模块的 Pipeline 或 Workflow。      |

## GET /pipe

获取可用管道列表及构造签名，返回可用管道的 JSON 数组：

```json
{
  "bilibili": [
    {
      "name": "login-qr",
      "must": {
        "timeout": 2
      },
      "optional": {}
    }
  ],
  "shell": [
    {
      "name": "bash",
      "must": {
        "cmd": 24
      },
      "optional": {}
    }
  ],
  "youtube-dl": [
    {
      "name": "download",
      "must": {
        "url": 24
      },
      "optional": {
        "proxy": 24
      }
    }
  ]
}
```

## GET /pipe/:module

获取指定模块中管道的构造签名：

```json
[
  {
    "name": "login-qr",
    "must": {
      "timeout": 2
    },
    "optional": {}
  }
]
```

## PATCH /pipe/:module/:pipe

修改管道的使用权限。

### 请求参数

| 参数名 | 类型 | 必须 | 描述                                                                                               | 默认值 |
| ------ | ---- | ---- | -------------------------------------------------------------------------------------------------- | ------ |
| level  | int  | 是   | 设置能够使用该管道的最低权限等级，必须大于或等于该模块的最低使用权限等级，且不得超过自身的权限等级 | 0      |

### 返回状态

| 状态码     | 简介                                                 |
| ---------- | ---------------------------------------------------- |
| 200        | 启用成功。返回该模块下该用户可用的**管道名称**列表。 |
| 403        | 用户没有修改管道使用用户登记的权限。                 |
| 404        | 模块或管道不存在。                                   |
| 409(draft) | 存在正在使用该管道的 Pipeline。                      |
