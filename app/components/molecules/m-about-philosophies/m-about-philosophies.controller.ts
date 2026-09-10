import { computed } from 'vue'
import type { PhilosophyItem } from './types'

export function useAboutPhilosophiesController() {
  const philosophies = computed<PhilosophyItem[]>(() => [
    {
      title: 'Structural Integrity First',
      icon: 'i-lucide-shield-check',
      desc: 'Systems engineered like modern cathedrals: resilient under extreme load, self-healing under duress, and built without organizational burnout during evolution.',
      color: 'violet'
    },
    {
      title: 'Emergence from First Principles',
      icon: 'i-lucide-compass',
      desc: 'Complexity is best navigated by mastering fundamental primitives. Whether designing modular software suites, economic protocols, or interactive worlds, enduring architectures arise from simple, harmonious building blocks rather than top-heavy abstraction.',
      color: 'emerald'
    },
    {
      title: 'The Crafted Tool as Sanctuary',
      icon: 'i-lucide-feather',
      desc: 'Technology should cultivate cognitive peace, not digital exhaustion. From low-friction e-ink planners to responsive interfaces, software must serve as a focused digital instrument that respects human attention, rhythm, and sovereignty.',
      color: 'rose'
    },
    {
      title: 'Fractal Governance & Sovereignty',
      icon: 'i-lucide-network',
      desc: 'Sustainable systems distribute agency rather than centralize control. By embedding proportional representation, liquid delegation, and transparent mechanics into organizational architecture, collective intelligence emerges naturally without bureaucratic decay.',
      color: 'amber'
    },
    {
      title: 'Pragmatic Rigor, Mythic Vision',
      icon: 'i-lucide-eye',
      desc: 'Great execution requires dual vision: the discipline to ship via trunk-based pipelines and prioritized increments, paired with the imagination to ground digital spaces in timeless narrative, deep symbology, and wonder.',
      color: 'cyan'
    },
    {
      title: 'Polymathic Synthesis',
      icon: 'i-lucide-sparkles',
      desc: 'Breakthroughs occur at discipline intersections. Technical architecture, music production, and visual art inform one another to build software with soul.',
      color: 'indigo'
    },
    {
      title: 'GlowitheFlow',
      icon: 'i-lucide-waves',
      desc: 'Effortless navigation of external currents anchored by resilient inner peace and expressed through active human flourishing. Moving with life\'s natural momentum while radiating purposeful excellence.',
      color: 'blue'
    }
  ])

  const hasPhilosophies = computed(() => philosophies.value.length > 0)

  return {
    philosophies,
    hasPhilosophies
  }
}
