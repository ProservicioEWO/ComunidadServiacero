export enum LogType {
  MODULE = 'M',
  LOGIN = 'L'
}

export interface Log {
  date: string,
  type: LogType,
  moduleId: string,
  userId: string
}