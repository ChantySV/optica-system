// src/eventBus.ts
import { ref } from 'vue';

export const trabajoCreadoEvent = ref(0);

export function triggerTrabajoCreado() {
  trabajoCreadoEvent.value++;
}
