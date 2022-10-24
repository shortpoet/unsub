import { inspect } from 'util';

type Options = {
  color: string;
  background: string;
};

export function colorLog(message: any, options?: number, debug?: boolean): void;
export function colorLog(
  message: any,
  options?: number | Options,
  debug?: boolean
): void {
  let color;
  let background;
  const _options: Options = {} as Options;
  if (debug == false) {
    return;
  }
  // use strict null check double bang to account for !0 being true
  // but then !!1 is true
  if (options == null) {
    _options.color = 'magenta';
    _options.background = 'yellow';
    options = _options;
  }
  if (typeof options == 'object') {
    color = options.color;
    background = options.background;
  } else if (typeof options == 'number') {
    switch (options) {
      case 1:
        color = 'green';
        background = 'yellow';
        break;

      default:
        color = 'magenta';
        background = 'yellow';
        break;
    }
  }
  let bound = console.log.bind(window.console);
  // const lines = new Error()?.stack?.split('\n');
  // const caller = lines?.[0];
  // const callerName = lines?.[1];
  // message = {
  //   message,
  //   caller,
  //   callerName
  // };

  bound = (color, background) =>
    console.log(
      `%c` + `${inspect(message, { colors: true, depth: 8 })}`,
      `color:` + `${color};background:${background}`
    );
  bound(color, background);
}

// module.exports =  {
//   log,
//   colorLog
// }
