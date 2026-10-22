// Formats a number as a currency string, e.g. 89.5 -> "$89.50"
export const formatPrice = (value) => `$${value.toFixed(2)}`;
