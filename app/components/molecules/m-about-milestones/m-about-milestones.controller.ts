import { computed } from 'vue'
import type { MilestoneItem } from './types'

export function useAboutMilestonesController() {
  const milestones = computed<MilestoneItem[]>(() => [
    {
      period: '25+ Years Experience',
      title: 'Enterprise Architecture & Leadership',
      role: 'CTO / VP of Engineering / Principal Architect',
      desc: 'Architecting distributed cloud systems, modernizing complex legacy monoliths, and scaling engineering teams from early-stage ventures to Fortune 500 enterprises.'
    },
    {
      period: 'Consulting & Advisory',
      title: 'My Compass Consulting',
      role: 'Principal Systems Synthesist',
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
