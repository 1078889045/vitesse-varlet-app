<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: import.meta.env.VITE_APP_TITLE,
  meta: [
    { name: 'description', content: 'BCT Vitesse-Varlet-App Template' },
  ],
})
</script>

<template>
  <RouterView />
</template>
