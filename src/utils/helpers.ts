export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price / 100);
};

export const getUniqueValues = (data: any[], type: string) => {
  let unique = data.map((item) => item[type]);
  return ['all', ...new Set(unique)];
};
