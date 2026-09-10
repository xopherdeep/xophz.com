import { ref, shallowRef, computed, watch, unref, isRef } from 'vue'
import { useRouter } from 'vue-router'
import { compassCatalog } from '~/data/compassCatalog'
import { sparksCatalog } from '~/data/sparksCatalog'
import { useProfileData } from '~/composables/useProfileData'
import type {
  CommandCategory,
  CommandCategoryTab,
  CommandItem,
  ContextualSearchRegistration
} from '~/components/molecules/m-command-bar/types'

// Singleton reactive state across site
const isOpen = ref(false)
const searchQuery = ref('')
const selectedCategory = ref<CommandCategory>('all')
const selectedIndex = ref(0)
const activeContext = shallowRef<ContextualSearchRegistration | null>(null)
const dispatches = ref<CommandItem[]>([])
let isDispatchesLoaded = false

export function useCommandPalette() {
  const router = useRouter()
  const colorMode = useColorMode()
  const { projects } = useProfileData()

  // 1. Static Pages
  const staticPages = computed<CommandItem[]>(() => [
    {
      id: 'page-home',
      title: 'Home',
      subtitle: 'Xopher "XP" Pollard: Systems Architect, Polymath & Founder',
      category: 'pages',
      categoryLabel: 'Page',
      icon: 'i-lucide-home',
      iconColor: '#8b5cf6',
      route: '/',
      keywords: ['home', 'root', 'index', 'xp', 'profile']
    },
    {
      id: 'page-about',
      title: 'About XP',
      subtitle: 'Biography, executive milestones, philosophies, and specialties',
      category: 'pages',
      categoryLabel: 'Page',
      icon: 'i-lucide-user',
      iconColor: '#06b6d4',
      route: '/about',
      keywords: ['about', 'bio', 'story', 'history', 'philosophy', 'skills']
    },
    {
      id: 'page-resume',
      title: 'Executive Resume',
      subtitle: 'Principal Systems Synthesist, career timeline, and competencies',
      category: 'pages',
      categoryLabel: 'Page',
      icon: 'i-lucide-file-badge',
      iconColor: '#10b981',
      route: '/resume',
      keywords: ['resume', 'cv', 'experience', 'career', 'leadership', 'cto']
    },
    {
      id: 'page-projects',
      title: 'Opus: Ecosystem Catalog',
      subtitle: 'The Hall of the Gods platform portfolio, products, and architecture',
      category: 'pages',
      categoryLabel: 'Page',
      icon: 'i-lucide-briefcase',
      iconColor: '#f59e0b',
      route: '/projects',
      keywords: ['projects', 'opus', 'ecosystem', 'portfolio', 'architecture']
    },
    {
      id: 'page-compass',
      title: 'My Compass Suite',
      subtitle: '40+ sovereign WordPress extensions and modernization tooling',
      category: 'pages',
      categoryLabel: 'Page',
      icon: 'i-lucide-compass',
      logoUrl: '/icons/plugins/xophz-compass.svg',
      iconColor: '#62c9ff',
      route: '/my-compass',
      keywords: ['compass', 'plugins', 'wordpress', 'suite', 'tools', 'catalog']
    },
    {
      id: 'page-sparks',
      title: 'YouMeOS Sparks Suite',
      subtitle: '50+ spatial applications, tools, retro games, and PWAs',
      category: 'pages',
      categoryLabel: 'Page',
      icon: 'i-lucide-sparkles',
      logoUrl: '/icons/sparks/spark-u-spark-plugs.svg',
      iconColor: '#06b6d4',
      route: '/sparks',
      keywords: ['sparks', 'youmeos', 'apps', 'widgets', 'games', 'tools']
    },
    {
      id: 'page-posts',
      title: 'Writing & Devlogs',
      subtitle: 'Field notes, systems breakdowns, and sovereign digital philosophy',
      category: 'pages',
      categoryLabel: 'Page',
      icon: 'i-lucide-file-text',
      iconColor: '#a855f7',
      route: '/posts',
      keywords: ['posts', 'blog', 'writing', 'devlogs', 'articles', 'essays']
    },
    {
      id: 'page-connect',
      title: 'Connect with XP',
      subtitle: 'Direct communication line, inquiries, and advisory bookings',
      category: 'pages',
      categoryLabel: 'Page',
      icon: 'i-lucide-mail',
      iconColor: '#ec4899',
      route: '/connect',
      keywords: ['connect', 'contact', 'email', 'message', 'book', 'inquiry']
    }
  ])

  // 2. Compass Plugins Catalog
  const pluginItems = computed<CommandItem[]>(() =>
    compassCatalog.map((plugin) => ({
      id: `plugin-${plugin.key}`,
      title: plugin.name,
      subtitle: plugin.desc,
      category: 'compass',
      categoryLabel: 'Plugin',
      icon: 'i-lucide-box',
      logoUrl: plugin.logoUrl,
      iconColor: plugin.color || '#62c9ff',
      badge: plugin.category,
      route: `/my-compass?plugin=${plugin.key}`,
      keywords: [
        plugin.key,
        plugin.name,
        plugin.codename,
        plugin.category,
        plugin.marketEqv || '',
        'wordpress',
        'plugin'
      ]
    }))
  )

  // 3. YouMeOS Sparks Catalog
  const sparkItems = computed<CommandItem[]>(() =>
    sparksCatalog.map((spark) => ({
      id: `spark-${spark.key}`,
      title: spark.name,
      subtitle: spark.desc,
      category: 'sparks',
      categoryLabel: 'Spark',
      icon: 'i-lucide-sparkles',
      logoUrl: spark.logoUrl,
      iconColor: spark.color || '#06b6d4',
      badge: spark.category,
      route: `/sparks?spark=${spark.key}`,
      keywords: [
        spark.key,
        spark.name,
        spark.codename,
        spark.category,
        spark.tag || '',
        'spark',
        'youmeos',
        'widget'
      ]
    }))
  )

  // 4. Ecosystem Projects
  const projectItems = computed<CommandItem[]>(() =>
    projects.map((project) => {
      const isExt = project.url.startsWith('http')
      const isCompass = project.key === 'compass'
      const isSparks = project.key === 'youmeos'
      const logoUrl = isCompass ? '/icons/plugins/xophz-compass.svg' : isSparks ? '/icons/sparks/spark-u-spark-plugs.svg' : undefined
      return {
        id: `project-${project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        title: project.name,
        subtitle: project.desc,
        category: 'projects',
        categoryLabel: 'Opus',
        icon: isCompass ? 'i-lucide-compass' : isSparks ? 'i-lucide-sparkles' : 'i-lucide-boxes',
        logoUrl,
        iconColor: project.color || '#8b5cf6',
        badge: project.tag,
        isExternal: isExt,
        route: isExt ? undefined : project.url,
        action: isExt
          ? () => {
              if (typeof window !== 'undefined') window.open(project.url, '_blank')
            }
          : undefined,
        keywords: [project.name, project.tag, project.desc, 'project', 'opus']
      }
    })
  )

  // 5. System Actions
  const actionItems = computed<CommandItem[]>(() => [
    {
      id: 'action-toggle-theme',
      title: colorMode.value === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode',
      subtitle: 'Toggle interface color palette theme',
      category: 'actions',
      categoryLabel: 'Action',
      icon: colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon',
      iconColor: '#f59e0b',
      action: () => {
        colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
      },
      keywords: ['theme', 'dark', 'light', 'mode', 'color', 'toggle']
    },
    {
      id: 'action-copy-url',
      title: 'Copy Page Link',
      subtitle: 'Copy current browser URL to system clipboard',
      category: 'actions',
      categoryLabel: 'Action',
      icon: 'i-lucide-link',
      iconColor: '#06b6d4',
      action: () => {
        if (typeof window !== 'undefined' && navigator.clipboard) {
          navigator.clipboard.writeText(window.location.href)
        }
      },
      keywords: ['copy', 'url', 'link', 'share', 'clipboard']
    },
    {
      id: 'action-scroll-top',
      title: 'Scroll to Top',
      subtitle: 'Smoothly scroll view back to top of page',
      category: 'actions',
      categoryLabel: 'Action',
      icon: 'i-lucide-arrow-up',
      iconColor: '#10b981',
      action: () => {
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      },
      keywords: ['scroll', 'top', 'up', 'home']
    },
    {
      id: 'action-github',
      title: 'Open GitHub Profile',
      subtitle: 'Explore open source repositories on GitHub (@xopherdeep)',
      category: 'actions',
      categoryLabel: 'Action',
      icon: 'i-lucide-github',
      iconColor: '#8b5cf6',
      isExternal: true,
      action: () => {
        if (typeof window !== 'undefined') {
          window.open('https://github.com/xopherdeep', '_blank')
        }
      },
      keywords: ['github', 'git', 'repo', 'code', 'profile']
    }
  ])

  // 6. Contextual Items
  const contextualItems = computed<CommandItem[]>(() => {
    if (!activeContext.value || !activeContext.value.items) return []
    const items = unref(activeContext.value.items) || []
    const defaultLabel = activeContext.value.categoryLabel || 'On This Page'
    return items.map((item) => ({
      ...item,
      category: 'context' as const,
      categoryLabel: defaultLabel
    }))
  })

  // Load dispatches asynchronously
  const loadDispatches = async () => {
    if (isDispatchesLoaded || import.meta.server) return
    try {
      isDispatchesLoaded = true
      const posts = await queryCollection('posts').order('date', 'DESC').all()
      if (Array.isArray(posts)) {
        dispatches.value = posts.map((post: any) => ({
          id: `dispatch-${post.path}`,
          title: post.title,
          subtitle: post.summary || post.date,
          category: 'posts' as const,
          categoryLabel: 'Dispatch',
          icon: 'i-lucide-file-text',
          iconColor: '#a855f7',
          route: post.path,
          keywords: [post.title, post.summary || '', ...(post.tags || []), 'post', 'blog']
        }))
      }
    } catch {
      // Graceful fallback
    }
  }

  // Master Registry
  const allCommands = computed<CommandItem[]>(() => [
    ...contextualItems.value,
    ...staticPages.value,
    ...pluginItems.value,
    ...sparkItems.value,
    ...projectItems.value,
    ...dispatches.value,
    ...actionItems.value
  ])

  // Category Tabs
  const categoryTabs = computed<CommandCategoryTab[]>(() => {
    const tabs: CommandCategoryTab[] = [{ id: 'all', label: 'All', icon: 'i-lucide-layers' }]
    if (activeContext.value) {
      const label = activeContext.value.categoryLabel || 'This Page'
      const isCompass = label.toLowerCase().includes('compass')
      const isSpark = label.toLowerCase().includes('spark')
      const logoUrl = isCompass ? '/icons/plugins/xophz-compass.svg' : isSpark ? '/icons/sparks/spark-u-spark-plugs.svg' : undefined
      tabs.push({ id: 'context', label, icon: 'i-lucide-crosshair', logoUrl })
    }
    tabs.push(
      { id: 'pages', label: 'Pages', icon: 'i-lucide-layout-grid' },
      { id: 'compass', label: 'Plugins', icon: 'i-lucide-compass', logoUrl: '/icons/plugins/xophz-compass.svg' },
      { id: 'sparks', label: 'Sparks', icon: 'i-lucide-sparkles', logoUrl: '/icons/sparks/spark-u-spark-plugs.svg' },
      { id: 'projects', label: 'Opus', icon: 'i-lucide-boxes' },
      { id: 'posts', label: 'Dispatches', icon: 'i-lucide-file-text' },
      { id: 'actions', label: 'Actions', icon: 'i-lucide-terminal' }
    )
    return tabs
  })

  // Filtered Items
  const filteredCommands = computed<CommandItem[]>(() => {
    const rawQuery = searchQuery.value.trim().toLowerCase()
    const activeCat = selectedCategory.value
    let list = allCommands.value

    if (activeCat !== 'all') {
      list = list.filter((item) => item.category === activeCat)
    }

    if (!rawQuery) {
      // Prioritize contextual items when query is empty
      return list.slice(0, 40)
    }

    const tokens = rawQuery.split(/\s+/).filter(Boolean)
    return list
      .filter((item) => {
        const titleMatch = item.title.toLowerCase()
        const subtitleMatch = (item.subtitle || '').toLowerCase()
        const routeMatch = (item.route || '').toLowerCase()
        const badgeMatch = (item.badge || '').toLowerCase()
        const keywordsMatch = (item.keywords || []).join(' ').toLowerCase()
        const corpus = `${titleMatch} ${subtitleMatch} ${routeMatch} ${badgeMatch} ${keywordsMatch}`
        return tokens.every((token) => corpus.includes(token))
      })
      .slice(0, 50)
  })

  // Placeholder
  const isMac = computed(() => {
    if (typeof navigator === 'undefined') return false
    return /Mac|iPhone|iPod|iPad/i.test(navigator.platform || navigator.userAgent || '')
  })

  const shortcutLabel = computed(() => (isMac.value ? '⌘K' : 'Ctrl+K'))

  const currentPlaceholder = computed(() => {
    if (activeContext.value?.placeholder) {
      return `${activeContext.value.placeholder} (${shortcutLabel.value} or /)`
    }
    return `Search anything on xophz.com (${shortcutLabel.value} or /)`
  })

  // Two-way synchronization with activeContext
  watch(searchQuery, (newVal) => {
    selectedIndex.value = 0
    if (activeContext.value?.query && isRef(activeContext.value.query)) {
      if (activeContext.value.query.value !== newVal) {
        activeContext.value.query.value = newVal
      }
    }
  })

  // Actions
  const open = () => {
    isOpen.value = true
    selectedIndex.value = 0
    loadDispatches()
  }

  const close = () => {
    isOpen.value = false
    selectedIndex.value = 0
    if (!activeContext.value) {
      searchQuery.value = ''
    }
  }

  const toggle = () => {
    if (isOpen.value) close()
    else open()
  }

  const selectCategory = (category: CommandCategory) => {
    selectedCategory.value = category
    selectedIndex.value = 0
  }

  const selectNext = () => {
    if (filteredCommands.value.length === 0) return
    selectedIndex.value = (selectedIndex.value + 1) % filteredCommands.value.length
  }

  const selectPrevious = () => {
    if (filteredCommands.value.length === 0) return
    selectedIndex.value =
      (selectedIndex.value - 1 + filteredCommands.value.length) % filteredCommands.value.length
  }

  const executeCommand = (command: CommandItem) => {
    close()
    if (command.action) {
      command.action()
    } else if (command.route) {
      router.push(command.route)
    }
  }

  const executeActive = () => {
    const active = filteredCommands.value[selectedIndex.value]
    if (active) executeCommand(active)
  }

  const clearQuery = () => {
    searchQuery.value = ''
    if (activeContext.value?.query && isRef(activeContext.value.query)) {
      activeContext.value.query.value = ''
    }
  }

  const setContextualSearch = (registration: ContextualSearchRegistration) => {
    activeContext.value = registration
    const initialQuery = isRef(registration.query)
      ? registration.query.value
      : String(registration.query || '')
    if (initialQuery && !searchQuery.value) {
      searchQuery.value = initialQuery
    } else if (
      searchQuery.value &&
      isRef(registration.query) &&
      registration.query.value !== searchQuery.value
    ) {
      registration.query.value = searchQuery.value
    }
  }

  const clearContextualSearch = () => {
    activeContext.value = null
    searchQuery.value = ''
    selectedIndex.value = 0
    selectedCategory.value = 'all'
  }

  return {
    isOpen,
    searchQuery,
    selectedCategory,
    selectedIndex,
    categoryTabs,
    filteredCommands,
    shortcutLabel,
    currentPlaceholder,
    open,
    close,
    toggle,
    selectCategory,
    selectNext,
    selectPrevious,
    executeCommand,
    executeActive,
    clearQuery,
    setContextualSearch,
    clearContextualSearch,
    activeContext,
    loadDispatches
  }
}
