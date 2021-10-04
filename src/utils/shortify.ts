export const shortify = (str: string, maxLength: number): string => {
  if (!str) {
    throw new Error('Shortify: input string was null or undefined.');
  }

  if (maxLength < 0 || str.length <= maxLength) {
    return str;
  }

  return str; //.substring(0, maxLength);
};
