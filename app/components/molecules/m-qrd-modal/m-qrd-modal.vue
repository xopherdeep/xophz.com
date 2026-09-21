<script setup lang="ts">
import { useQrdModalController } from './m-qrd-modal.controller'
import type { Props, Emits } from './types'

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const { contact, copyLabel, qrData, handleBackdrop, actions } = useQrdModalController(props, emit)
</script>

<template>
  <Teleport to="body">
    <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 scale-95" leave-active-class="transition duration-150 ease-in" leave-to-class="opacity-0 scale-95">
      <div v-if="isOpen" class="m-qrd-modal__backdrop" role="dialog" aria-modal="true" aria-label="Digital Contact QR" @click="handleBackdrop">
        <div class="m-qrd-modal__content">
          <!-- Dismiss Button -->
          <div class="m-qrd-modal__dismiss">
            <UButton color="neutral" variant="ghost" size="sm" icon="i-lucide-x" aria-label="Close" @click="actions.close" />
          </div>

          <!-- Identity Header -->
          <div class="text-center mb-4">
            <h3 class="font-display font-bold text-xl text-white">{{ contact.name }}</h3>
            <p class="text-xs text-zinc-400 mt-0.5">{{ contact.title }}</p>
          </div>

          <!-- Unboxed QR Plaque -->
          <div class="m-qrd-modal__qr-plaque">
            <svg
              :viewBox="`0 0 ${qrData.totalSize} ${qrData.totalSize}`"
              xmlns="http://www.w3.org/2000/svg"
              shape-rendering="crispEdges"
              class="m-qrd-modal__svg"
              role="img"
              aria-label="QR Code"
            >
              <rect width="100%" height="100%" fill="#ffffff" />
              <path :d="qrData.pathD" fill="#000000" />
            </svg>
          </div>

          <!-- Scan Helper Hint -->
          <p class="text-xs text-center text-zinc-400 mt-3">
            Scan with phone camera to add contact details
          </p>

          <!-- Quick Action Buttons -->
          <div class="grid grid-cols-2 gap-2.5 w-full mt-4">
            <UButton color="primary" variant="solid" size="sm" icon="i-lucide-user-plus" class="justify-center font-medium" @click="actions.saveContact">
              Save Contact
            </UButton>
            <UButton color="neutral" variant="soft" size="sm" icon="i-lucide-copy" class="justify-center font-medium" @click="actions.copyContact">
              {{ copyLabel }}
            </UButton>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
@use './m-qrd-modal';
</style>
