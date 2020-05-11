# pugw-frontend

## 简介

`pugw-frontend` 是面向用户的前端项目。作为 Project PUG 的一部分，它同时也是某校某组 2020 年春季 Web 大作业的一环。

它提供了对用户而言简单可用的面板环境，并且使得 PUG 能够更方便地为用户所用。

`pugw-frontend` 对接的是 `pug-backend`，后者为对接 PUG 的后端实现。

## 约定

在本文档中，一旦出现参数列表，则对于 `GET`、`DELETE` 等标准中不含 `body` 的方法而言是 `Param`；对于 `POST`、`PUT` 等能够携带 `body` 的方法，则是 `multipart/form-data` 类型的 `body`。

## 部署

::: warning
目前 `pug-backend` 接口设计尚未稳定。
:::

只要你有一台 VPS，你就可以很轻松地完成 `pugw-frontend` + `pug-backend` 的部署。

首先，你需要从 `pug-backend` 仓库中下载最新的构建，并将其上传到你的服务器上，按对应仓库的教程进行配置。

然后，你需要下载 `pugw-frontend` 的最新打包，并将其放在 `pug-backend` 同级的 `public` 目录下。

最后，你只要运行 `pug-backend` 就可以了。

## 贡献

如果你想要协助开发这个项目，请按照正常开源项目的贡献方式进行。
