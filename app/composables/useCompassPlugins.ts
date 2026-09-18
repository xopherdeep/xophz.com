import { compassCatalog } from "../data/compassCatalog";

export type CompassCategory =
  | "Command Deck"
  | "True North"
  | "Trajectory"
  | "Castle Walls"
  | "Wizard's Tower";

export interface CompassSaaSOffer {
  headline: string;
  audience: string;
  badge?: string;
  url?: string;
  price?: string;
}

export interface CompassPlugin {
  key: string;
  name: string;
  codename: string;
  category: CompassCategory;
  group?: string;
  desc: string;
  tag: string;
  color: string;
  gradient: string;
  logoUrl: string;
  iconName: string;
  repoUrl: string;
  githubRepo: string;
  price: string;
  priceNumber: number;
  marketEqv?: string;
  isCore?: boolean;
  version?: string;
  showcaseUrl?: string;
  showcaseLabel?: string;
  saasOffer?: CompassSaaSOffer;
  isPrivate?: boolean;
}

const STORAGE_KEY = "xophz_purchased_plugins";

export const useCompassPlugins = () => {
  const plugins = ref<CompassPlugin[]>([...compassCatalog]);

  const categories = computed<string[]>(() => [
    "All",
    "Command Deck",
    "True North",
    "Trajectory",
    "Castle Walls",
    "Wizard's Tower",
  ]);

  const purchasedPluginKeys = ref<string[]>([]);

  const loadPurchasedPlugins = () => {
    if (import.meta.server) return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        purchasedPluginKeys.value = JSON.parse(raw);
      }
    } catch {
      purchasedPluginKeys.value = [];
    }
  };

  const markAsPurchased = (slugOrKey: string): CompassPlugin | undefined => {
    if (import.meta.server) return undefined;
    const matched = plugins.value.find(
      (p) =>
        p.key === slugOrKey ||
        p.codename === slugOrKey ||
        p.githubRepo === slugOrKey,
    );
    const keyToStore = matched ? matched.key : slugOrKey;

    if (!purchasedPluginKeys.value.includes(keyToStore)) {
      purchasedPluginKeys.value = [...purchasedPluginKeys.value, keyToStore];
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(purchasedPluginKeys.value),
        );
      } catch {
        // Ignore quota limits
      }
    }
    return matched;
  };

  const isPurchased = (slugOrKey: string): boolean => {
    return purchasedPluginKeys.value.some(
      (k) => k === slugOrKey,
    );
  };

  const isLoadingLive = ref(false);

  const syncLiveCatalog = async () => {
    if (import.meta.server) return;
    try {
      isLoadingLive.value = true;
      const config = useRuntimeConfig();
      const apiRoot = (config?.public?.compassApiUrl as string) || "https://www.mycompassconsulting.com/wp-json/xophz/v1";
      const cleanApiRoot = apiRoot.replace(/\/+$/, "");
      const response = await fetch(`${cleanApiRoot}/modules`);
      if (!response.ok) return;

      const payload = await response.json();
      const hasModules = payload && payload.modules && typeof payload.modules === "object";
      if (!hasModules) return;

      const liveModules = payload.modules;
      plugins.value = plugins.value.map((plugin) => {
        const live = liveModules[plugin.codename] || liveModules[plugin.githubRepo];
        if (!live) return plugin;

        const liveSaas = live.saas_offer || live.saasOffer;
        const saasOffer = liveSaas
          ? {
              headline: liveSaas.headline || liveSaas.title || plugin.saasOffer?.headline || '',
              audience: liveSaas.audience || liveSaas.desc || plugin.saasOffer?.audience || '',
              badge: liveSaas.badge || plugin.saasOffer?.badge,
              url: liveSaas.url || plugin.saasOffer?.url,
              price: liveSaas.price || plugin.saasOffer?.price,
            }
          : plugin.saasOffer;

        const isLivePrivate = typeof live.is_private === "boolean"
          ? live.is_private
          : typeof live.isPrivate === "boolean"
            ? live.isPrivate
            : plugin.isPrivate;

        const isBoilerplateDesc =
          typeof live.description === "string" &&
          live.description
            .toLowerCase()
            .startsWith("standalone wordpress backend and router for the");
        const resolvedDesc =
          isBoilerplateDesc && plugin.desc
            ? plugin.desc
            : live.description || plugin.desc;

        const isBoilerplateEqv =
          typeof live.market_equivalent === "string" &&
          live.market_equivalent.toLowerCase().includes("custom sveltekit api");
        const resolvedMarketEqv =
          isBoilerplateEqv && plugin.marketEqv
            ? plugin.marketEqv
            : live.market_equivalent || plugin.marketEqv;

        let resolvedLogoUrl = plugin.logoUrl;
        if (
          plugin.logoUrl &&
          plugin.logoUrl.includes("xophz-compass.svg") &&
          live.icon
        ) {
          resolvedLogoUrl = live.icon.startsWith("http")
            ? live.icon
            : `https://www.mycompassconsulting.com${live.icon.startsWith("/") ? "" : "/"}${live.icon}`;
        }

        return {
          ...plugin,
          price: live.price_display || plugin.price,
          priceNumber: typeof live.price === "number" ? live.price : plugin.priceNumber,
          marketEqv: resolvedMarketEqv,
          desc: resolvedDesc,
          logoUrl: resolvedLogoUrl,
          showcaseUrl: live.showcase_url || live.showcaseUrl || plugin.showcaseUrl,
          showcaseLabel: live.showcase_label || live.showcaseLabel || plugin.showcaseLabel,
          saasOffer,
          isPrivate: isLivePrivate,
        };
      });
    } catch {
      // Graceful fallback to static catalog on connection failure
    } finally {
      isLoadingLive.value = false;
    }
  };

  return {
    plugins,
    categories,
    purchasedPluginKeys,
    isLoadingLive,
    loadPurchasedPlugins,
    syncLiveCatalog,
    markAsPurchased,
    isPurchased,
  };
};

export const getCompassCheckoutUrl = (
  plugin: CompassPlugin,
  origin: string,
  path: string,
  options?: { tier?: string; billing?: string },
) => {
  const config = useRuntimeConfig();
  const checkoutBase = (config?.public?.compassCheckoutUrl as string) || "https://www.mycompassconsulting.com";
  const cleanBase = checkoutBase.replace(/\/+$/, "");

  const returnUrl = `${origin}${path}?purchased=${plugin.githubRepo}`;
  const isLocalOrigin = origin.includes("localhost") || origin.includes("127.0.0.1");

  const queryParts: string[] = [
    `return_origin=${encodeURIComponent(returnUrl)}`
  ];

  if (options?.tier) {
    queryParts.push(`tier=${encodeURIComponent(options.tier)}`);
  }
  if (options?.billing) {
    queryParts.push(`billing=${encodeURIComponent(options.billing)}`);
  }
  if (isLocalOrigin) {
    queryParts.push("test=1");
  }

  const queryString = queryParts.join("&");
  return `${cleanBase}/buy/my-compass/${plugin.githubRepo}?${queryString}`;
};
