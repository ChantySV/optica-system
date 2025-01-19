<template>
  <router-view />
  <VueQueryDevtools />
</template>


<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'
import { useAuthStore } from './modules/auth/stores/auth.store'
import { AuthStatus } from './modules/auth/interfaces/auth-status.enum'


const router = useRouter()
const route = useRoute()

const authStore = useAuthStore()

authStore.$subscribe((_, state) => {
  if (route.path.includes('/auth') && state.authStatus === AuthStatus.Authenticated) {
    router.replace({ name: 'home' })
    return
  }
}, { immediate: true }
)
</script>
