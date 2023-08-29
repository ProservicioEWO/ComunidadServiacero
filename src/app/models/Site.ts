import { Location } from "./Location";
import { UUID } from "./alias";

export interface Site {
  id: UUID
  alias: string
  name: string
  locations: Location[]
}