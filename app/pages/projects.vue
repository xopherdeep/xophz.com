<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useContextualSearch } from '~/composables/useContextualSearch'
import MOpusHero from '~/components/molecules/m-opus-hero/m-opus-hero.vue'

const router = useRouter()
const { projects } = useProfileData()

useSeoMeta({
  title: 'Magnum Opus · Xopher "XP" Pollard',
  description: 'The Hall of the Gods ecosystem. Infrastructure, services, and visions built by Xopher "XP" Pollard.',
})

const extractStatus = (tag: string): string => {
  const parts = tag.split('·').map(s => s.trim())
  return parts[parts.length - 1] || 'Other'
}

const extractCategory = (tag: string): string => {
  const parts = tag.split('·').map(s => s.trim())
  return parts[0] || 'Other'
}

const allStatuses = computed(() => {
  const set = new Set(projects.map(p => extractStatus(p.tag)))
  const preferredOrder = ['All', 'Live', 'Active', 'Active Build']
  const sorted = preferredOrder.filter(s => s === 'All' || set.has(s))
  const remaining = Array.from(set).filter(s => !preferredOrder.includes(s)).sort()
  return [...sorted, ...remaining]
})

const allCategories = computed(() => {
  const set = new Set(projects.map(p => extractCategory(p.tag)))
  return ['All', ...Array.from(set).sort()]
})

const activeStatusFilter = ref('All')
const activeCategoryFilter = ref('All')
const searchQuery = ref('')

const projectSearchItems = computed(() =>
  projects.map((project) => ({
    id: `project-${project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    title: project.name,
    subtitle: project.desc,
    category: 'projects' as const,
    categoryLabel: 'Opus',
    icon: 'i-lucide-boxes',
    iconColor: '#8b5cf6',
    badge: project.tag,
    isExternal: project.url.startsWith('http'),
    action: () => {
      if (typeof window !== 'undefined') {
        if (project.url.startsWith('http')) {
          window.open(project.url, '_blank')
        } else {
          router.push(project.url)
        }
      }
    },
    keywords: [project.name, project.tag, project.desc]
  }))
)

useContextualSearch({
  placeholder: 'Search platforms, architecture, tags...',
  query: searchQuery,
  categoryLabel: 'Opus',
  items: projectSearchItems
})

const isStatusFiltered = computed(() => activeStatusFilter.value !== 'All')
const isCategoryFiltered = computed(() => activeCategoryFilter.value !== 'All')
const hasSearchQuery = computed(() => searchQuery.value.trim().length > 0)
const hasActiveFilters = computed(() => isStatusFiltered.value || isCategoryFiltered.value || hasSearchQuery.value)

const clearFilters = () => {
  activeStatusFilter.value = 'All'
  activeCategoryFilter.value = 'All'
  searchQuery.value = ''
}

const filteredProjects = computed(() => {
  const query = searchQuery.value.toLowerCase().trim()
  return projects.filter(p => {
    const isStatusMatch = activeStatusFilter.value === 'All' || extractStatus(p.tag) === activeStatusFilter.value
    const isCategoryMatch = activeCategoryFilter.value === 'All' || extractCategory(p.tag) === activeCategoryFilter.value
    const isSearchMatch = !query ||
      p.name.toLowerCase().includes(query) ||
      p.desc.toLowerCase().includes(query) ||
      p.tag.toLowerCase().includes(query)
    return isStatusMatch && isCategoryMatch && isSearchMatch
  })
})

const hasProjects = computed(() => filteredProjects.value.length > 0)
</script>

<template>
  <main class="min-h-dvh flex flex-col items-center relative py-10">
    <UContainer class="max-w-[1100px] w-full flex flex-col gap-8">
      <MOpusHero />

      <!-- Section Title & Search Consolidation -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-zinc-200/60 dark:border-white/[0.06]">
        <div>
          <h2 class="font-display text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <UIcon name="i-lucide-boxes" class="w-5 h-5 text-violet-500" />
            Ecosystem Catalog
          </h2>
        </div>
        <div v-if="searchQuery" class="flex items-center gap-2">
          <span class="text-xs text-zinc-500">
            Filtered by "<span class="text-violet-600 dark:text-cyan-400 font-semibold">{{ searchQuery }}</span>"
          </span>
          <UButton
            size="xs"
            variant="ghost"
            color="neutral"
            icon="i-lucide-x"
            @click="searchQuery = ''"
          >
            Clear
          </UButton>
        </div>
      </div>

      <!-- Filters Toolbar -->
      <div class="flex flex-col gap-4">
        <!-- Top Filter Row: Segmented Status Controls + Clear Filter -->
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div class="flex flex-wrap items-center gap-2">
            <span class="text-[0.68rem] font-bold uppercase tracking-[0.1em] text-zinc-400 dark:text-zinc-500 shrink-0">
              Status:
            </span>
            <div class="inline-flex p-1 rounded-xl bg-zinc-100/80 dark:bg-white/[0.04] border border-zinc-200/60 dark:border-white/[0.06] backdrop-blur-md">
              <UButton
                v-for="status in allStatuses"
                :key="'s-' + status"
                :variant="activeStatusFilter === status ? 'solid' : 'ghost'"
                :color="activeStatusFilter === status ? 'primary' : 'neutral'"
                size="xs"
                class="rounded-lg transition-all"
                @click="activeStatusFilter = status"
              >
                {{ status }}
              </UButton>
            </div>
          </div>

          <!-- Reset Filter Button -->
          <UButton
            v-if="hasActiveFilters"
            variant="ghost"
            color="neutral"
            size="xs"
            icon="i-lucide-rotate-ccw"
            @click="clearFilters"
          >
            Reset Filters
          </UButton>
        </div>

        <!-- Category Filter Pills -->
        <div class="flex flex-wrap items-center gap-1.5">
          <span class="text-[0.68rem] font-bold uppercase tracking-[0.1em] text-zinc-400 dark:text-zinc-500 shrink-0 mr-1">
            Category:
          </span>
          <UButton
            v-for="cat in allCategories"
            :key="'c-' + cat"
            :variant="activeCategoryFilter === cat ? 'solid' : 'ghost'"
            :color="activeCategoryFilter === cat ? 'primary' : 'neutral'"
            size="xs"
            class="rounded-lg transition-all"
            @click="activeCategoryFilter = cat"
          >
            {{ cat }}
          </UButton>
        </div>
      </div>

      <!-- Count Indicator -->
      <p class="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-zinc-400 dark:text-zinc-500 -mt-3">
        Showing {{ filteredProjects.length }} of {{ projects.length }} platform{{ filteredProjects.length === 1 ? '' : 's' }}
      </p>

      <!-- Grid -->
      <TransitionGroup
        v-if="hasProjects"
        tag="div"
        class="grid grid-cols-1 md:grid-cols-2 gap-5"
        enter-active-class="transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        enter-from-class="opacity-0 scale-95 translate-y-2"
        leave-active-class="transition-all duration-200 ease-in"
        leave-to-class="opacity-0 scale-95"
        move-class="transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
      >
        <div
          v-for="project in filteredProjects"
          :key="project.key"
          class="xo-shine-on-hover group rounded-2xl p-5 bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] backdrop-blur-xl flex flex-col justify-between transition-all duration-300 hover:border-[color:var(--proj-color)]/40 dark:hover:border-[color:var(--proj-color)]/40 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] hover:-translate-y-0.5"
          :style="{ '--proj-color': project.color || '#8b5cf6' }"
        >
          <div class="flex flex-col gap-3">
            <div class="flex items-start justify-between gap-3">
              <div class="flex items-center gap-2.5 min-w-0">
                <span
                  class="w-2.5 h-2.5 rounded-full shrink-0 shadow-[0_0_8px_var(--proj-color)]"
                  :style="{ backgroundColor: project.color || '#8b5cf6' }"
                />
                <span class="font-bold text-base font-display text-zinc-900 dark:text-zinc-100 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors truncate">
                  {{ project.name }}
                </span>
              </div>
              <UBadge color="primary" variant="subtle" size="xs" class="shrink-0">
                {{ project.tag }}
              </UBadge>
            </div>
            <p class="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {{ project.desc }}
            </p>
          </div>

          <div v-if="project.url" class="flex justify-end mt-4 pt-3 border-t border-zinc-100 dark:border-white/[0.04]">
            <UButton
              :to="project.url"
              target="_blank"
              variant="ghost"
              color="primary"
              size="xs"
              trailing-icon="i-lucide-arrow-up-right"
            >
              Launch
            </UButton>
          </div>
        </div>
      </TransitionGroup>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <UIcon name="i-lucide-search-x" class="w-12 h-12 text-zinc-300 dark:text-zinc-600 mx-auto mb-4" />
        <p class="text-sm text-zinc-500 dark:text-zinc-400">No platforms match your active filters.</p>
        <UButton
          v-if="hasActiveFilters"
          variant="ghost"
          color="primary"
          size="sm"
          class="mt-3"
          icon="i-lucide-rotate-ccw"
          @click="clearFilters"
        >
          Reset Filters
        </UButton>
      </div>
    </UContainer>
  </main>
</template>
