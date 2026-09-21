import { computed } from 'vue'
import type {
  TimelineRailProps,
  TimelineRailEmits,
  TimelineTreeBranch,
  TimelineFileNode
} from './types'
import type { TimelineCategory } from '~/data/timelineCatalog'

interface BranchConfig {
  readonly key: TimelineCategory
  readonly dirName: string
  readonly label: string
  readonly icon: string
}

const BRANCH_CONFIGS: readonly BranchConfig[] = [
  {
    key: 'Founding & Advisory',
    dirName: 'ventures/',
    label: 'Sovereign & Advisory',
    icon: 'i-lucide-folder-git-2'
  },
  {
    key: 'Enterprise Systems',
    dirName: 'architecture/',
    label: 'Cloud & Systems Scale',
    icon: 'i-lucide-folder-tree'
  },
  {
    key: 'Software Engineering',
    dirName: 'engineering/',
    label: 'Platform & Applications',
    icon: 'i-lucide-folder-code'
  },
  {
    key: 'Infrastructure & Tech',
    dirName: 'infrastructure/',
    label: 'Field Systems & Hardware',
    icon: 'i-lucide-folder-cog'
  }
]

export function useTimelineRailController(
  props: TimelineRailProps,
  emit: TimelineRailEmits
) {
  // 1. Reactive derivations & Tree branches
  const treeBranches = computed<TimelineTreeBranch[]>(() => {
    return BRANCH_CONFIGS.map((config) => {
      const matchingItems = props.items
        .filter((item) => item.category === config.key)
        .sort((a, b) => b.startDate.localeCompare(a.startDate))

      const nodes: TimelineFileNode[] = matchingItems.map((item, idx) => ({
        id: item.id,
        role: item.role,
        company: item.company,
        year: item.startDate.slice(0, 4),
        isCurrent: item.isCurrent,
        isLast: idx === matchingItems.length - 1
      }))

      return {
        key: config.key,
        dirName: config.dirName,
        label: config.label,
        icon: config.icon,
        nodes
      }
    }).filter((branch) => branch.nodes.length > 0)
  })

  // 2. Two-Stage Atomic Booleans
  const hasBranches = computed(() => treeBranches.value.length > 0)
  const canRenderTree = computed(() => hasBranches.value)

  // 3. Actions
  const handleSelectNode = (id: string) => {
    emit('select', id)
  }

  return {
    treeBranches,
    canRenderTree,
    handleSelectNode
  }
}
