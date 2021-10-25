export interface Log {
  id: number;
  message: string;
  level: LogLevel;
  timeStamp: string;
}

export type LogLevel = 'Error' | 'Information' | 'Warning' | 'Fatal';
