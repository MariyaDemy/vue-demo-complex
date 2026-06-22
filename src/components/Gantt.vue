<script setup>
import { useTemplateRef, onMounted, onUnmounted } from "vue";
import { useResizeObserver } from "./composables/useResizeObserver.js";

import "@xbs/webix-pro/webix.css";
import "@xbs/gantt/codebase/gantt.css";

const uiContainer = useTemplateRef("container");
let uiGantt = null;
let disposed = false;

const { observeResize } = useResizeObserver();

onMounted(async () => {
    const container = uiContainer.value;

    await import("@xbs/gantt");
    if (disposed || !container) return;

    uiGantt = webix.ui({
        view: "gantt",
        url: "https://docs.webix.com/gantt-backend/",
        container
    });

    observeResize(container, () => {
        if(uiGantt) uiGantt.adjust();
    });
})

onUnmounted(() => {
    disposed = true;
    if(uiGantt){
        uiGantt.destructor();
        uiGantt = null;
    }
})
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