import { UUID } from "./alias"

export interface News {
  id: UUID
  title: string
  description: string
  date: string
  link: string
  image: string
}