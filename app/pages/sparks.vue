<script setup lang="ts">
import type { Spark } from '~/composables/useSparks'
import MSparksHero from '~/components/molecules/m-sparks-hero/m-sparks-hero.vue'
import MSparksCatalog from '~/components/molecules/m-sparks-catalog/m-sparks-catalog.vue'
import CompassSparkModal from '~/components/CompassSparkModal.vue'

const { sparks, categories, syncLiveCatalog } = useSparks()

useSeoMeta({
  title: 'YouMeOS Sparks Suite · Spatial OS Widgets & Applications',
  description: 'Explore the 50+ spatial applications, utilities, retro arcade games, and creative tools powering YouMeOS and standalone PWAs.',
})

const selectedSpark = ref<Spark | null>(null)
const isModalOpen = ref(false)

const openModal = (spark: Spark) => {
  selectedSpark.value = spark
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedSpark.value = null
}

const route = useRoute()

const checkSparkDeepLink = () => {
  const sparkQuery = route.query.spark as string | undefined
  if (sparkQuery) {
    const found = sparks.value.find((s) => s.key === sparkQuery || s.codename === sparkQuery)
    if (found) {
      openModal(found)
      nextTick(() => {
        const cardElement = document.getElementById(`spark-${found.key}`)
        if (cardElement) {
          cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      })
    }
  }
}

watch(() => route.query.spark, () => {
  checkSparkDeepLink()
})

onMounted(() => {
  syncLiveCatalog()
  checkSparkDeepLink()
})
</script>

<template>
  <main class="min-h-dvh flex flex-col items-center relative py-10">
    <UContainer class="max-w-[1100px] w-full flex flex-col gap-10">
      <MSparksHero />

      <MSparksCatalog
        :sparks
        :categories
        @open-modal="openModal"
      />

      <!-- Spark Details Modal -->
      <CompassSparkModal
        :spark="selectedSpark"
        :is-open="isModalOpen"
        @close="closeModal"
      />
    </UContainer>
  </main>
</template>
