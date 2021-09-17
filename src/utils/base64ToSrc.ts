export const base64ToSrc = (base64: string): string => {
  return `data:image/jpg;base64, ${base64}`;
};
