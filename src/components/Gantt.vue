<script setup>
import { useTemplateRef, onMounted, onUnmounted } from 'vue';
import { useResizeObserver } from './composables/useResizeObserver.js';

import '@xbs/webix-pro/webix.css';
import '@xbs/gantt/codebase/gantt.css';

const uiContainer = useTemplateRef('container');
let appGantt = null;
let disposed = false;

const { observeResize } = useResizeObserver();

onMounted(async () => {
	const container = uiContainer.value;

	const gantt = await import('@xbs/gantt');
	if (disposed || !container) return;

	appGantt = new gantt.App({
		webix, // provide the global Webix scope
		url: 'https://docs.webix.com/gantt-backend/'
	});

	appGantt.render(container).then(() => {
		observeResize(container, () => {
			const view = appGantt.getRoot();
			if (view) view.adjust();
		});
	});
});

onUnmounted(() => {
	disposed = true;
	if (appGantt) {
		appGantt.destructor();
		appGantt = null;
	}
});
</script>

<template>
	<div ref="container" class="webix-container"></div>
</template>

<style scoped>
.webix-container {
	height: 75vh;
	width: 100%;
}
</style>
