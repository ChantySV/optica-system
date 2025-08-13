import { ref } from 'vue';

export const ventaCreadaEvent = ref(0);

export function triggerVentaCreada() {
  ventaCreadaEvent.value++;
}
