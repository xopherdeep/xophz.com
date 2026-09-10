<script setup lang="ts">
import { computed } from 'vue'
import type { PageHeroProps } from './types.d'

const props = withDefaults(defineProps<PageHeroProps>(), {
  subtitle: '',
  description: '',
  avatar: '',
  avatarAlt: '',
  badgeText: '',
  badgeIcon: '',
  metaText: '',
  glowPrimary: 'violet',
  glowSecondary: 'cyan',
})

const glowMap: Record<string, string> = {
  violet: 'bg-violet-500/10 dark:bg-violet-500/15',
  cyan: 'bg-cyan-500/10 dark:bg-cyan-500/15',
  amber: 'bg-amber-500/10 dark:bg-amber-500/15',
  emerald: 'bg-emerald-500/10 dark:bg-emerald-500/15',
  rose: 'bg-rose-500/10 dark:bg-rose-500/15',
}

const primaryGlowClass = computed(() => glowMap[props.glowPrimary] || glowMap.violet)
const secondaryGlowClass = computed(() => glowMap[props.glowSecondary] || glowMap.cyan)

const hasBadge = computed(() => Boolean(props.badgeText || props.badgeIcon))
const hasMeta = computed(() => Boolean(props.metaText))
const hasHeaderMeta = computed(() => hasBadge.value || hasMeta.value)
const hasActions = computed(() => Boolean(props.primaryAction || props.secondaryAction))
</script>

<template>
  <section class="o-page-hero">
    <!-- Optional Notification Slot -->
    <slot name="alert" />

    <!-- Hero Banner Card -->
    <div
      class="xo-gradient-border rounded-2xl p-6 md:p-10 bg-white dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.06] backdrop-blur-xl relative overflow-hidden"
      v-motion="{ initial: { opacity: 0, y: -20 }, enter: { opacity: 1, y: 0 } }"
    >
      <!-- Glow Accents -->
      <div
        class="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-[90px] pointer-events-none"
        :class="primaryGlowClass"
      />
      <div
        class="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-[90px] pointer-events-none"
        :class="secondaryGlowClass"
      />

      <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
        <!-- Optional Avatar / Media -->
        <slot name="avatar">
          <div
            v-if="avatar"
            class="xo-avatar-glow shrink-0"
            v-motion="{ initial: { opacity: 0, scale: 0.85 }, enter: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200 } } }"
          >
            <UAvatar
              :src="avatar"
              :alt="avatarAlt || title"
              size="3xl"
              class="ring-2 ring-violet-500/20 shadow-xl w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44"
            />
          </div>
        </slot>

        <div class="flex-1 max-w-[680px]">
          <!-- Badge and Meta Tag -->
          <div v-if="hasHeaderMeta" class="flex flex-wrap items-center gap-2 mb-3">
            <slot name="badge">
              <UBadge v-if="hasBadge" color="primary" variant="subtle" size="sm" class="flex items-center gap-1.5">
                <UIcon v-if="badgeIcon" :name="badgeIcon" class="w-3.5 h-3.5" />
                <span v-if="badgeText">{{ badgeText }}</span>
              </UBadge>
            </slot>
            <slot name="meta">
              <span v-if="hasMeta" class="text-[0.68rem] font-semibold tracking-[0.1em] uppercase text-zinc-400 dark:text-zinc-500">
                {{ metaText }}
              </span>
            </slot>
          </div>

          <!-- Title -->
          <slot name="title">
            <h1 class="font-display text-3xl md:text-5xl font-bold xo-gradient-text tracking-tight leading-[1.1]">
              {{ title }}
            </h1>
          </slot>

          <!-- Subtitle -->
          <slot name="subtitle">
            <p v-if="subtitle" class="text-sm sm:text-base text-violet-600 dark:text-violet-400 font-semibold mt-1">
              {{ subtitle }}
            </p>
          </slot>

          <!-- Description -->
          <div class="text-sm md:text-base leading-relaxed text-zinc-600 dark:text-zinc-300 mt-3">
            <slot name="description">
              <p v-if="description">{{ description }}</p>
            </slot>
          </div>
        </div>

        <!-- Actions / CTAs -->
        <div class="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full md:w-auto">
          <slot name="actions">
            <template v-if="hasActions">
              <UButton
                v-if="primaryAction"
                :to="primaryAction.to"
                :target="primaryAction.target"
                :color="primaryAction.color || 'primary'"
                :variant="primaryAction.variant || 'solid'"
                size="md"
                :icon="primaryAction.icon"
                :trailing-icon="primaryAction.trailingIcon"
                :class="primaryAction.class || 'shadow-glow-violet'"
              >
                {{ primaryAction.label }}
              </UButton>
              <UButton
                v-if="secondaryAction"
                :to="secondaryAction.to"
                :target="secondaryAction.target"
                :color="secondaryAction.color || 'neutral'"
                :variant="secondaryAction.variant || 'outline'"
                size="md"
                :icon="secondaryAction.icon"
                :trailing-icon="secondaryAction.trailingIcon"
                :class="secondaryAction.class"
              >
                {{ secondaryAction.label }}
              </UButton>
            </template>
          </slot>
        </div>
      </div>
    </div>
  </section>
</template>
