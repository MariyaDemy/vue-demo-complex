<script setup>
import { useTemplateRef, onMounted, onUnmounted } from "vue";
import { useResizeObserver } from "./composables/useResizeObserver.js";

import "@xbs/webix-pro/webix.css";
import "@xbs/spreadsheet/spreadsheet.css";

const uiContainer = useTemplateRef("container");
let uiSheets = null;
let disposed = false;

const { observeResize } = useResizeObserver();

const props = defineProps(["data"]);

onMounted(async () => {
    const container = uiContainer.value;

    await import("@xbs/spreadsheet");
    if (disposed || !container) return;

    uiSheets = webix.ui({
        view: "spreadsheet",
        toolbar: "full",
        data: props.data,
        container
	});

    observeResize(container, () => {
        if(uiSheets) uiSheets.adjust();
    });
})

onUnmounted(() => {
    disposed = true;
    if(uiSheets){
        uiSheets.destructor();
        uiSheets = null;
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
