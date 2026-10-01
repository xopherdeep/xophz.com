import { computed } from 'vue'
import type { MilestoneItem } from './types'

export function useAboutMilestonesController() {
  const milestones = computed<MilestoneItem[]>(() => [
    {
      period: 'Dual-Tenure Track Record',
      title: 'Enterprise Architecture & Leadership',
      role: 'System Architect & Founder Leadership',
      desc: 'Architecting distributed cloud systems, modernizing complex legacy monoliths, and scaling engineering teams and architectures across high-growth ventures and enterprise clients.'
    },
    {
      period: 'Consulting & Advisory',
      title: 'My Compass Consulting',
      role: 'Lead Solutions Architect',
      desc: 'Serving as the strategic tip of the spear for organizations requiring high-integrity technical blueprints, performance optimization, and executive technology direction.'
    },
    {
      period: 'Foundational Ecosystem',
      title: 'Hall of the Gods & Sovereign Webwork',
      role: 'Founder & Worldbuilder',
      desc: 'Pioneering sovereign digital infrastructure alongside multi-disciplinary creative ventures spanning music, visual art, and spatial computing.'
    }
  ])

  const hasMilestones = computed(() => milestones.value.length > 0)

  return {
    milestones,
    hasMilestones
  }
}
