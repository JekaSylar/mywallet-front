export function abbreviation(word) {
  if (typeof word !== 'string') {
    throw new Error('Input must be a string');
  }

  return word.length >= 2 ? word.slice(0, 2).toUpperCase() : word.toUpperCase();
}
