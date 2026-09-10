import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import type { AppHeaderItem } from './types'

export function useAppHeaderController() {
  // 1. Composables & Stores
  const route = useRoute()

  // 2. Reactive Primitives
  const isOpen = ref(false)

  // 3. Computed State & 2-Stage Booleans
  const navItems = computed<AppHeaderItem[]>(() => [
    { label: 'Home', to: '/', icon: 'i-lucide-home' },
    { label: 'About', to: '/about', icon: 'i-lucide-user' },
    { label: 'Resume', to: '/resume', icon: 'i-lucide-file-badge' },
    { label: 'Opus', to: '/projects', icon: 'i-lucide-briefcase' },
    { label: 'Compass', to: '/my-compass', icon: 'i-lucide-compass' },
    { label: 'Sparks', to: '/sparks', icon: 'i-lucide-sparkles' },
    { label: 'Blog', to: '/posts', icon: 'i-lucide-file-text' }
  ])

  const hasActiveRoute = computed(() => Boolean(route.path))
  const canDisplayNav = computed(() => hasActiveRoute.value && navItems.value.length > 0)

  // 4. Helper Methods & Actions
  const toggleMenu = () => {
    isOpen.value = !isOpen.value
  }

  const closeMenu = () => {
    if (!isOpen.value) return
    isOpen.value = false
  }

  return {
    navItems,
    isOpen,
    canDisplayNav,
    toggleMenu,
    closeMenu
  }
}
