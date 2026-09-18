<script setup lang="ts">
useHead({
  htmlAttrs: { lang: 'en' }
})
</script>

<template>
  <UApp :toaster="null">
    <NuxtLoadingIndicator
      color="var(--ui-primary)"
      :height="3"
      :duration="2000"
    />
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage
        :transition="{
          name: 'page',
          mode: 'out-in'
        }"
      />
    </NuxtLayout>
  </UApp>
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>
