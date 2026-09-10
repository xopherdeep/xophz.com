<script setup lang="ts">
import { useAppHeaderController } from './m-app-header.controller'

const { navItems, closeMenu } = useAppHeaderController()
</script>

<template>
  <UHeader
    title="xophz"
    to="/"
    mode="slideover"
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
      <UNavigationMenu
        :items="navItems"
        variant="pill"
        color="primary"
        class="hidden md:flex"
      />
    </template>

    <template #right>
      <div class="flex items-center gap-1.5">
        <UButton
          to="/connect"
          color="primary"
          variant="soft"
          size="xs"
          icon="i-lucide-mail"
          class="hidden sm:inline-flex"
        >
          Connect
        </UButton>
        <UColorModeButton />
        <UButton
          to="https://github.com/xopherdeep"
          target="_blank"
          icon="i-lucide-github"
          color="neutral"
          variant="ghost"
          size="sm"
          aria-label="GitHub Profile"
        />
      </div>
    </template>

    <template #body>
      <UNavigationMenu
        :items="navItems"
        orientation="vertical"
        variant="pill"
        color="primary"
        class="w-full"
        @click="closeMenu"
      />
      <div class="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <UButton
          to="/connect"
          color="primary"
          variant="solid"
          size="sm"
          icon="i-lucide-mail"
          block
          @click="closeMenu"
        >
          Connect
        </UButton>
      </div>
    </template>
  </UHeader>
</template>

<style scoped lang="scss">
@use './m-app-header';
</style>
