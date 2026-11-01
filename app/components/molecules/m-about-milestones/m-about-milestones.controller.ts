import { computed } from 'vue'
import type { MilestoneItem } from './types'

export function useAboutMilestonesController() {
  const milestones = computed<MilestoneItem[]>(() => [
    {
      period: 'Operations Outcomes',
      title: 'J.D. Mellberg Financial',
      role: 'Operations Dashboard & Lead Validation',
      desc: 'Unified Five9 telephony, Salesforce CRM, and marketing data into one real-time operations view, and automated lead validation that removed an estimated $1.2M a year in wasted spend and manual cleanup.'
    },
    {
      period: 'Consulting & Advisory',
      title: 'My Compass Consulting',
      role: 'Principal Operations & Systems Advisor',
      desc: 'Diagnosing where client operations leak time and money, then redesigning the workflows and platforms behind them. Cut ongoing maintenance overhead by 75% while running 25+ production platforms at 99.99% uptime.'
    },
    {
      period: 'Team Leadership',
      title: 'Vi',
      role: 'System Architect',
      desc: 'Led architecture of the core frontend codebase as the bridge between product and backend teams, set API contracts, and sustained 99.99% availability.'
    }
  ])

  const hasMilestones = computed(() => milestones.value.length > 0)

  return {
    milestones,
    hasMilestones
  }
}
