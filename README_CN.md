<h1 align="center">
<img src="https://socialify.git.ci/toimc/vite-plugin-cdn-next/image?description=1&font=Source+Code+Pro&issues=1&language=1&name=1&owner=1&pattern=Circuit+Board&pulls=1&stargazers=1&theme=Auto" alt="vite-plugin-cdn-next" width="640" height="320" />
</h1>

# Vite 插件 CDN Next

[English](./README.md)

## 目录

- [Vite 插件 CDN Next](#vite-插件-cdn-next)
  - [目录](#目录)
  - [介绍](#介绍)
  - [安装](#安装)
  - [用法](#用法)
    - [基本设置](#基本设置)
    - [选项](#选项)
    - [IModule 接口](#imodule-接口)
      - [示例](#示例)
    - [解析](#解析)
  - [示例](#示例-1)
  - [调试](#调试)
  - [贡献](#贡献)
  - [报告问题](#报告问题)
  - [许可证](#许可证)
  - [作者](#作者)

## 介绍

`vite-plugin-cdn-next` 是一个 Vite 插件，允许您用 CDN 链接替换模块，从而通过减少包大小和提高加载速度来优化构建过程。

## 安装

```bash
pnpm add vite-plugin-cdn-next -D
```

## 用法

### 基本设置

```typescript
// vite.config.ts

import { defineConfig } from 'vite'
import { cdn } from 'vite-plugin-cdn-next'

export default defineConfig({
  plugins: [cdn({ modules: ['vue'] })]
})
```

### 选项

| 参数       | 类型                        | 默认值                                      | 描述                         |
| ---------- | --------------------------- | ------------------------------------------- | ---------------------------- |
| `include`  | `FilterPattern`             | `/\.(mjs\|js\|ts\|vue\|jsx\|tsx)(\?.*\|)$/` | 包含所有符合这些条件的资产。 |
| `exclude`  | `FilterPattern`             | `-`                                         | 排除所有符合这些条件的资产。 |
| `modules`  | `Array<IModule \| string> ` | `[]`                                        | 应转换的模块。               |
| `logLevel` | `silent\|warn`              | `warn`                                      | 调整控制台输出的详细程度。   |
| `resolve`  | `ResolveOptions`            | `jsdelivr plugin`                           | 注入页面的 URL 解析器。      |
| `apply`    | `string`                    | `build`                                     | 与 vite apply 相同。         |

### IModule 接口

`IModule` 接口允许您指定 CDN 插件应如何处理模块。以下是您可以定义的属性：

- **name**: 模块的名称。
- **global**: （可选）模块导出的全局变量名称。当模块在浏览器环境中预期可用作全局变量时，这很有用。
- **spare**: （可选）脚本或链接备用的数组，或字符串。可用于指定应与模块一起加载的其他资源。
- **relativeModule**: （可选）模块文件的相对路径。
- **aliases**: （可选）模块的替代名称数组。

#### 示例

1. **基本模块配置**

   ```typescript
   const modules: IModule[] = [
     { name: 'react', global: 'React' },
     { name: 'react-dom', global: 'ReactDOM' }
   ]
   ```

2. **使用别名**

   ```typescript
   const modules: IModule[] = [
     {
       name: 'lodash',
       global: '_',
       aliases: ['lodash-es']
     }
   ]
   ```

3. **指定相对模块路径**

   ```typescript
   const modules: IModule[] = [
     {
       name: 'moment',
       relativeModule: './min/moment.min.js'
     }
   ]
   ```

4. **使用备用资源**

   ```typescript
   const modules: IModule[] = [
     {
       name: 'jquery',
       global: '$',
       spare: [{ url: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js' }]
     }
   ]
   ```

5. **全局变量使用**

   ```typescript
   const modules: IModule[] = [
     {
       name: 'd3',
       global: 'd3',
       spare: [{ url: 'https://d3js.org/d3.v6.min.js' }]
     }
   ]
   ```

这些示例演示了如何配置 `IModule` 接口以自定义从 CDN 加载模块的方式，包括使用全局变量和备用资源。

### 解析

如果默认行为不符合您的需求，您可以定义自定义解析逻辑：

```typescript
import { defineResolve } from 'vite-plugin-cdn-next/resolve'

export const myResolve = defineResolve({
  name: 'resolve:custom',
  setup({ extra }) {
    const baseURL = 'https://cdnjs.cloudflare.com/ajax/libs/'
    const { version, name, relativeModule } = extra
    const url = new URL(`${name}/${version}/${relativeModule}`, baseURL)
    return {
      url: url.href,
      injectTo: 'head-prepend',
      attrs: {}
    }
  }
})
```

## 示例

React 示例

```javascript
// examples/react/vite.config.js

import { defineConfig } from 'vite'
import React from '@vitejs/plugin-react'
import { cdn } from 'vite-plugin-cdn-next'

export default defineConfig({
  plugins: [
    React(),
    cdn({
      modules: [
        { name: 'react', relativeModule: './umd/react.production.min.js' },
        {
          name: 'react-dom',
          relativeModule: './umd/react-dom.production.min.js',
          aliases: ['client']
        }
      ],
      apply: 'build'
    })
  ]
})
```

Vue 3 示例

```typescript
// examples/vue3/vite.config.ts

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { cdn } from 'vite-plugin-cdn-next'

export default defineConfig({
  plugins: [
    vue(),
    cdn({
      modules: ['vue'],
      apply: 'build'
    })
  ]
})
```

## 调试

要调试项目，请按照以下步骤操作：

1. 在根目录中运行 `dev` 命令：
   ```bash
   pnpm run dev
   ```
2. 打开 Visual Studio Code 并使用调试功能启动 `Build Vite-Vue3` [任务](./.vscode/launch.json)。

## 贡献

欢迎贡献！如果您有建议或改进，请 fork 仓库并提交 pull request。确保您的代码符合项目的编码标准并包含适当的测试。

## 报告问题

如果您遇到任何问题，请在我们的 [GitHub Issues](https://github.com/toimc/vite-plugin-cdn-next/issues) 页面上报告。在提交问题时，请包括以下内容：

1. **最小复现**: 提供一个可以重现问题的仓库链接或代码片段。这有助于我们快速理解问题并进行修复。
2. **错误描述**: 清楚地描述错误，包括任何错误消息、堆栈跟踪以及预期与实际行为。
3. **环境详情**: 包括您的开发环境的详细信息，例如操作系统、Node.js 版本和任何相关配置。

## 许可证

[MIT](./LICENSE)

## 作者

Brian <admin@wayearn.com>
