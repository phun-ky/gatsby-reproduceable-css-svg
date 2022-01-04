export const formatCurrency = (number, locale = 'se', options = {}) => {
  if (!number || typeof number !== 'number') return number;

  options = [
    ...{
      currency: 'SEK',
      currencyDisplay: 'symbol',
      style: 'currency',
      minimumFractionDigits: 0
    },
    ...options
  ];

  return new Intl.NumberFormat(locale, options).format(number);
};
