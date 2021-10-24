export const getPhText = (ph: string) => {
  const num = parseFloat(ph);

  if (num < 7.4 && num > 6.5) {
    return '中性';
  }

  if (num > 7) {
    return '碱性';
  } else {
    return '酸性';
  }
};
