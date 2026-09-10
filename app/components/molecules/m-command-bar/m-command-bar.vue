<script setup lang="ts">
import { ref, watch } from 'vue'
import { useCommandBarController } from './m-command-bar.controller'
import MCommandDropdown from './m-command-dropdown.vue'

const {
  inputRef,
  containerRef,
  palette,
  hasQuery,
  isDropdownOpen,
  placeholderText,
  leadLogoUrl,
  handleFocus,
  handleClear,
  handleKeydown
} = useCommandBarController()

const failedLeadLogo = ref(false)
watch(leadLogoUrl, () => { failedLeadLogo.value = false })
</script>

<template>
  <div ref="containerRef" class="m-command-bar relative w-full">
    <!-- Input Capsule -->
    <div
      class="m-command-bar__input-wrapper"
      :class="{ 'm-command-bar__input-wrapper--focused': isDropdownOpen }"
    >
      <div class="absolute left-4 w-5 h-5 flex items-center justify-center pointer-events-none">
        <img
          v-if="leadLogoUrl && !failedLeadLogo"
          :src="leadLogoUrl"
          alt="Brand"
          class="w-4 h-4 object-contain"
          @error="failedLeadLogo = true"
        >
        <UIcon
          v-else
          name="i-lucide-search"
          class="w-5 h-5 text-zinc-400 dark:text-zinc-500 transition-colors"
          :class="{ 'text-violet-500 dark:text-cyan-400': isDropdownOpen }"
        />
      </div>

      <input
        ref="inputRef"
        v-model="palette.searchQuery.value"
        type="text"
        :placeholder="placeholderText"
        class="m-command-bar__input font-medium"
        autocomplete="off"
        spellcheck="false"
        aria-label="Search documentation, projects, and commands"
        @focus="handleFocus"
        @click="handleFocus"
        @keydown="handleKeydown"
      >

      <!-- Clear Button or Shortcut Badges -->
      <div class="absolute right-3.5 flex items-center gap-1.5">
        <button
          v-if="hasQuery"
          type="button"
          class="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
          aria-label="Clear query"
          @click="handleClear"
        >
          <UIcon name="i-lucide-x" class="w-4 h-4" />
        </button>
        <div v-else class="hidden sm:flex items-center gap-1 opacity-75">
          <UKbd size="sm">{{ palette.shortcutLabel.value }}</UKbd>
          <span class="text-xs text-zinc-600 dark:text-zinc-400">or</span>
          <UKbd size="sm">/</UKbd>
        </div>
      </div>
    </div>

    <!-- Attached Floating Results Dropdown (Opens Upward) -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-3 scale-98"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-3 scale-98"
    >
      <div v-if="isDropdownOpen" class="m-command-bar__dropdown-anchor">
        <MCommandDropdown />
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
@use './m-command-bar';
</style>
