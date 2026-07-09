<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()
const isHome = computed(() => route.path === '/')

const menuOpen = ref(false)
const toggleMenu = () => { menuOpen.value = !menuOpen.value }
const closeMenu = () => { menuOpen.value = false }

const navItems = [
  { 
    name: 'Home', 
    to: '/#home', 
    isActive: () => isHome.value && (!route.hash || route.hash === '#home'),
    icon: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/>' 
  },
  { 
    name: 'About', 
    to: '/#about', 
    isActive: () => isHome.value && route.hash === '#about',
    icon: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>' 
  },
  { 
    name: 'Magnum Opus', 
    to: '/#projects', 
    isActive: () => isHome.value && route.hash === '#projects',
    icon: '<polygon points="12 2 22 12 12 22 2 12"/>' 
  },
  { 
    name: 'Posts', 
    to: '/posts', 
    isActive: () => route.path.startsWith('/posts'),
    icon: '<path d="M12 14 A4.5 4.5 0 1 1 8 9 A4.5 4.5 0 1 1 16 9 A4.5 4.5 0 1 1 12 14 Z"/><path d="M12 14v7"/><path d="M8 21h8"/>' 
  },
  { 
    name: 'Connect', 
    to: '/#connect', 
    isActive: () => isHome.value && route.hash === '#connect',
    icon: '<path d="M12 2 C12 2 4 9 4 14 A4.5 4.5 0 0 0 12 15 A4.5 4.5 0 0 0 20 14 C20 9 12 2 12 2 Z"/><path d="M12 15v6"/><path d="M8 21h8"/>' 
  }
]
</script>

<template>
  <div class="app-wrapper">
    <NuxtRouteAnnouncer />

    <button
      id="hamburger-btn"
      class="hamburger"
      :class="{ open: menuOpen }"
      aria-label="Toggle navigation"
      :aria-expanded="menuOpen"
      @click="toggleMenu"
    >
      <span class="bar" />
      <span class="bar" />
      <span class="bar" />
    </button>

    <header class="top-bar">
      <span class="top-handle">xophz.com</span>
      <span class="top-panel-title">{{ navItems.find(n => n.isActive())?.name ?? 'Home' }}</span>
    </header>

    <Transition name="overlay">
      <div
        v-if="menuOpen"
        class="drawer-overlay"
        @click="closeMenu"
      />
    </Transition>

    <Transition name="drawer">
      <nav
        v-if="menuOpen"
        class="nav-drawer"
        aria-label="Main navigation"
      >
        <div class="drawer-header">
          <div class="drawer-avatar">XP</div>
          <div class="drawer-identity">
            <p class="drawer-name">Xopher Pollard</p>
            <p class="drawer-role">Principal Systems Synthesist</p>
          </div>
        </div>
        <ul class="nav-list">
          <li
            v-for="item in navItems"
            :key="item.name"
          >
            <NuxtLink
              :to="item.to"
              class="nav-item"
              :class="{ active: item.isActive() }"
              @click="closeMenu"
            >
              <span class="nav-icon"><svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  v-html="item.icon"
                /></span>
              <span class="nav-label">{{ item.name }}</span>
              <span class="nav-arrow">›</span>
            </NuxtLink>
          </li>
        </ul>
        <div class="drawer-footer">
          <p class="drawer-copy">© {{ new Date().getFullYear() }} Xopher Pollard</p>
        </div>
      </nav>
    </Transition>

    <div class="page-viewport">
      <Transition name="page" mode="out-in">
        <NuxtPage />
      </Transition>
    </div>

    <!-- Global App Bar -->
    <nav
      class="global-bottom-nav"
      aria-label="Global navigation"
    >
      <div class="nav-container">
        <NuxtLink
          v-for="item in navItems"
          :key="item.name"
          :to="item.to"
          class="nav-btn"
          :class="{ active: item.isActive() }"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            v-html="item.icon"
          />
          <span>{{ item.name }}</span>
        </NuxtLink>
      </div>
    </nav>
  </div>
</template>

<style>

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  :root {
    --bg: #080810;
    --bg-card: rgba(255, 255, 255, 0.06);
    --bg-card-hover: rgba(255, 255, 255, 0.1);
    --border: rgba(255, 255, 255, 0.12);
    --border-glow: rgba(139, 92, 246, 0.4);
    --text-primary: #f0f0f8;
    --text-secondary: #8888a8;
    --text-muted: #555570;
    --accent: #8b5cf6;
    --accent-2: #06b6d4;
    --accent-3: #f59e0b;
    --gradient-hero: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 50%, #f59e0b 100%);
    --font-display: 'Space Grotesk', sans-serif;
    --font-body: 'Inter', sans-serif;
    --glass-bg: rgba(255, 255, 255, 0.05);
    --glass-border: rgba(255, 255, 255, 0.12);
    --glass-highlight: 0 0 0 1px rgba(255, 255, 255, 0.06) inset, 0 1px 0 0 rgba(255, 255, 255, 0.08) inset;
    --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    --glass-blur: blur(24px);
  }

  html {
    scroll-behavior: smooth;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    background: linear-gradient(135deg, #0c0618 0%, #0a0a1a 25%, #061218 50%, #0a0a1a 75%, #18100a 100%);
    background-attachment: fixed;
    color: var(--text-primary);
    font-family: var(--font-body);
    min-height: 100dvh;
    overflow-x: hidden;
  }

  ::selection {
    background: rgba(139, 92, 246, 0.35);
    color: var(--text-primary);
  }

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--accent);
    border-radius: 2px;
  }

  .app-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
    padding-bottom: 70px;
    /* Space for the bottom nav */
  }

  .page-viewport {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-x: hidden;
  }

  /* Page route transitions */
  .page-enter-active,
  .page-leave-active {
    transition: opacity 0.25s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .page-enter-from {
    opacity: 0;
    transform: translateY(12px);
  }

  .page-leave-to {
    opacity: 0;
    transform: translateY(-6px);
  }

  /* Global Bottom Nav */
  .global-bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    height: 70px;
    background: rgba(12, 12, 24, 0.55);
    backdrop-filter: blur(32px) saturate(1.6);
    -webkit-backdrop-filter: blur(32px) saturate(1.6);
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    display: flex;
    justify-content: center;
    box-shadow:
      0 -4px 24px rgba(0, 0, 0, 0.5),
      0 1px 0 0 rgba(255, 255, 255, 0.06) inset;
  }

  .nav-container {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    max-width: 600px;
    height: 100%;
    padding: 0 0.5rem;
  }

  .nav-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.35rem;
    color: var(--text-muted);
    text-decoration: none;
    flex: 1;
    height: 100%;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .nav-btn svg {
    width: 22px;
    height: 22px;
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), stroke-width 0.2s ease;
  }

  .nav-btn span {
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .nav-btn:hover {
    color: var(--text-secondary);
  }

  .nav-btn.active {
    color: var(--accent);
  }

  .nav-btn.active svg {
    transform: translateY(-2px);
    stroke-width: 2.5;
    filter: drop-shadow(0 2px 8px rgba(139, 92, 246, 0.4));
  }

  @media (min-width: 861px) {

    .global-bottom-nav {
      bottom: 1.5rem;
      left: 50%;
      transform: translateX(-50%);
      width: fit-content;
      border-radius: 999px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow:
        0 8px 32px rgba(0, 0, 0, 0.5),
        0 0 0 1px rgba(255, 255, 255, 0.06) inset,
        0 1px 0 0 rgba(255, 255, 255, 0.1) inset;
      height: 64px;
      padding: 0 1rem;
    }

    .nav-container {
      gap: 0.5rem;
    }

    .nav-btn {
      padding: 0 1.25rem;
      flex: 0 0 auto;
    }
  }

  /* Top Bar & Hamburger */
  .top-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 4rem;
    background: rgba(12, 12, 24, 0.45);
    backdrop-filter: blur(32px) saturate(1.6);
    -webkit-backdrop-filter: blur(32px) saturate(1.6);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow:
      0 4px 24px rgba(0, 0, 0, 0.3),
      0 -1px 0 0 rgba(255, 255, 255, 0.05) inset;
  }

  .top-handle {
    position: absolute;
    left: 4rem;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--accent);
    opacity: 0.7;
  }

  .top-panel-title {
    font-family: var(--font-display);
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--text-primary);
    letter-spacing: -0.01em;
  }

  .hamburger {
    position: fixed;
    top: 0.5rem;
    left: 0.5rem;
    z-index: 100;
    width: 40px;
    height: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 0;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.25s ease;
    backdrop-filter: blur(20px) saturate(1.4);
    -webkit-backdrop-filter: blur(20px) saturate(1.4);
    box-shadow:
      var(--glass-highlight),
      0 4px 16px rgba(0, 0, 0, 0.3);
  }

  .hamburger:hover {
    background: rgba(139, 92, 246, 0.15);
    border-color: rgba(139, 92, 246, 0.4);
  }

  .bar {
    display: block;
    width: 18px;
    height: 2px;
    background: var(--text-primary);
    border-radius: 2px;
    transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
    transform-origin: center;
  }

  .hamburger.open .bar:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }

  .hamburger.open .bar:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
  }

  .hamburger.open .bar:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  /* Nav Drawer */
  .drawer-overlay {
    position: fixed;
    inset: 0;
    z-index: 60;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }

  .nav-drawer {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 70;
    width: min(320px, 88vw);
    display: flex;
    flex-direction: column;
    background: rgba(12, 12, 24, 0.6);
    backdrop-filter: blur(40px) saturate(1.8);
    -webkit-backdrop-filter: blur(40px) saturate(1.8);
    border-right: 1px solid rgba(139, 92, 246, 0.25);
    box-shadow:
      4px 0 40px rgba(0, 0, 0, 0.6),
      0 0 0 1px rgba(255, 255, 255, 0.06) inset,
      0 1px 0 0 rgba(255, 255, 255, 0.08) inset;
  }

  .drawer-header {
    padding: 4.5rem 1.5rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .drawer-avatar {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    flex-shrink: 0;
    background: linear-gradient(135deg, #8b5cf6, #06b6d4);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 700;
    color: #fff;
    box-shadow: 0 0 20px rgba(139, 92, 246, 0.4);
  }

  .drawer-name {
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.2rem;
  }

  .drawer-role {
    font-size: 0.7rem;
    color: var(--text-muted);
  }

  .nav-list {
    flex: 1;
    padding: 1rem 0.75rem;
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    overflow-y: auto;
  }

  .nav-item {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.875rem;
    padding: 0.85rem 1rem;
    border-radius: 12px;
    background: transparent;
    border: 1px solid transparent;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    text-align: left;
    text-decoration: none;
  }

  .nav-item:hover {
    background: rgba(139, 92, 246, 0.08);
    border-color: rgba(139, 92, 246, 0.15);
    color: var(--text-primary);
  }

  .nav-item.active {
    background: rgba(139, 92, 246, 0.15);
    border-color: rgba(139, 92, 246, 0.35);
    color: var(--text-primary);
    box-shadow: 0 0 16px rgba(139, 92, 246, 0.1) inset;
  }

  .nav-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-icon svg {
    width: 100%;
    height: 100%;
  }

  .nav-label {
    flex: 1;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .nav-arrow {
    font-size: 1.1rem;
    color: var(--text-muted);
    transition: transform 0.2s ease;
  }

  .nav-item:hover .nav-arrow,
  .nav-item.active .nav-arrow {
    transform: translateX(2px);
    color: var(--accent);
  }

  .drawer-footer {
    padding: 1rem 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  .drawer-copy {
    font-size: 0.7rem;
    color: var(--text-muted);
  }

  /* Transitions */
  .overlay-enter-active,
  .overlay-leave-active {
    transition: opacity 0.3s ease;
  }

  .overlay-enter-from,
  .overlay-leave-to {
    opacity: 0;
  }

  .drawer-enter-active,
  .drawer-leave-active {
    transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .drawer-enter-from,
  .drawer-leave-to {
    transform: translateX(-100%);
  }
</style>
