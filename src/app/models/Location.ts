import { UUID } from "./alias";

export interface Location {
  id: UUID
  cityId: string
  name: string
  imageKey: string
}