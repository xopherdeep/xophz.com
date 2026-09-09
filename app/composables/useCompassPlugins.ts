import { compassCatalog } from '../data/compassCatalog'

export type CompassCategory = 'Command Deck' | 'True North' | 'Trajectory' | 'Castle Walls' | 'Wizard\'s Tower'

export interface CompassPlugin {
  key: string
  name: string
  codename: string
  category: CompassCategory
  group?: string
  desc: string
  tag: string
  color: string
  gradient: string
  logoUrl: string
  iconName: string
  repoUrl: string
  githubRepo: string
  price: string
  priceNumber: number
  marketEqv?: string
  isCore?: boolean
  version?: string
}

const STORAGE_KEY = 'xophz_purchased_plugins'

export const useCompassPlugins = () => {
  const plugins = ref<CompassPlugin[]>([...compassCatalog])

  const categories = computed<string[]>(() => [
    'All',
    'Command Deck',
    'True North',
    'Trajectory',
    'Castle Walls',
    'Wizard\'s Tower'
  ])

  const purchasedPluginKeys = ref<string[]>([])

  const loadPurchasedPlugins = () => {
    if (import.meta.server) return
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        purchasedPluginKeys.value = JSON.parse(raw)
      }
    } catch {
      purchasedPluginKeys.value = []
    }
  }

  const markAsPurchased = (slugOrKey: string): CompassPlugin | undefined => {
    if (import.meta.server) return undefined
    const matched = plugins.value.find(
      p => p.key === slugOrKey || p.codename === slugOrKey || p.githubRepo === slugOrKey
    )
    const keyToStore = matched ? matched.key : slugOrKey

    if (!purchasedPluginKeys.value.includes(keyToStore)) {
      purchasedPluginKeys.value = [...purchasedPluginKeys.value, keyToStore]
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(purchasedPluginKeys.value))
      } catch {
        // Ignore quota limits
      }
    }
    return matched
  }

  const isPurchased = (plugin: CompassPlugin): boolean => {
    return (
      purchasedPluginKeys.value.includes(plugin.key) ||
      purchasedPluginKeys.value.includes(plugin.codename) ||
      purchasedPluginKeys.value.includes(plugin.githubRepo)
    )
  }

  return {
    plugins,
    categories,
    purchasedPluginKeys,
    loadPurchasedPlugins,
    markAsPurchased,
    isPurchased
  }
}
