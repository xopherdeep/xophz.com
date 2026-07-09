<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, resolveComponent, onMounted } from 'vue'

const route = useRoute()
const router = useRouter()
const isHome = computed(() => route.path === '/')

const menuOpen = ref(false)
const toggleMenu = () => { menuOpen.value = !menuOpen.value }
const closeMenu = () => { menuOpen.value = false }

const isLoaded = ref(false)
onMounted(() => {
  // Give a small delay to ensure layout and v-motion are settled
  setTimeout(() => {
    isLoaded.value = true
  }, 150)
})

const navItems = [
  { 
    name: 'Home', 
    to: '/#home', 
    isActive: () => isHome.value && (!route.hash || route.hash === '#home'),
    icon: resolveComponent('LucideHome')
  },
  { 
    name: 'About', 
    to: '/#about', 
    isActive: () => isHome.value && route.hash === '#about',
    icon: resolveComponent('LucideUser')
  },
  { 
    name: 'Magnum Opus', 
    to: '/#projects', 
    isActive: () => isHome.value && route.hash === '#projects',
    icon: resolveComponent('LucideBriefcase')
  },
  { 
    name: 'Posts', 
    to: '/posts', 
    isActive: () => route.path.startsWith('/posts'),
    icon: resolveComponent('LucideFileText')
  },
  { 
    name: 'Connect', 
    to: '/#connect', 
    isActive: () => isHome.value && route.hash === '#connect',
    icon: resolveComponent('LucideMail')
  }
]
</script>

<template>
  <div class="flex flex-col min-h-dvh pb-[70px]">
    <!-- Global Page Loader -->
    <Transition
      leave-active-class="transition-opacity duration-700 ease-in-out"
      leave-to-class="opacity-0"
    >
      <div
        v-if="!isLoaded"
        class="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0c0618]"
      >
        <div class="w-12 h-12 border-[3px] border-white/10 border-t-[#8b5cf6] rounded-full animate-spin shadow-[0_0_15px_rgba(139,92,246,0.3)]"></div>
      </div>
    </Transition>

    <NuxtRouteAnnouncer />

    <button
      id="hamburger-btn"
      class="fixed top-2 left-2 z-[100] w-10 h-10 flex flex-col items-center justify-center gap-[5px] bg-white/10 border border-white/15 rounded-xl cursor-pointer transition-all duration-300 backdrop-blur-[20px] shadow-glass-highlight hover:bg-accent/15 hover:border-accent/40"
      aria-label="Toggle navigation"
      :aria-expanded="menuOpen"
      @click="toggleMenu"
    >
      <span class="block w-[18px] h-[2px] bg-text-primary rounded-[2px] transition-all duration-300 origin-center" :class="{ 'translate-y-[7px] rotate-45': menuOpen }" />
      <span class="block w-[18px] h-[2px] bg-text-primary rounded-[2px] transition-all duration-300 origin-center" :class="{ 'opacity-0 scale-x-0': menuOpen }" />
      <span class="block w-[18px] h-[2px] bg-text-primary rounded-[2px] transition-all duration-300 origin-center" :class="{ '-translate-y-[7px] -rotate-45': menuOpen }" />
    </button>

    <header class="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-center px-16 bg-[#0c0c18]/45 backdrop-blur-[32px] border-b border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.3),inset_0_-1px_0_0_rgba(255,255,255,0.05)]">
      <span class="absolute left-16 text-base font-bold tracking-[0.18em] uppercase text-accent opacity-70">xophz.com</span>
      <span class="font-display text-sm font-semibold text-text-primary tracking-[-0.01em]">{{ navItems.find(n => n.isActive())?.name ?? 'Home' }}</span>
    </header>

    <Transition
      enter-active-class="transition-opacity duration-300 ease-in-out"
      enter-from-class="opacity-0"
      leave-active-class="transition-opacity duration-300 ease-in-out"
      leave-to-class="opacity-0"
    >
      <div
        v-if="menuOpen"
        class="fixed inset-0 z-[60] bg-black/55 backdrop-blur-[4px]"
        @click="closeMenu"
      />
    </Transition>

    <Transition
      enter-active-class="transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
      enter-from-class="-translate-x-full"
      leave-active-class="transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]"
      leave-to-class="-translate-x-full"
    >
      <nav
        v-if="menuOpen"
        class="fixed top-0 left-0 bottom-0 z-[70] w-[min(320px,88vw)] flex flex-col bg-[#0c0c18]/60 backdrop-blur-[40px] border-r border-accent/25 shadow-[4px_0_40px_rgba(0,0,0,0.6),inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_0_rgba(255,255,255,0.08)]"
        aria-label="Main navigation"
      >
        <div class="px-6 pt-[4.5rem] pb-6 flex items-center gap-4 border-b border-white/5">
          <div class="w-[52px] h-[52px] rounded-full shrink-0 bg-gradient-to-br from-accent to-accent-2 flex items-center justify-center font-display text-base font-bold text-white shadow-[0_0_20px_rgba(139,92,246,0.4)]">XP</div>
          <div>
            <p class="font-display text-base font-bold text-text-primary mb-1">Xopher Pollard</p>
            <p class="text-[0.7rem] text-text-muted">Principal Systems Synthesist</p>
          </div>
        </div>
        <ul class="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          <li v-for="item in navItems" :key="item.name">
            <NuxtLink
              :to="item.to"
              class="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl bg-transparent border border-transparent text-text-secondary cursor-pointer transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] text-left no-underline hover:bg-accent/10 hover:border-accent/15 hover:text-text-primary group"
              :class="item.isActive() ? '!bg-accent/15 !border-accent/35 !text-text-primary shadow-[inset_0_0_16px_rgba(139,92,246,0.1)]' : ''"
              @click="closeMenu"
            >
              <span class="w-5 h-5 shrink-0 flex items-center justify-center">
                <component :is="item.icon" class="w-full h-full" />
              </span>
              <span class="flex-1 text-[0.9rem] font-medium">{{ item.name }}</span>
              <span class="text-[1.1rem] text-text-muted transition-transform duration-200 group-hover:translate-x-[2px] group-hover:text-accent" :class="{ 'translate-x-[2px] text-accent': item.isActive() }">›</span>
            </NuxtLink>
          </li>
        </ul>
        <div class="px-6 py-4 border-t border-white/5">
          <p class="text-[0.7rem] text-text-muted">© {{ new Date().getFullYear() }} Xopher Pollard</p>
        </div>
      </nav>
    </Transition>

    <div class="flex-1 flex flex-col w-full overflow-x-hidden">
        <NuxtPage :transition="{
          name: 'page',
          mode: 'out-in',
          enterActiveClass: 'transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
          enterFromClass: 'opacity-0 translate-y-3',
          leaveActiveClass: 'transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
          leaveToClass: 'opacity-0 -translate-y-1.5'
        }" />
    </div>

    <!-- Global App Bar -->
    <nav
      class="fixed bottom-0 left-0 right-0 z-[1000] h-[70px] bg-[#0c0c18]/55 backdrop-blur-[32px] border-t border-white/15 flex justify-center shadow-[0_-4px_24px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.06)] md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:w-fit md:rounded-full md:border md:border-white/15 md:shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_0_rgba(255,255,255,0.1)] md:h-16 md:px-4"
      aria-label="Global navigation"
    >
      <div class="flex items-center justify-around w-full max-w-[600px] h-full px-2 md:gap-2">
        <NuxtLink
          v-for="item in navItems"
          :key="item.name"
          :to="item.to"
          class="flex flex-col items-center justify-center gap-1.5 text-text-muted no-underline flex-1 h-full transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-text-secondary md:px-5 md:flex-none"
          :class="{ 'text-accent': item.isActive() }"
        >
          <component 
            :is="item.icon" 
            class="w-[22px] h-[22px] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]" 
            :class="{ '-translate-y-0.5 stroke-[2.5px] drop-shadow-[0_2px_8px_rgba(139,92,246,0.4)]': item.isActive() }" 
          />
          <span class="text-[0.65rem] font-semibold tracking-[0.05em] uppercase">{{ item.name }}</span>
        </NuxtLink>
      </div>
    </nav>
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background: linear-gradient(135deg, #0c0618 0%, #0a0a1a 25%, #061218 50%, #0a0a1a 75%, #18100a 100%);
  background-attachment: fixed;
  color: #f0f0f8;
  font-family: 'Inter', sans-serif;
  min-height: 100dvh;
  overflow-x: hidden;
}

::selection {
  background: rgba(139, 92, 246, 0.35);
  color: #f0f0f8;
}

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #8b5cf6;
  border-radius: 2px;
}
</style>
