---
title: Session 管理
lang: zh-CN
---

# Session 管理

::: tip 实现进度
- `pug-backend`：100%
- `pugw-frontend`：100%
:::

Session 是 `pug-backend` 判断用户登录的凭据，为 `httpOnly` 的 `Cookie` 字段，存储对应用户信息的 JWT。

Session 相关的接口都在 `/session` 下，具体如下：

## GET /session/key

获取登录所需的 RSA 公钥，返回内容为纯文本。如下例：

```rsa
-----BEGIN RSA PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAwRnCTK0RM50GY0dEvwCD
GUOAD/Qwm+tmt+DfvJqCDSxm38oMrNZcSQtt3nO/Oxa/pBWmrgGtfMWnRimWPo/C
wuujGBWKzsQPCqDPMHyJVOI7rYuQoZZrJvdRJrSJYjM8BEVHqOVXlUPeheUSXM7q
/AFHTsAbmrdUL850tgajFdPfCRRyFwFK7UILhSRGQ11O8CIzmc1XhzO8maCZZpwC
5AiVyJNAKCz6od0yPl7DzEUOdltd+eU1amHxNQXbJXHumnrvq0QJrukl9YSbJnfW
q56mINXmykzEGVK8j7pBPaytxsEe3VXgb3Xw+dLMVvSobp17z4HFpNSZSea3YuXy
+q+n0yONeEZTI7Ef0VGpgBz7RLk+LomJqfNFUGOz7R0ypI1CjTAOfwVpJ6KVQ9XA
Mu4VyufNt20K/F3ANtNm9vA9QrkOLf/ZYa0V9xKFdUL9ZLbk3cJBv1DqiJgFraTh
0TO3t9mbFyai2VQYyqvo6Cc+J0gSM2XiMqKlipj2kbCybWWZMPArxAUnOLSq+Wz9
RZeol80a81H8uwbLvlYTXo8ZuDFEfzXYi+UE7mCAmGdF9U0/exeYpzPoRGmcws30
6Up4E4a5Km6zpljgzQsT5CTKWZOlLCmrenYFGl+laCz4r+8wDf/cZwrLCCMa0S3I
YFgNf8BUAhbUyKzJi/O5c6sCAwEAAQ==
-----END RSA PUBLIC KEY-----
```

## POST /session

用户登录

### 请求参数

| 参数名   | 类型   | 必须 | 描述                         | 默认值 |
| -------- | ------ | ---- | ---------------------------- | ------ |
| username | string | 是   | 登录用户的用户名             | -      |
| password | string | 是   | 登录用户经过公钥加密后的密码 | -      |

### 返回状态

| 状态码 | 简介                                    |
| ------ | --------------------------------------- |
| 200    | 登录成功，会 `Set-Cookies` 所需的凭据。 |
| 400    | `username` 或 `password` 任一项不存在。 |

## PUT /session

用户注册。

### 请求参数

| 参数名   | 类型   | 必须 | 描述                         | 默认值 |
| -------- | ------ | ---- | ---------------------------- | ------ |
| username | string | 是   | 注册用户的用户名             | -      |
| password | string | 是   | 注册用户经过公钥加密后的密码 | -      |
| name     | string | 否   | 注册用户的昵称               | -      |
| email    | string | 否   | 注册用户的邮箱               | -      |
| icon     | string | 否   | 注册用户的头像链接           | -      |

### 返回状态

| 状态码 | 简介                                    |
| ------ | --------------------------------------- |
| 201    | 注册成功，会 `Set-Cookies` 所需的凭据。 |
| 400    | `username` 或 `password` 任一项不存在。 |

## DELETE /session

用户注销。除非服务器错误，否则该操作必定成功。
