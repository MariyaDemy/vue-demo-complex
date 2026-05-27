<script setup>
import { useTemplateRef, onMounted, onUnmounted } from "vue";

import "@xbs/webix-pro/webix.css";
import "@xbs/gantt/codebase/gantt.css";

const uiContainer = useTemplateRef("container");
let uiGantt = null;
let resizeObserver = null;
let resizeDelay = null;

onMounted(() => {
    const container = uiContainer.value;

    import("@xbs/gantt").then((gantt) => {

        uiGantt = webix.ui({
            view: "gantt",
            url: "https://docs.webix.com/gantt-backend/",
            container
		});

        resizeObserver = new ResizeObserver(() => {
            if (uiGantt){
                clearTimeout(resizeDelay);
                resizeDelay = setTimeout(() => {
                    uiGantt.adjust();
                }, 30);
            }
        });
        resizeObserver.observe(container);
    })
})

onUnmounted(() => {
    clearTimeout(resizeDelay);
    resizeObserver?.disconnect();

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
        height: 70vh;
        width: 100%;
    }
</style>