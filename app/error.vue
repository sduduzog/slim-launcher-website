<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{ error: NuxtError }>()
</script>

<template>
  <div>
    <AppHeader />
    <main class="max-w-[48rem] mx-auto p-6 mt-12">
      <h1 class="text-3xl font-bold">
        {{
          error.statusCode === 404
            ? 'Page not found'
            : 'Unable to load this page'
        }}
      </h1>
      <p class="mt-4">
        <a href="/" class="underline">Return to the home page</a>
      </p>
    </main>
  </div>
</template>
