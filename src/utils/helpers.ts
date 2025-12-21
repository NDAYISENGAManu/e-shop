export const formatPrice = (price: number): string => {
  const formatted = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price / 100);
  return `${formatted} Rwf `;
};

export const getUniqueValues = (data: any[], type: string) => {
  let unique = data.map((item) => item[type]);
  return ['all', ...new Set(unique)];
};
