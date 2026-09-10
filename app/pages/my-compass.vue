<script setup lang="ts">
import type { CompassPlugin } from '~/composables/useCompassPlugins'
import CompassPluginModal from '~/components/CompassPluginModal.vue'

const route = useRoute()
const router = useRouter()

const {
  plugins,
  categories,
  loadPurchasedPlugins,
  syncLiveCatalog,
  markAsPurchased,
  isPurchased
} = useCompassPlugins()

const { fetchLatestRelease, triggerDownload } = useGitHubReleases()

useSeoMeta({
  title: 'My Compass Suite · Xophz & My Compass Consulting',
  description: 'The Xophz-COMPASS plugin architecture & software suite. 40+ sovereign WordPress extensions, enterprise systems architecture, and legacy modernization.',
})

const highlightedPluginKey = ref<string | null>(null)
const purchasedSuccessMessage = ref<string | null>(null)
const selectedPlugin = ref<CompassPlugin | null>(null)
const isModalOpen = ref(false)
const downloadingKeys = ref<Record<string, boolean>>({})

const openModal = (plugin: CompassPlugin) => {
  selectedPlugin.value = plugin
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedPlugin.value = null
}

const onDownloadPlugin = async (plugin: CompassPlugin) => {
  downloadingKeys.value[plugin.key] = true
  try {
    const release = await fetchLatestRelease(plugin.githubRepo, plugin.version)
    triggerDownload(release.zipUrl, release.zipName)
  } finally {
    downloadingKeys.value[plugin.key] = false
  }
}

const checkPluginDeepLink = () => {
  const pluginQuery = route.query.plugin as string | undefined
  if (pluginQuery) {
    const found = plugins.value.find((p) => p.key === pluginQuery || p.codename === pluginQuery)
    if (found) {
      openModal(found)
      nextTick(() => {
        const cardElement = document.getElementById(`plugin-${found.key}`)
        if (cardElement) {
          cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      })
    }
  }
}

watch(() => route.query.plugin, () => {
  checkPluginDeepLink()
})

onMounted(async () => {
  loadPurchasedPlugins()
  syncLiveCatalog()
  checkPluginDeepLink()

  const purchasedQuery = route.query.purchased as string | undefined
  if (purchasedQuery) {
    const matched = markAsPurchased(purchasedQuery)
    if (matched) {
      highlightedPluginKey.value = matched.key
      purchasedSuccessMessage.value = `Thank you for purchasing ${matched.name}! Your plugin package is downloading automatically.`

      try {
        const release = await fetchLatestRelease(matched.githubRepo, matched.version)
        triggerDownload(release.zipUrl, release.zipName)
      } catch {
        // Handled inside composable
      }

      nextTick(() => {
        const cardElement = document.getElementById(`plugin-${matched.key}`)
        if (cardElement) {
          cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      })

      router.replace({ query: { ...route.query, purchased: undefined } })
    }
  }
})
</script>

<template>
  <main class="min-h-dvh flex flex-col items-center relative py-10">
    <UContainer class="max-w-[1100px] w-full flex flex-col gap-10">
      <MCompassHero
        :purchased-success-message="purchasedSuccessMessage"
        @dismiss="purchasedSuccessMessage = null"
      />

      <MCompassServices />

      <MCompassCatalog
        :plugins="plugins"
        :categories="categories"
        :highlighted-plugin-key="highlightedPluginKey"
        :downloading-keys="downloadingKeys"
        @open-modal="openModal"
        @download="onDownloadPlugin"
      />

      <!-- Plugin Details Modal -->
      <CompassPluginModal
        :plugin="selectedPlugin"
        :is-open="isModalOpen"
        @close="closeModal"
      />
    </UContainer>
  </main>
</template>
