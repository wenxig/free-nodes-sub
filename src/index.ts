import { clash } from "./cls"
import { v2ray } from "./v2r"

await Promise.all([
  v2ray(),
  clash()
])