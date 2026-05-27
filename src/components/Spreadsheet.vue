<script setup>
import { useTemplateRef, onMounted, onUnmounted } from "vue";

import "@xbs/webix-pro/webix.css";
import "@xbs/spreadsheet/spreadsheet.css";

const uiContainer = useTemplateRef("container");
let uiSheets = null;
let resizeObserver = null;
let resizeDelay = null;

const props = defineProps(["data"]);

onMounted(() => {
    const container = uiContainer.value;

    import("@xbs/spreadsheet").then(() => {

        uiSheets = webix.ui({
            view: "spreadsheet",
            toolbar: "full",
            data: props.data,
            container
		});

        resizeObserver = new ResizeObserver(() => {
            if (uiSheets){
                clearTimeout(resizeDelay);
                resizeDelay = setTimeout(() => {
                    uiSheets.adjust();
                }, 30);
            }
        });
        resizeObserver.observe(container);

    })
})

onUnmounted(() => {
    clearTimeout(resizeDelay);
    resizeObserver?.disconnect();
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
        height: 70vh;
        width: 100%;
    }
</style>
