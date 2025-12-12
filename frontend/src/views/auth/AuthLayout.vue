<template>
  <div
    class="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8"
  >
    <div
      class="w-full max-w-md mx-auto space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100"
    >
      <div class="text-center">
        <!-- Optional Logo Placeholder -->
        <!-- <img class="mx-auto h-12 w-auto" src="/logo.png" alt="Logo" /> -->
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900 tracking-tight">
          {{ title }}
        </h2>
        <p v-if="subtitle" class="mt-2 text-sm text-gray-600">
          <span v-html="subtitle"></span>
        </p>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
}>();
</script>
