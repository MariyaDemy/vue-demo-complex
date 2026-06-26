import { onUnmounted } from "vue";

export function useResizeObserver(debounceMs = 30) {
  let observer = null;
  let delay = null;

  const observeResize = (container, callback) => {
    if (!container) return;

    observer = new ResizeObserver(() => {
      clearTimeout(delay);
      delay = setTimeout(() => {
        callback();
      }, debounceMs);
    });

    observer.observe(container);
  };

  const stopObserver = () => {
    if (delay) {
      clearTimeout(delay);
    }
    if (observer) {
      observer.disconnect();
    }

    delay = null;
    observer = null;
  };

  onUnmounted(stopObserver);

  return {
    observeResize,
    stopObserver,
  };
}