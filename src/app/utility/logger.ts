export enum LogLevel {
  Off = 0,
  Error,
  Warning,
  Info,
  Debug,
}

export type LogOutput = (
  source: string | undefined,
  level: LogLevel,
  ...objects: any[] // eslint-disable-line
) => void;

export class Logger {
  static level = LogLevel.Debug;

  static outputs: LogOutput[] = [];

  static enableProductionMode() {
    Logger.level = LogLevel.Warning;
  }

  constructor(private source?: string) {}

  // eslint-disable-next-line
  debug(...objects: any[]) {
    this.log(console.log, LogLevel.Debug, objects, 'yellow');
  }

  // eslint-disable-next-line
  info(...objects: any[]) {
    this.log(console.info, LogLevel.Info, objects, 'lime');
  }

  // eslint-disable-next-line
  warn(...objects: any[]) {
    this.log(console.warn, LogLevel.Warning, objects);
  }

  // eslint-disable-next-line
  error(...objects: any[]) {
    this.log(console.error, LogLevel.Error, objects);
  }

  // eslint-disable-next-line
  private log(
    func: (...args: any[]) => void,
    level: LogLevel,
    objects: any[],
    color?: string,
  ) {
    if (level <= Logger.level) {
      let log = this.source
        ? ['[' + this.source + ']'].concat(objects)
        : objects;

      if (color) {
        log = this.source
          ? [
              `%c[${this.source}]%c`,
              `background-color: ${color}; color: black; padding: 2px; margin: 2px 0; border-radius: 2px;`,
              '',
            ]
          : [];
        log.push(...objects);
      }

      func.apply(console, log);
      Logger.outputs.forEach((output) =>
        output.apply(output, [this.source, level, ...objects]),
      );
    }
  }
}
