<h1 align="center">
<img src="https://socialify.git.ci/toimc/vite-plugin-cdn-next/image?description=1&font=Source+Code+Pro&issues=1&language=1&name=1&owner=1&pattern=Circuit+Board&pulls=1&stargazers=1&theme=Auto" alt="vite-plugin-cdn-next" width="640" height="320" />
</h1>

# Vite Plugin CDN Next

## Table of Contents

[toc]

## Introduction

`vite-plugin-cdn-next` is a Vite plugin that allows you to replace modules with CDN links, optimizing your build process by reducing bundle size and improving load times.

## Installation

```bash
pnpm add vite-plugin-cdn-next -D
```

## Usage

### Basic Setup

```typescript
// vite.config.ts

import { defineConfig } from 'vite'
import { cdn } from 'vite-plugin-cdn-next'

export default defineConfig({
  plugins: [cdn({ modules: ['vue'] })]
})
```

### Options

| params     | type                        | default                                     | description                                          |
| ---------- | --------------------------- | ------------------------------------------- | ---------------------------------------------------- |
| `include`  | `FilterPattern`             | `/\.(mjs\|js\|ts\|vue\|jsx\|tsx)(\?.*\|)$/` | Include all assets matching any of these conditions. |
| `exclude`  | `FilterPattern`             | `-`                                         | Exclude all assets matching any of these conditions. |
| `modules`  | `Array<IModule \| string> ` | `[]`                                        | Should convert module.                               |
| `logLevel` | `silent\|warn`              | `warn`                                      | Adjust console output verbosity.                     |
| `resolve`  | `ResolveOptions`            | `jsdelivr plugin`                           | URL parser injected into the page.                   |
| `apply`    | `string`                    | `build`                                     | Same as vite apply.                                  |

### IModule Interface

The `IModule` interface allows you to specify how modules should be handled by the CDN plugin. Here are the properties you can define:

- **name**: The name of the module.
- **global**: (Optional) The global variable name that the module exports. This is useful when the module is expected to be available as a global variable in the browser environment.
- **spare**: (Optional) An array of script or link spares, or a string. This can be used to specify additional resources that should be loaded alongside the module.
- **relativeModule**: (Optional) The relative path to the module file.
- **aliases**: (Optional) An array of alternative names for the module.

#### Examples

1. **Basic Module Configuration**

   ```typescript
   const modules: IModule[] = [
     { name: 'react', global: 'React' },
     { name: 'react-dom', global: 'ReactDOM' }
   ]
   ```

2. **Using Aliases**

   ```typescript
   const modules: IModule[] = [
     {
       name: 'lodash',
       global: '_',
       aliases: ['lodash-es']
     }
   ]
   ```

3. **Specifying a Relative Module Path**

   ```typescript
   const modules: IModule[] = [
     {
       name: 'moment',
       relativeModule: './min/moment.min.js'
     }
   ]
   ```

4. **Using Spare Resources**

   ```typescript
   const modules: IModule[] = [
     {
       name: 'jquery',
       global: '$',
       spare: [{ url: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js' }]
     }
   ]
   ```

5. **Global Variable Usage**

   ```typescript
   const modules: IModule[] = [
     {
       name: 'd3',
       global: 'd3',
       spare: [{ url: 'https://d3js.org/d3.v6.min.js' }]
     }
   ]
   ```

These examples demonstrate how to configure the `IModule` interface to customize how modules are loaded from a CDN, including the use of global variables and spare resources.

### Resolve

You can define custom resolve logic if the default behavior doesn't meet your needs:

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

## Examples

React Example

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

Vue 3 Example

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

## Debugging

To debug the project, follow these steps:

1. Run the `dev` command in the root directory:
   ```bash
   pnpm run dev
   ```
2. Open Visual Studio Code and use the debugging feature to start the `Build Vite-Vue3` [task](./.vscode/launch.json).

## Contributing

Contributions are welcome! If you have suggestions or improvements, please fork the repository and submit a pull request. Ensure your code adheres to the project's coding standards and includes appropriate tests.

## Reporting Issues

If you encounter any issues, please report them on our [GitHub Issues](https://github.com/toimc/vite-plugin-cdn-next/issues) page. When submitting an issue, please include the following:

1. **Minimal Reproduction**: Provide a link to a repository or a code snippet that reproduces the issue. This helps us understand the problem quickly and work on a fix.
2. **Error Description**: Clearly describe the error, including any error messages, stack traces, and the expected versus actual behavior.
3. **Environment Details**: Include details about your development environment, such as operating system, Node.js version, and any relevant configurations.

## License

[MIT](./LICENSE)

## Author

Brian <admin@wayearn.com>
