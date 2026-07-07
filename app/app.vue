<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<style>
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --bg: #0a0a12;
  --bg-card: rgba(255, 255, 255, 0.04);
  --bg-card-hover: rgba(255, 255, 255, 0.07);
  --border: rgba(255, 255, 255, 0.08);
  --border-glow: rgba(139, 92, 246, 0.4);
  --text-primary: #f0f0f8;
  --text-secondary: #8888a8;
  --text-muted: #555570;
  --accent: #8b5cf6;
  --accent-2: #06b6d4;
  --accent-3: #f59e0b;
  --gradient-hero: linear-gradient(135deg, #8b5cf6 0%, #06b6d4 50%, #f59e0b 100%);
  --font-display: 'Space Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
}

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background: var(--bg);
  color: var(--text-primary);
  font-family: var(--font-body);
  min-height: 100dvh;
  overflow-x: hidden;
}

::selection {
  background: rgba(139, 92, 246, 0.35);
  color: var(--text-primary);
}

::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: var(--accent);
  border-radius: 2px;
}
</style>
