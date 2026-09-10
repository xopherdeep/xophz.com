import type { Spark } from "../composables/useSparks"
import { systemSparks } from "./sparks/system"
import { gatewaysSparks } from "./sparks/gateways"
import { gadgetsSparks } from "./sparks/gadgets"
import { gamesSparks } from "./sparks/games"
import { goodiesSparks } from "./sparks/goodies"
import { vipSparks } from "./sparks/vip"
import { websparksSparks } from "./sparks/websparks"

export const sparksCatalog: Spark[] = [
  ...systemSparks,
  ...gatewaysSparks,
  ...gadgetsSparks,
  ...gamesSparks,
  ...goodiesSparks,
  ...vipSparks,
  ...websparksSparks
]
