<script setup lang="ts">
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
  return ['All', ...Array.from(set).sort()]
})

const allCategories = computed(() => {
  const set = new Set(projects.map(p => extractCategory(p.tag)))
  return ['All', ...Array.from(set).sort()]
})

const activeStatusFilter = ref('All')
const activeCategoryFilter = ref('All')

const filteredProjects = computed(() => {
  return projects.filter(p => {
    const statusMatch = activeStatusFilter.value === 'All' || extractStatus(p.tag) === activeStatusFilter.value
    const categoryMatch = activeCategoryFilter.value === 'All' || extractCategory(p.tag) === activeCategoryFilter.value
    return statusMatch && categoryMatch
  })
})
</script>

<template>
  <main class="min-h-dvh flex flex-col items-center relative">
    <div class="w-full max-w-[1100px] px-4 pt-[80px] pb-[90px] flex flex-col gap-6">

      <!-- Header -->
      <div v-motion="{ initial: { opacity: 0, x: -20 }, enter: { opacity: 1, x: 0 } }">
        <h1 class="font-display text-3xl md:text-4xl font-bold text-text-primary tracking-[-0.03em]">Magnum Opus</h1>
        <p class="text-sm leading-[1.7] text-text-secondary mt-2">The Hall of the Gods ecosystem. Infrastructure, services, and visions I'm building.</p>
      </div>

      <!-- Filter bar -->
      <div class="flex flex-col sm:flex-row gap-3" v-motion="{ initial: { opacity: 0, y: 10 }, enter: { opacity: 1, y: 0, transition: { delay: 60 } } }">
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="status in allStatuses"
            :key="'s-' + status"
            class="px-3 py-1.5 rounded-full text-[0.68rem] font-semibold tracking-[0.04em] border cursor-pointer transition-all duration-200 backdrop-blur-md"
            :class="activeStatusFilter === status
              ? 'bg-accent/20 border-accent/50 text-text-primary shadow-[0_0_10px_rgba(139,92,246,0.15)]'
              : 'bg-white/5 border-white/[0.06] text-text-muted hover:bg-white/10 hover:border-white/25 hover:text-text-secondary'"
            @click="activeStatusFilter = status"
          >{{ status }}</button>
        </div>
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="cat in allCategories"
            :key="'c-' + cat"
            class="px-3 py-1.5 rounded-full text-[0.68rem] font-semibold tracking-[0.04em] border cursor-pointer transition-all duration-200 backdrop-blur-md"
            :class="activeCategoryFilter === cat
              ? 'bg-accent-2/20 border-accent-2/50 text-text-primary shadow-[0_0_10px_rgba(6,182,212,0.15)]'
              : 'bg-white/5 border-white/[0.06] text-text-muted hover:bg-white/10 hover:border-white/25 hover:text-text-secondary'"
            @click="activeCategoryFilter = cat"
          >{{ cat }}</button>
        </div>
      </div>

      <!-- Count -->
      <p class="text-[0.65rem] font-bold tracking-[0.12em] uppercase text-text-muted">
        {{ filteredProjects.length }} project{{ filteredProjects.length === 1 ? '' : 's' }}
      </p>

      <!-- Grid -->
      <TransitionGroup
        tag="div"
        class="grid grid-cols-1 md:grid-cols-2 gap-3"
        enter-active-class="transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
        enter-from-class="opacity-0 scale-95 translate-y-2"
        leave-active-class="transition-all duration-200 ease-in"
        leave-to-class="opacity-0 scale-95"
        move-class="transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
      >
        <div v-for="project in filteredProjects" :key="project.key" class="group relative overflow-hidden bg-white/5 border border-white/[0.06] rounded-2xl backdrop-blur-xl p-5 shadow-glass-shadow transition-all duration-300 hover:border-[color:var(--proj-color)]/30 hover:bg-white/8" :style="{ '--proj-color': project.color }">
          <div class="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-sm shadow-[0_0_12px_var(--proj-color)] transition-shadow duration-300 group-hover:shadow-[0_0_20px_var(--proj-color)]" :style="{ backgroundColor: project.color }" />
          <div class="flex items-center gap-2 mb-2 pl-3">
            <div class="w-2 h-2 rounded-full shrink-0 shadow-[0_0_8px_var(--proj-color)]" :style="{ backgroundColor: project.color }" />
            <span class="text-[0.6rem] font-bold tracking-[0.12em] uppercase" :style="{ color: project.color }">{{ project.tag }}</span>
            <a v-if="project.url" :href="project.url" target="_blank" rel="noopener noreferrer" class="ml-auto text-[0.6rem] font-bold tracking-[0.08em] uppercase no-underline opacity-50 transition-opacity duration-200 shrink-0 hover:opacity-100 flex items-center gap-1" :style="{ color: project.color }">
              Visit <LucideArrowUpRight class="w-3 h-3" />
            </a>
          </div>
          <p class="font-display text-[1.05rem] font-bold text-text-primary mb-1.5 pl-3">{{ project.name }}</p>
          <p class="text-[0.8rem] leading-[1.65] text-text-secondary pl-3">{{ project.desc }}</p>
        </div>
      </TransitionGroup>
    </div>
  </main>
</template>
