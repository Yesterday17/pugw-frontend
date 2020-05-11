---
title: Pipeline 构建
lang: zh-CN
---

# Pipeline 构建

::: danger 实现进度
- `pug-backend`：50%
- `pugw-frontend`：0%
:::

Pipeline 是 PUG 的用户态基本复用单元，通过对管道进行拼接，用户可以组装出符合自己需求的 Pipeline 以供不同 Workflow 复用。

我们把构建 Pipeline，即管道从前至后连为一体的过程称为**管道拼接**（Pipeline connect）。

## POST /pipeline

创建新 Pipeline。创建成功时返回创建后的 JSON 对象。

```json
{
  "id": 6,
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
  "name": "test",
  "description": "hmmm",
  "public": true,
  "pipes": [
    {
      "id": 6,
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
}
```

### 请求参数

| 参数名      | 类型   | 必须 | 描述                                                                       | 默认值 |
| ----------- | ------ | ---- | -------------------------------------------------------------------------- | ------ |
| name        | string | 是   | 设置该管道构建后的名称                                                     | -      |
| pipes       | string | 是   | 设置该 Pipeline 拼接时使用的 Pipe，是以逗号（`'`）隔开的构建管道 ID 字符串 | -      |
| description | string | 否   | 设置该管道构建后的简介                                                     | ""     |
| public      | bool   | 否   | 设置该管道构建后是否对所有用户可用                                         | true   |

## GET /pipeline

获取用户可用的 Pipeline。

```json
[
  {
    "id": 5,
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
    "name": "test",
    "description": "hmmm",
    "public": true,
    "pipes": [
      {
        "id": 5,
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
  }
]
```

## GET /pipeline/:id

::: danger 警告
当前版本未计划实现该方法
:::

获得对应 `id` 的 Pipeline 信息。

## PATCH /pipeline/:id

::: danger 警告
当前版本未计划实现该方法
:::

修改对应 `id` 的 Pipeline 信息。

## DELETE /pipeline/:id

::: danger 警告
当前版本未计划实现该方法
:::

删除对应 `id` 的 Pipeline。