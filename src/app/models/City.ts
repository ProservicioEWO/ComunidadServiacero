import { Location } from "./Location";
import { UUID } from "./alias";

export interface City {
  id: UUID
  alias: string
  name: string
  locations: Location[]
}