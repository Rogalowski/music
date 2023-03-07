# VUE

## Install

First you have to [install Node Version Manager](https://www.geeksforgeeks.org/how-to-install-and-use-nvm-on-windows/)
To confirm nvm is installed successfully run

```shell
nvm -v
```

Than run in powershell \*\*as superuser

```bash
nvm install 18.5.0 x64
```

You should now be able to run (from both bash and powershell)

```bash
node -v
```

Now install pnpm

```bash
npm install -g pnpm
```

While being in `project_folder` directory run

```bash
pnpm i
```

To install all the dependencies in `node_modeles/`

## Usage

To use `pnpm` you need to be inside `frontend/` directory.

### Development

Just run and visit http://localhost:5000

```bash
pnpm dev
```

### Build

To build the App into static files, run

```bash
pnpm build
```

### Testing

```bash
pnpm test
```

To run in seperate UI:

```bash
pnpm vitest --ui
```

## Structure

-   `cypress/` end2end testing
-   `public/` static files that won't be processed on build. They are simply copied alongside build result
-   `src/`
    -   `components\` Vue components
    -   `composables\` functions and [vue composables](https://vuejs.org/guide/reusability/composables.html)
    -   `layouts\` components which help to structure how page looks
    -   `model\` CANDI 2 form definition. Read more in `src/model/README.md`
    -   `modules\` extra modules definitions
    -   `pages\` route components [Read more](https://github.com/hannoeru/vite-plugin-pages)
    -   `store\` [pinia store](https://pinia.vuejs.org/core-concepts/) definitions
    -   `styles\` stylesheet files

## Features

-   ⚡️ [Vue 3](https://github.com/vuejs/core), [Vite 3](https://github.com/vitejs/vite), [pnpm](https://pnpm.io/), [ESBuild](https://github.com/evanw/esbuild)
-   🗂 File based routing
-   📦 [Components auto importing](./src/components)
-   🍍 [State Management via Pinia](https://pinia.vuejs.org/)
-   📑 [Layout system](./src/layouts)
-   📲 [PWA](https://github.com/antfu/vite-plugin-pwa)
-   🎨 [UnoCSS](https://github.com/antfu/unocss) - the instant on-demand atomic CSS engine
-   😃 [Use icons from any icon sets with classes](https://github.com/antfu/unocss/tree/main/packages/preset-icons)
-   🗒 [Markdown Support](https://github.com/antfu/vite-plugin-vue-markdown)
-   🔥 Use the [new `<script setup>` syntax](https://github.com/vuejs/rfcs/pull/227)
-   🤙🏻 [Reactivity Transform](https://vuejs.org/guide/extras/reactivity-transform.html) enabled
-   📥 [APIs auto importing](https://github.com/antfu/unplugin-auto-import) - use Composition API and others directly
-   🖨 Static-site generation (SSG) via [vite-ssg](https://github.com/antfu/vite-ssg)
-   🦔 Critical CSS via [critters](https://github.com/GoogleChromeLabs/critters)
-   🦾 TypeScript
-   ⚙️ Unit Testing with [Vitest](https://github.com/vitest-dev/vitest), E2E Testing with [Cypress](https://cypress.io/)

### UI Frameworks

-   [UnoCSS](https://github.com/antfu/unocss) - The instant on-demand atomic CSS engine.

### Icons

-   [Iconify](https://iconify.design) - use icons from any icon sets [🔍Icônes](https://icones.netlify.app/)
-   [Pure CSS Icons via UnoCSS](https://github.com/antfu/unocss/tree/main/packages/preset-icons)

### Plugins

-   [Vue Router](https://github.com/vuejs/router)
    -   [`vite-plugin-pages`](https://github.com/hannoeru/vite-plugin-pages) - file system based routing
    -   [`vite-plugin-vue-layouts`](https://github.com/JohnCampionJr/vite-plugin-vue-layouts) - layouts for pages
-   [Pinia](https://pinia.esm.dev) - Intuitive, type safe, light and flexible Store for Vue using the composition api
-   [`unplugin-vue-components`](https://github.com/antfu/unplugin-vue-components) - components auto import
-   [`unplugin-auto-import`](https://github.com/antfu/unplugin-auto-import) - Directly use Vue Composition API and others without importing
-   [`vite-plugin-pwa`](https://github.com/antfu/vite-plugin-pwa) - PWA
-   [`vite-plugin-vue-markdown`](https://github.com/antfu/vite-plugin-vue-markdown) - Markdown as components / components in Markdown
    -   [`markdown-it-shiki`](https://github.com/antfu/markdown-it-shiki) - [Shiki](https://github.com/shikijs/shiki) for syntax highlighting
-   [VueUse](https://github.com/antfu/vueuse) - collection of useful composition APIs
-   [`vite-ssg-sitemap`](https://github.com/jbaubree/vite-ssg-sitemap) - Sitemap generator
-   [`@vueuse/head`](https://github.com/vueuse/head) - manipulate document head reactively

### Coding Style

-   Use Composition API with [`<script setup>` SFC syntax](https://github.com/vuejs/rfcs/pull/227)
-   [ESLint](https://eslint.org/) with [@antfu/eslint-config](https://github.com/antfu/eslint-config), single quotes, no semi.

### Dev tools

-   [TypeScript](https://www.typescriptlang.org/)
-   [Vitest](https://github.com/vitest-dev/vitest) - Unit testing powered by Vite
-   [Cypress](https://cypress.io/) - E2E testing
-   [pnpm](https://pnpm.js.org/) - fast, disk space efficient package manager
-   [`vite-ssg`](https://github.com/antfu/vite-ssg) - Static-site generation
-   [critters](https://github.com/GoogleChromeLabs/critters) - Critical CSS
-   [Netlify](https://www.netlify.com/) - zero-config deployment
-   [VS Code Extensions](./.vscode/extensions.json)
    -   [Vite](https://marketplace.visualstudio.com/items?itemName=antfu.vite) - Fire up Vite server automatically
    -   [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) - Vue 3 `<script setup>` IDE support
    -   [Iconify IntelliSense](https://marketplace.visualstudio.com/items?itemName=antfu.iconify) - Icon inline display and autocomplete
    -   [i18n Ally](https://marketplace.visualstudio.com/items?itemName=lokalise.i18n-ally) - All in one i18n support
    -   [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)