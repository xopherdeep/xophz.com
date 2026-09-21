import { ref, computed } from 'vue'
import { useTimeoutFn } from '@vueuse/core'
import { getQrPathData, QrEcc } from '~/utils/qr'
import { XP_CONTACT, generateQrVcard, generateFullVcard } from './vcard'
import type { Props, Emits } from './types'

export function useQrdModalController(_props: Props, emit: Emits) {
  // 1. Composables & Stores
  const contact = XP_CONTACT
  const qrPayload = generateQrVcard(contact)
  const fullPayload = generateFullVcard(contact)

  // 2. Reactive Primitives
  const isCopied = ref(false)

  const { start: startCopiedReset } = useTimeoutFn(() => {
    isCopied.value = false
  }, 2500, { immediate: false })

  // 3. Computed State & 2-Stage Booleans
  const copyLabel = computed(() => (isCopied.value ? 'Copied Contact' : 'Copy Contact Info'))
  const qrData = computed(() => getQrPathData(qrPayload, QrEcc.MEDIUM))

  // 4. Helper Methods & Actions
  const handleClose = () => {
    emit('close')
  }

  const handleBackdrop = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      handleClose()
    }
  }

  const saveContact = () => {
    if (import.meta.server) return
    const blob = new Blob([fullPayload], { type: 'text/vcard;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'Xopher_XP_Pollard.vcf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const copyContact = async () => {
    if (import.meta.server || !navigator?.clipboard?.writeText) return
    const websiteLines = contact.websites.join('\n')
    const summary = `${contact.name}\n${contact.title}\nPhone: ${contact.phone}\nEmail: ${contact.email}\nWebsites:\n${websiteLines}`
    await navigator.clipboard.writeText(summary)
    isCopied.value = true
    startCopiedReset()
  }

  return {
    contact,
    copyLabel,
    qrData,
    handleBackdrop,
    actions: {
      close: handleClose,
      saveContact,
      copyContact
    }
  }
}
