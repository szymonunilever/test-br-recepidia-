export const fromCamelCase = (str: string) =>
  str
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (occ: string) => occ.toUpperCase());
