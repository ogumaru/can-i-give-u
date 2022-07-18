export const uniqueExists = <T>(list: T[]): T[] => {
  const exists = list.filter((value) => value);
  const unique = new Set(exists);
  return Array.from(unique);
};
