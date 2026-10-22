// Formats a number as Philippine Peso, e.g. 4495 -> "₱4,495.00"
// (manual grouping instead of Intl so output is identical on every JS engine)
export const formatPrice = (value) => {
  const [whole, cents] = Math.abs(value).toFixed(2).split('.');
  const grouped = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${value < 0 ? '-' : ''}₱${grouped}.${cents}`;
};
