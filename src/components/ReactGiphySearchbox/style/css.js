export const css = (strings, ...args) =>
  strings.reduce(
    (acc, string, index) =>
      acc + string + (index < args.length ? args[index] : ""),
    ""
  );
