export interface SparkItem {
  key: string;
  name: string;
  category:
    | "Spatial OS"
    | "Productivity & Tools"
    | "Games & Arcade"
    | "Creative & Media"
    | "System & Utilities";
  desc: string;
  tag: string;
  color: string;
  demoUrl?: string;
  isFeatured?: boolean;
}

export const useSparks = () => {
  const sparks = ref<SparkItem[]>([
    {
      key: "my-compass",
      name: "My Compass",
      category: "Spatial OS",
      desc: "Central spatial dashboard, navigation matrix, and identity hub inside YouMeOS.",
      tag: "Core OS · Featured",
      color: "#06b6d4",
      demoUrl: "https://www.youmeos.com/#/sparks?spark=my-compass",
      isFeatured: true,
    },
    {
      key: "app-launcher",
      name: "Spatial App Launcher",
      category: "Spatial OS",
      desc: "3D grid launcher and window orchestrator for executing spatial web applications.",
      tag: "System · Featured",
      color: "#8b5cf6",
      demoUrl: "https://www.youmeos.com/#/sparks?spark=app-launcher",
      isFeatured: true,
    },
    {
      key: "nucleos",
      name: "NucleOS Spatial Engine",
      category: "Spatial OS",
      desc: "Core desktop environment manager handling window physics, z-index depth, and glassmorphic rendering.",
      tag: "Core OS · Live",
      color: "#a78bfa",
      demoUrl: "https://www.youmeos.com/#/sparks?spark=nucleos",
      isFeatured: true,
    },
    {
      key: "tesseract",
      name: "Tesseract 3D Viewer",
      category: "Creative & Media",
      desc: "WebGPU / Three.js spatial model viewer for assembling 3D assets and procedural block animations.",
      tag: "3D Engine · Live",
      color: "#3dee98",
      demoUrl: "https://www.youmeos.com/#/sparks?spark=tesseract",
      isFeatured: true,
    },
    {
      key: "terminal",
      name: "Command Matrix Terminal",
      category: "System & Utilities",
      desc: "Sovereign CLI console with bash syntax, system diagnostic commands, and API execution.",
      tag: "CLI · Live",
      color: "#10b981",
      demoUrl: "https://www.youmeos.com/#/sparks?spark=terminal",
      isFeatured: true,
    },
    {
      key: "sys-monitor",
      name: "Sys Monitor",
      category: "System & Utilities",
      desc: "Real-time telemetry, memory usage meters, frame rate diagnostics, and network activity monitor.",
      tag: "Telemetry · Live",
      color: "#f59e0b",
      demoUrl: "https://www.youmeos.com/#/sparks?spark=sys-monitor",
    },
    {
      key: "my-planner",
      name: "MRO Planner",
      category: "Productivity & Tools",
      desc: "Structural workflow organizer, daily agenda matrix, and automated task roadmap planner.",
      tag: "Productivity · Live",
      color: "#0ea5e9",
      demoUrl: "https://www.youmeos.com/#/sparks?spark=my-planner",
    },
    {
      key: "neon-notes",
      name: "Neon Notes",
      category: "Productivity & Tools",
      desc: "Rich text notepad with Markdown support, persistent local storage, and neon highlights.",
      tag: "Editor · Live",
      color: "#eab308",
      demoUrl: "https://www.youmeos.com/#/sparks?spark=neon-notes",
    },
    {
      key: "blackbox",
      name: "BlackBOX Node Control",
      category: "System & Utilities",
      desc: "Interface for managing self-healing BlackBOX server nodes networked via the w⁴ Protocol.",
      tag: "Infrastructure · Live",
      color: "#64748b",
      demoUrl: "https://www.youmeos.com/#/sparks?spark=blackbox",
    },
    {
      key: "gaea",
      name: "Gaea World Map",
      category: "Spatial OS",
      desc: "Interactive spatial world map showcasing server nodes, community hubs, and Sonoran desert bases.",
      tag: "Map · Live",
      color: "#22c55e",
      demoUrl: "https://www.youmeos.com/#/sparks?spark=gaea",
    },
    {
      key: "chronos",
      name: "Chronos Time Keeper",
      category: "System & Utilities",
      desc: "Multi-timezone clock matrix, countdown timers, and temporal task scheduling.",
      tag: "Clock · Live",
      color: "#a855f7",
      demoUrl: "https://www.youmeos.com/#/sparks?spark=chronos",
    },
    {
      key: "jukebox",
      name: "Majora D. Jukebox",
      category: "Creative & Media",
      desc: "Curated music player featuring original sonic compositions, soundscapes, and synth albums.",
      tag: "Music · Live",
      color: "#f43f5e",
      demoUrl: "https://www.youmeos.com/#/sparks?spark=jukebox",
    },
    {
      key: "solitaire",
      name: "Cyber Solitaire",
      category: "Games & Arcade",
      desc: "Classic Solitaire card game redesigned with neon neon glass cards and retro win animations.",
      tag: "Arcade · Live",
      color: "#3b82f6",
      demoUrl: "https://www.youmeos.com/#/sparks?spark=solitaire",
    },
    {
      key: "minesweeper",
      name: "Quantum Minesweeper",
      category: "Games & Arcade",
      desc: "Grid puzzle game with cyber aesthetic, custom difficulty levels, and speed run tracking.",
      tag: "Arcade · Live",
      color: "#10b981",
      demoUrl: "https://www.youmeos.com/#/sparks?spark=minesweeper",
    },
    {
      key: "snake",
      name: "Cyber Snake",
      category: "Games & Arcade",
      desc: "Smooth retro snake arcade game with high score leaderboard and power-ups.",
      tag: "Arcade · Live",
      color: "#84cc16",
      demoUrl: "https://www.youmeos.com/#/sparks?spark=snake",
    },
    {
      key: "paint",
      name: "Neon Paint Canvas",
      category: "Creative & Media",
      desc: "Digital drawing canvas with brush particle effects, neon glowing lines, and image export.",
      tag: "Canvas · Live",
      color: "#d946ef",
      demoUrl: "https://www.youmeos.com/#/sparks?spark=paint",
    },
    {
      key: "trophy-case",
      name: "Trophy Case & Badges",
      category: "Spatial OS",
      desc: "3D display case showing earned XP badges, quest trophies, and platform achievements.",
      tag: "Badges · Live",
      color: "#eab308",
      demoUrl: "https://www.youmeos.com/#/sparks?spark=trophy-case",
    },
    {
      key: "wizards-tower",
      name: "Wizard's Tower Lore",
      category: "Creative & Media",
      desc: "Interactive worldbuilding codex, character profiles, and Hall of the Gods lore browser.",
      tag: "Lore · Live",
      color: "#d9be6f",
      demoUrl: "https://www.youmeos.com/#/sparks?spark=wizards-tower",
    },
    {
      key: "yellow-links-spark",
      name: "Yellow Links Widget",
      category: "Productivity & Tools",
      desc: "Spatial widget version of Yellow Links for instant profile switching and link management.",
      tag: "Widget · Live",
      color: "#eab308",
      demoUrl: "https://www.youmeos.com/#/sparks?spark=yellow-links",
    },
  ]);

  const categories = computed(() => {
    const set = new Set(sparks.value.map((s) => s.category));
    return ["All", ...Array.from(set)];
  });

  const isLoading = ref(false);

  const fetchLiveSparks = async () => {
    isLoading.value = true;
    try {
      const res = await fetch(
        "https://www.youmeos.com/wp-json/compass/v1/sparks",
        {
          headers: { Accept: "application/json" },
        },
      );
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          // Sync live sparks if returned from server
        }
      }
    } catch (e) {
      // Retain local fallback on network error
    } finally {
      isLoading.value = false;
    }
  };

  return {
    sparks,
    categories,
    isLoading,
    fetchLiveSparks,
  };
};
