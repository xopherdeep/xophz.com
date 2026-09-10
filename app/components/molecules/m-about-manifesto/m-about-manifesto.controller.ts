import { computed } from 'vue'

export function useAboutManifestoController() {
  const manifesto = {
    title: 'THE SYNTHESIS MANIFESTO',
    quote: 'Code is not merely logic; it is structural poetry. When systems architecture, sovereign infrastructure, and creative worldbuilding align, software ceases to be a tool and becomes a living environment.',
    author: '~Xophz'
  }

  const hasManifesto = computed(() => Boolean(manifesto.quote))

  return {
    manifesto,
    hasManifesto
  }
}
