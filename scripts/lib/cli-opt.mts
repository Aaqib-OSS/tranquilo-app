/**
 * Read a `--<name> <value>` CLI option from an argv array.
 * Returns `fallback` when the flag is absent or has no following value.
 */
export function opt<T>(
  args: readonly string[],
  name: string,
  fallback: T,
): string | T {
  const i = args.indexOf(`--${name}`);
  if (i === -1 || i + 1 >= args.length) return fallback;
  const value = args[i + 1];
  return value === undefined ? fallback : value;
}
