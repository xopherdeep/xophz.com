import { ref } from 'vue'

const isQrdOpen = ref(false)

export function useQrdModal() {
  const openQrd = () => {
    isQrdOpen.value = true
  }

  const closeQrd = () => {
    if (!isQrdOpen.value) return
    isQrdOpen.value = false
  }

  const toggleQrd = () => {
    isQrdOpen.value = !isQrdOpen.value
  }

  return {
    isOpen: isQrdOpen,
    openQrd,
    closeQrd,
    toggleQrd
  }
}
