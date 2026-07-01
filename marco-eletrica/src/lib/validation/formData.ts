export function emptyToUndefined(
  value: FormDataEntryValue | null,
): string | undefined {
  if (value == null) return undefined;
  const str = String(value).trim();
  return str === "" ? undefined : str;
}
