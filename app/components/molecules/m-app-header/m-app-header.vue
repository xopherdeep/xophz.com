<script setup lang="ts">
import { useAppHeaderController } from './m-app-header.controller'

const { navItems, isOpen, closeMenu } = useAppHeaderController()
</script>

<template>
  <UHeader
    v-model:open="isOpen"
    title="xophz"
    to="/"
    mode="slideover"
    :ui="{ body: 'flex-1 flex flex-col justify-between overflow-y-auto p-4 sm:p-6 h-full' }"
    class="m-app-header sticky top-0 z-50"
  >
    <template #title>
      <span class="flex items-center gap-2 group">
        <span class="relative flex items-center justify-center w-8 h-8 rounded-lg bg-violet-500/10 dark:bg-violet-500/15 group-hover:bg-violet-500/20 transition-colors duration-200">
          <span class="font-display font-bold text-sm text-violet-600 dark:text-violet-400">x</span>
        </span>
        <span class="font-display font-bold tracking-wide text-sm text-zinc-900 dark:text-zinc-100">
          xophz<span class="text-violet-600 dark:text-violet-400">.com</span>
        </span>
      </span>
    </template>

    <template #default>
      <UNavigationMenu :items="navItems" variant="pill" color="primary" class="hidden md:flex" />
    </template>

    <template #right>
      <div class="flex items-center gap-1.5">
        <UButton to="/connect" color="primary" variant="soft" size="xs" icon="i-lucide-mail" class="hidden sm:inline-flex">
          Connect
        </UButton>
        <UColorModeButton />
        <UButton to="https://github.com/xopherdeep" target="_blank" icon="i-lucide-github" color="neutral" variant="ghost" size="sm" aria-label="GitHub Profile" />
      </div>
    </template>

    <template #body>
      <div class="flex-1 flex flex-col justify-between h-full gap-4">
        <!-- Main Navigation Links -->
        <nav class="flex-1 flex flex-col justify-evenly py-2 gap-2 min-h-0" aria-label="Mobile Navigation">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-3.5 px-4 py-3 sm:py-3.5 rounded-xl text-base font-medium text-zinc-700 dark:text-zinc-200 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-500/10 dark:hover:bg-violet-500/15 transition-all duration-200 no-underline group flex-1 min-h-[44px]"
            active-class="bg-violet-500/15 text-violet-600 dark:text-violet-400 font-semibold"
            @click="closeMenu"
          >
            <UIcon :name="item.icon" class="w-5 h-5 text-zinc-400 dark:text-zinc-500 group-hover:text-violet-500 group-[.router-link-active]:text-violet-500 dark:group-[.router-link-active]:text-violet-400 transition-colors shrink-0" />
            <span class="truncate">{{ item.label }}</span>
          </NuxtLink>
        </nav>

        <!-- Bottom Connect Button -->
        <div class="pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80 mt-auto shrink-0">
          <UButton
            to="/connect"
            color="primary"
            variant="solid"
            size="xl"
            icon="i-lucide-mail"
            block
            class="shadow-glow-violet py-3.5 text-base font-semibold justify-center"
            @click="closeMenu"
          >
            Connect
          </UButton>
        </div>
      </div>
    </template>
  </UHeader>
</template>

<style scoped lang="scss">
@use './m-app-header';
</style>
