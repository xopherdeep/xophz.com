<script setup lang="ts">
import {
  X as LucideX,
  Download as LucideDownload,
  ShoppingBag as LucideShoppingBag,
  Code as LucideCode,
  Copy as LucideCopy,
  Check as LucideCheck,
  ShieldCheck as LucideShieldCheck,
  Compass as LucideCompass,
  Sparkles as LucideSparkles,
  Flame as LucideFlame,
  BookOpen as LucideBookOpen,
  Target as LucideTarget,
  Magnet as LucideMagnet,
  Wand2 as LucideWand2,
  Bug as LucideBug,
  Shield as LucideShield,
  Link as LucideLink,
  RefreshCw as LucideRefreshCw,
  Key as LucideKey,
  Layers as LucideLayers,
  Building2 as LucideBuilding2,
  Activity as LucideActivity,
  Flag as LucideFlag,
  Gauge as LucideGauge,
  Moon as LucideMoon,
  CheckCircle2 as LucideCheckCircle2
} from '@lucide/vue'
import { getCompassCheckoutUrl, type CompassPlugin } from '../composables/useCompassPlugins'
import type { GitHubReleaseInfo } from '../composables/useGitHubReleases'

interface Props {
  plugin: CompassPlugin | null
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'close'): void
}>()

const { fetchLatestRelease, triggerDownload } = useGitHubReleases()
const requestURL = useRequestURL()
const route = useRoute()

const releaseInfo = ref<GitHubReleaseInfo | null>(null)
const isLoadingRelease = ref(false)
const isDownloading = ref(false)
const isCopied = ref(false)
const logoLoadFailed = ref(false)

const iconMap: Record<string, any> = {
  compass: LucideCompass, sparkles: LucideSparkles, flame: LucideFlame,
  book: LucideBookOpen, target: LucideTarget, magnet: LucideMagnet,
  wand: LucideWand2, bug: LucideBug, shield: LucideShield,
  link: LucideLink, refresh: LucideRefreshCw, key: LucideKey,
  layers: LucideLayers, castle: LucideBuilding2, waves: LucideActivity,
  flag: LucideFlag, bag: LucideShoppingBag, gauge: LucideGauge, moon: LucideMoon,
}

const resolveIcon = (iconName?: string) => iconMap[iconName || ''] || LucideCompass

const loadReleaseData = async (targetPlugin: CompassPlugin) => {
  isLoadingRelease.value = true
  releaseInfo.value = null
  logoLoadFailed.value = false
  isCopied.value = false

  try {
    const data = await fetchLatestRelease(targetPlugin.githubRepo, targetPlugin.version)
    releaseInfo.value = data
  } finally {
    isLoadingRelease.value = false
  }
}

watch(
  () => props.plugin,
  (newPlugin) => {
    if (newPlugin && props.isOpen) loadReleaseData(newPlugin)
  },
  { immediate: true }
)

watch(
  () => props.isOpen,
  (openState) => {
    if (openState && props.plugin) loadReleaseData(props.plugin)
  }
)

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && props.isOpen) emit('close')
}

useEventListener('keydown', handleKeydown)

const checkoutUrl = computed(() => {
  if (!props.plugin) return '#'
  return getCompassCheckoutUrl(props.plugin, requestURL.origin, route.path)
})

const formattedPrice = computed(() => {
  if (!props.plugin?.price) return ''
  return props.plugin.price.startsWith('$') ? props.plugin.price : `$${props.plugin.price}`
})

const canCopyChecksum = computed(() => Boolean(releaseInfo.value?.sha256))

const checksumCopyLabel = computed(() => {
  if (isCopied.value) return 'Copied Checksum'
  if (isLoadingRelease.value) return 'Fetching...'
  if (canCopyChecksum.value) return 'Copy Checksum'
  return 'Checksum Unavailable'
})

const directZipUrl = computed(() => {
  if (releaseInfo.value?.zipUrl) return releaseInfo.value.zipUrl
  if (!props.plugin) return '#'
  const repo = props.plugin.githubRepo
  const tag = props.plugin.version || 'v26.9.9'
  return `https://github.com/HalloftheGods/${repo}/archive/refs/tags/${tag}.zip`
})

const onDownloadClick = async () => {
  if (!props.plugin) return
  isDownloading.value = true
  try {
    const currentRelease = releaseInfo.value || await fetchLatestRelease(props.plugin.githubRepo, props.plugin.version)
    triggerDownload(currentRelease.zipUrl, currentRelease.zipName)
  } finally {
    isDownloading.value = false
  }
}

const copySha256 = async () => {
  const hash = releaseInfo.value?.sha256
  if (!hash || import.meta.server) return
  try {
    await navigator.clipboard.writeText(hash)
    isCopied.value = true
  } catch { /* clipboard API blocked */ }
}

const handleBackdropClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-250 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen && plugin"
        class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/70 dark:bg-black/80 backdrop-blur-xl overflow-y-auto"
        role="dialog"
        aria-modal="true"
        :aria-label="plugin.name"
        @click="handleBackdropClick"
      >
        <div
          class="relative w-full max-w-2xl my-auto rounded-3xl bg-white dark:bg-zinc-900/95 border border-zinc-200 dark:border-white/15 p-6 sm:p-8 shadow-glass-lg overflow-hidden backdrop-blur-2xl transition-all"
          :style="{ '--plug-color': plugin.color }"
        >
          <!-- Ambient Halo -->
          <div class="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-20 dark:opacity-40" :style="{ backgroundColor: plugin.color }" />
          <div class="absolute -bottom-24 -left-24 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-10 dark:opacity-25" :style="{ backgroundColor: plugin.color }" />

          <!-- Close Button -->
          <button
            type="button"
            class="absolute top-5 right-5 w-9 h-9 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-white/10 transition-all flex items-center justify-center cursor-pointer z-20"
            aria-label="Close modal"
            @click="emit('close')"
          >
            <LucideX class="w-4 h-4" />
          </button>

          <!-- Header -->
          <div class="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-5 border-b border-zinc-200 dark:border-white/10">
            <!-- Plugin Artwork -->
            <div class="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
              <img
                v-if="!logoLoadFailed"
                :src="plugin.logoUrl"
                :alt="plugin.name"
                class="w-full h-full object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_8px_20px_rgba(0,0,0,0.6)]"
                @error="logoLoadFailed = true"
              />
              <div
                v-else
                class="w-full h-full rounded-2xl flex items-center justify-center p-3 shadow-xl"
                :style="{ background: plugin.gradient }"
              >
                <component :is="resolveIcon(plugin.iconName)" class="w-12 h-12 text-white drop-shadow-md" />
              </div>
            </div>

            <!-- Info -->
            <div class="flex-1 min-w-0">
              <div class="flex flex-wrap items-center gap-2 mb-1.5">
                <UBadge color="primary" variant="subtle" size="xs">
                  {{ plugin.category }}
                </UBadge>
                <span v-if="plugin.group" class="px-2 py-0.5 rounded text-[0.62rem] font-mono font-semibold bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-500 dark:text-zinc-400">
                  {{ plugin.group }}
                </span>
                <span class="px-2.5 py-0.5 rounded text-[0.65rem] font-mono font-bold bg-emerald-50 dark:bg-white/5 border border-emerald-200 dark:border-white/10 text-emerald-600 dark:text-emerald-400">
                  {{ formattedPrice }}
                </span>
                <span v-if="plugin.tag" class="text-[0.65rem] font-medium text-zinc-400 dark:text-zinc-500">
                  {{ plugin.tag }}
                </span>
              </div>

              <h2 class="font-display text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-tight">
                {{ plugin.name }}
              </h2>
              <p class="font-mono text-xs text-zinc-400 dark:text-zinc-500 mt-0.5">
                {{ plugin.codename }}
              </p>
            </div>
          </div>

          <!-- Body -->
          <div class="relative z-10 py-5 flex flex-col gap-5">
            <!-- Description -->
            <div>
              <h3 class="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-zinc-400 dark:text-zinc-500 mb-1.5">Description</h3>
              <p class="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{{ plugin.desc }}</p>
            </div>

            <!-- Specs Grid -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.08]">
              <div>
                <span class="block text-[0.62rem] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Release</span>
                <span class="font-mono text-xs font-bold text-zinc-800 dark:text-zinc-200 mt-0.5 block">
                  {{ releaseInfo?.tagName || plugin.version || 'v26.9.9' }}
                </span>
              </div>
              <div>
                <span class="block text-[0.62rem] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Market Eqv</span>
                <span class="text-xs font-medium text-zinc-600 dark:text-zinc-400 mt-0.5 block truncate" :title="plugin.marketEqv || 'Custom Core'">
                  {{ plugin.marketEqv || 'Custom Core' }}
                </span>
              </div>
              <div>
                <span class="block text-[0.62rem] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Package Size</span>
                <span class="font-mono text-xs font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5 block">
                  {{ releaseInfo?.sizeFormatted || 'Standard Zip' }}
                </span>
              </div>
              <div>
                <span class="block text-[0.62rem] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Publisher</span>
                <span class="text-xs font-medium text-zinc-600 dark:text-zinc-400 mt-0.5 block">Hall of the Gods Inc.</span>
              </div>
            </div>

            <!-- SHA-256 -->
            <div class="p-3.5 rounded-2xl bg-zinc-50 dark:bg-black/30 border border-zinc-200/80 dark:border-white/10 flex items-center justify-between gap-3">
              <div class="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                <LucideShieldCheck class="w-4 h-4" />
                <span class="tracking-wide">SHA-256 Checksum</span>
              </div>
              <UButton
                :color="isCopied ? 'success' : 'neutral'"
                :variant="isCopied ? 'soft' : 'ghost'"
                size="xs"
                :icon="isCopied ? 'i-lucide-check' : 'i-lucide-copy'"
                :disabled="!canCopyChecksum"
                @click="copySha256"
              >
                {{ checksumCopyLabel }}
              </UButton>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="relative z-10 pt-4 border-t border-zinc-200 dark:border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-around gap-2.5">
            <UButton
              :to="plugin.repoUrl"
              target="_blank"
              color="neutral"
              variant="outline"
              size="sm"
              icon="i-lucide-code"
              class="justify-center"
            >
              View Source
            </UButton>

            <UButton
              :to="checkoutUrl"
              target="_blank"
              color="primary"
              variant="soft"
              size="sm"
              icon="i-lucide-shopping-bag"
              class="justify-center"
            >
              Buy Site License · {{ formattedPrice }}
            </UButton>

            <UButton
              color="primary"
              variant="solid"
              size="sm"
              icon="i-lucide-download"
              class="justify-center shadow-glow-violet"
              :loading="isDownloading"
              @click="onDownloadClick"
            >
              {{ isDownloading ? 'Downloading...' : 'Download Now' }}
            </UButton>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
