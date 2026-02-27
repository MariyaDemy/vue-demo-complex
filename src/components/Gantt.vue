<script setup>
import { useTemplateRef, onMounted, onUnmounted } from 'vue';

import "@xbs/webix-pro/webix.css";
import "@xbs/gantt/codebase/gantt.css";

const uiContainer = useTemplateRef("container");
let appGantt = null;
let resizeObserver = null;
let resizeDelay = null;

onMounted(() => {
    const container = uiContainer.value;

    webix.ready(() => {
        import("@xbs/gantt").then((ganttModule) => {
            const gantt = ganttModule.default || ganttModule ;

            appGantt = new gantt.App({
                webix, // provide the global Webix scope
                url: "https://docs.webix.com/gantt-backend/",
		    });

            appGantt.render(container).then(() => {
                resizeObserver = new ResizeObserver(() => {
                    const view = appGantt.getRoot();
                    if (view){
                        clearTimeout(resizeDelay);
                        resizeDelay = setTimeout(() => {
                            view.adjust();
                        }, 30);
                    }
                });
                resizeObserver.observe(container);
            });
        })
    })
})

onUnmounted(() => {
    if(appGantt){
        if(appGantt.getRoot() && resizeObserver) resizeObserver.disconnect();
        appGantt.destructor();
        appGantt = null;
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