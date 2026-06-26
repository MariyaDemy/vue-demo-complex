# Webix-Vue demo with Complex Widgets

This repo contains examples of importing Webix [Complex Widgets](https://webix.com/widget/complex-widgets/) into a Vue App.<br/>
By default, the demo shows how to initialize the [**Gantt**](https://webix.com/gantt/) and [**Spreadsheet**](https://webix.com/spreadsheet/), but it can be replaced with any of Webix Complex Widgets.

Complex widgets are PRO components.<br/>By default, Webix, Spreadsheet, and Gantt are fetched from npm, so make sure you have signed in to our [private @xbs scope](https://docs.webix.com/desktop__install.html#installingwithnpm). <br/>
**Note**: NPM always provides access to the latest versions of packages, so credentials are valid only while the license is active. <br/>
Alternatively, you can remove these dependencies, get the "codebase" from a Webix Core/Complex widget package and include the js files through a `<script>` in the index.html. This can be done for **Trial** package as well (check [webix.com/download](https://webix.com/download/)).

The demo was bootstrapped with [create-vue](https://github.com/vuejs/create-vue).

## How to Start

```
npm install
npm run dev
```

Open `http://localhost:5173/` to view the demo in the browser.

**Production build**

To build the production version, run `npm run build`.

It will build the application for production to the _dist_ folder. After that your app is ready to be deployed.

To preview the built application, use `npm run preview`.

## How to import and use a Complex Widget

### Option 1: Global import (see the [main](https://github.com/webix-hub/vue-demo-complex/tree/main) branch)

The minimum requirements to init the Gantt/Spreadsheet in a Vue app are

- have a global Webix object (it should be available _before_ the component's sources are imported).
  Since there're two complex widgets in this demo, the global assignment was moved to `main.js`.
- import the widget from `"@xbs/gantt"`.

```js
import * as webix from '@xbs/webix-pro';
window.webix = webix;
```

```js
const uiContainer = useTemplateRef('container');
onMounted(async () => {
	const container = uiContainer.value;

	await import('@xbs/gantt');
	if (disposed || !container) return;

	uiGantt = webix.ui({
		view: 'gantt',
		url,
		container
	});
});
```

### Option 2: Inject Plugin (see the [demo-injectplugin](https://github.com/webix-hub/vue-demo-complex/tree/demo-injectplugin) branch)

Another option is to use a [Rollup Inject Plugin](https://www.npmjs.com/package/@rollup/plugin-inject).
When using auto import of webix-pro, it is required to initialize the Gantt [as a Jet application](https://docs.webix.com/gantt__creating.html) (or other complex widgets that support this feature).<br/>
The Spreadsheet and Kanban can be initialized in the same way as in the 1st option.

In Vite configuration, add

```js
// use rollup inject plugin for the src files in dev mode
plugins: [
    { ...inject({ webix: ["@xbs/webix-pro", "*"], include:["files to process"]})
}],
// use rollup inject plugin for the node_modules packages in dev mode
optimizeDeps: { rollupOptions: { plugins: [
        inject({webix: ["@xbs/webix-pro", "*"]})
    ]},
},
// use rolldown built-in feature inject for build mode
build: {
    rolldownOptions: { transform: { inject: { webix: ["@xbs/webix-pro", "*"] } } },
}
```

So that the webix will be available in all modules where necessary.

```js
const uiContainer = useTemplateRef("container");
onMounted(() => {
    const container = uiContainer.value;

    const gantt = await import("@xbs/gantt");
    if (disposed || !container) return;

    appGantt = new gantt.App({
        webix, // and provide the global Webix scope here
        url,
    });
    appGantt.render(container);
})
```

Gantt and all Complex Widgets released since version 7.2 are SPA wrapped into Webix views (here's [an article](https://blog.webix.com/new-strategy-of-complex-widgets-why-webix-jet/) about their features).
To be able to use all their features (including [customization of modules](https://docs.webix.com/gantt__customization.html)), these components should be imported with the following statements:

```
import("@xbs/gantt").then((gantt) => {...})
```

or

```
// async
const gantt = await import("@xbs/gantt");
await import "@xbs/spreadsheet";

class CustomTree extends gantt.views.tree {...}
```

## Requirements

Node.js `^20.19.0` or `>=22.12.0`

## License

MIT
