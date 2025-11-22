

// const normalize = (text: string): string => {
//   return text
//     .toLowerCase()
//     .normalize('NFKD')                         // remove accents
//     .replace(/[\u0300-\u036f]/g, '')           // strip diacritics
//     .replace(/\(.*?\)/g, ' ')                  // remove parentheses content
//     .replace(/[^a-z0-9]+/g, ' ')               // replace punctuation with spaces
//     .trim()
//     .replace(/\s+/g, ' ');                     // collapse multiple spaces
// };

// // Basic Levenshtein distance
// const levenshtein = (a: string, b: string): number => {
//   const matrix = Array.from({ length: b.length + 1 }, (_, i) =>
//     Array.from({ length: a.length + 1 }, (_, j) =>
//       i === 0 ? j : j === 0 ? i : 0
//     )
//   );

//   for (let i = 1; i <= b.length; i++) {
//     for (let j = 1; j <= a.length; j++) {
//       matrix[i][j] = Math.min(
//         matrix[i - 1][j] + 1,
//         matrix[i][j - 1] + 1,
//         matrix[i - 1][j - 1] + (a[j - 1] === b[i - 1] ? 0 : 1)
//       );
//     }
//   }

//   return matrix[b.length][a.length];
// };

// // Fuzzy comparison after normalization
// export const fuzzy = (item: string, brand: string): boolean => {
//   const a = normalize(item);
//   const b = normalize(brand);

//   // exact match after normalization
//   if (a === b) return true;

//   // fuzzy similarity threshold (80%)
//   const distance = levenshtein(a, b);
//   const maxLen = Math.max(a.length, b.length);
//   const similarity = 1 - distance / maxLen;

//   return similarity >= 0.8;
// };

// Combined normalization + fuzzy matching

const normalize = (text) => {
  return text
    .toLowerCase()
    .normalize('NFKD')                         // remove accents
    .replace(/[\u0300-\u036f]/g, '')           // strip diacritics
    .replace(/\(.*?\)/g, ' ')                  // remove parentheses content
    .replace(/[^a-z0-9]+/g, ' ')               // replace punctuation with spaces
    .trim()
    .replace(/\s+/g, ' ');                     // collapse multiple spaces
};

// Basic Levenshtein distance
const levenshtein = (a, b) => {
  const matrix = Array.from({ length: b.length + 1 }, (_, i) =>
    Array.from({ length: a.length + 1 }, (_, j) =>
      i === 0 ? j : j === 0 ? i : 0
    )
  );

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + (a[j - 1] === b[i - 1] ? 0 : 1)
      );
    }
  }

  return matrix[b.length][a.length];
};

// Fuzzy comparison after normalization
const fuzzy = (item, brand) => {
  const a = normalize(item);
  const b = normalize(brand);

  // exact match after normalization
  if (a === b) return true;

  // fuzzy similarity threshold (80%)
  const distance = levenshtein(a, b);
  const maxLen = Math.max(a.length, b.length);
  const similarity = 1 - distance / maxLen;

  return similarity >= 0.8;
};

export { fuzzy };