import { sparksCatalog } from '../data/sparksCatalog'

export type SparkCategory =
  | 'Gateways'
  | 'Gadgets'
  | 'Goodies'
  | 'Games'
  | 'System'
  | 'VIP'
  | 'WebSparks'

export interface Spark {
  key: string
  name: string
  codename: string
  category: SparkCategory
  group?: string
  desc: string
  tag: string
  color: string
  gradient: string
  logoUrl: string
  iconName: string
  pwaUrl: string
  webtopUrl: string
  engine?: string
  version?: string
  isFeatured?: boolean
}

// Backward-compatible alias
export type SparkItem = Spark

export const useSparks = () => {
  const sparks = ref<Spark[]>([...sparksCatalog])

  const categories = computed<string[]>(() => [
    'All',
    'Gateways',
    'Gadgets',
    'Goodies',
    'Games',
    'System',
    'VIP',
    'WebSparks'
  ])

  const isLoadingLive = ref(false)

  const syncLiveCatalog = async () => {
    if (import.meta.server) return
    try {
      isLoadingLive.value = true
      const config = useRuntimeConfig()
      const apiRoot = (config?.public?.youmeosApiUrl as string) || 'https://www.youmeos.com/wp-json/xophz/v1'
      const cleanApiRoot = apiRoot.replace(/\/+$/, '')
      const response = await fetch(`${cleanApiRoot}/sparks`)
      if (!response.ok) return

      const payload = await response.json()
      if (!payload || typeof payload !== 'object') return

      const liveList = Array.isArray(payload) ? payload : Object.values(payload)
      if (!liveList.length) return

      const liveMap = new Map<string, any>()
      for (const item of liveList) {
        if (item && typeof item === 'object' && item.id) {
          liveMap.set(item.id, item)
          liveMap.set(item.id.replace(/^u-/, ''), item)
        }
      }

      sparks.value = sparks.value.map((spark) => {
        const live = liveMap.get(spark.key) || liveMap.get(spark.codename)
        if (!live) return spark
        const liveColor = live.brand_color || live.brandColor || live.color || spark.color
        return {
          ...spark,
          name: live.title || spark.name,
          desc: live.description || spark.desc,
          color: liveColor,
          gradient: `linear-gradient(135deg, ${liveColor} 0%, #070a13 100%)`,
          version: live.version || spark.version,
          pwaUrl: live.pwa_url
            ? (live.pwa_url.startsWith('http') ? live.pwa_url : `https://www.youmeos.com${live.pwa_url}`)
            : spark.pwaUrl,
        }
      })
    } catch {
      // Graceful fallback to static catalog on connection failure
    } finally {
      isLoadingLive.value = false
    }
  }

  return {
    sparks,
    categories,
    isLoadingLive,
    syncLiveCatalog,
  }
}
