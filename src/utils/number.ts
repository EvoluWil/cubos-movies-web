export const formatNumber = (value: number): string => {
  if (isNaN(value)) {
    return '0';
  }

  return Intl.NumberFormat('pt-BR', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatCurrency = (value: number): string => {
  if (isNaN(value)) {
    return '$ 0,00';
  }

  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
