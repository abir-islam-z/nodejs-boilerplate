export const routeParam = (value: string | string[] | undefined): string => {
  const resolved = Array.isArray(value) ? value[0] : value;
  if (!resolved) {
    throw new Error('Missing route parameter');
  }
  return resolved;
};
