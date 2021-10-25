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

export const getPhType = (ph: string) => {
  const num = parseFloat(ph);

  if (num < 7.4 && num > 6.5) {
    return 'normal';
  }

  if (num > 7) {
    return 'alkalinity';
  } else {
    return 'acidity';
  }
};

export const getTempType = (temp: string) => {
  const num = parseFloat(temp);

  if (num < 28 && num > 20) {
    return 'normal';
  }

  if (num >= 28) {
    return 'hot';
  } else {
    return 'cold';
  }
}