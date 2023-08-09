export enum LogType {
  MODULE = 'M',
  LOGIN = 'L'
}

export interface Log {
  date: string,
  type: LogType,
  userId: string
  moduleId?: string,
}