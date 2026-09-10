<script setup lang="ts">
import { useAboutBioController } from './m-about-bio.controller'

const { bioTitle, hasBio } = useAboutBioController()
</script>

<template>
  <section
    v-if="hasBio"
    class="m-about-bio py-2"
  >
    <UContainer class="max-w-[1100px] w-full">
      <div
        class="xo-card-glow rounded-2xl p-6 sm:p-8 bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] backdrop-blur-xl flex flex-col gap-4"
        v-motion="{ initial: { opacity: 0, y: 20 }, enter: { opacity: 1, y: 0, transition: { delay: 100 } } }"
      >
        <div class="flex items-center gap-2 text-violet-600 dark:text-violet-400">
          <UIcon
            name="i-lucide-terminal"
            class="w-4 h-4"
          />
          <h2 class="font-display text-sm font-bold tracking-[0.12em] uppercase">
            {{ bioTitle }}
          </h2>
        </div>

        <p class="text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          I am a 25+ year veteran software architect, serial founder, and executive technology leader based out of the
          Sonoran Desert. As the principal behind <strong>My Compass Consulting</strong>, I specialize in high-stakes
          systems synthesis, carving monolithic legacy systems into resilient, cloud-native architectures without
          disrupting ongoing operations. I partner with elite founders and agencies to deploy sovereign infrastructure
          (BlackBOX) and provide high-level systems advisory, building the architectural backbone that allows visionary
          companies to scale effortlessly.
        </p>

        <p class="text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          Beyond enterprise advisory, welcome to the grand vantage point: a single sovereign perch surveying every mask
          I wear, every protocol I forge, and the full circus of my creative realms. <strong>xophz.com</strong> serves
          as the central nexus connecting the <em>w⁴ Protocol</em>, the <em>Hall of the Gods</em> co-operative webwork,
          audio composition as <em>Majora D.</em>, visual art and worldbuilding lore under <em>Jesta Sugjester</em>,
          tech exploration as <em>Midnight Nerd</em>, and gaming roots as <em>[HΩG] Tim</em>.
        </p>
      </div>
    </UContainer>
  </section>
</template>

<style scoped lang="scss">
  @use './m-about-bio';
</style>
