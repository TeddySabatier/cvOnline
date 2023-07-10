export const getDateFromEuropeanString = (date) => {
  // console.log('[getDateFromEuropeanString] Date',date)
  if (!date)
    return 'Invalid Date';
  const dateArray = date.split('/');
  if (dateArray.length !== 3) {
    alert('Date non valide');
    return 'Invalid Date';
  }

  return new Date(dateArray[2], dateArray[1], dateArray[0]);
}
export const getStringDate = (date) => {
  if (date === 'Invalid Date')
    return '';
  // console.log('[getStringDate]',{date, output: date.toLocaleString(localStorage.getItem('languageSelectedCv') === 'en' ? 'en-GB': 'fr-FR')})
  return date.toLocaleString(localStorage.getItem('languageSelectedCv') === 'en' ? 'en-GB' : 'fr-FR').slice(0, 10);
}

export const numberMonth = (duration) => {
  const monthDuration = 30 * 24 * 3600 * 1000;
  return Math.round(duration / monthDuration)
}
export const numberWeek = (duration) => {
  const weekDuration = 7 * 24 * 3600 * 1000;
  return Math.round(duration / weekDuration)
}
export const numberDay = (duration) => {
  const dayDuration = 30 * 24 * 3600 * 1000;
  return Math.round(duration / dayDuration)
}

export const monthDiff = (d1, d2) => {
  return numberMonth(Math.abs(d1.getTime() - d2.getTime()));
}

export const weekDiff = (d1, d2) => {
  return numberWeek(Math.abs(d1.getTime() - d2.getTime()));
}

export const dayDiff = (d1, d2) => {
  return numberDay(Math.abs(d1.getTime() - d2.getTime()));
}


export const getDurationDiff = (d1, d2) => {
  const month = monthDiff(d1, d2);
  if (month > 0) {
    return { value: month, unit: 'month' };
  }
  const week = weekDiff(d1, d2);
  if (week > 0) {
    return { value: week, unit: 'week' };
  }
  const day = dayDiff(d1, d2);
  if (day > 0) {
    return { value: day, unit: 'day' };
  }
  console.log('getDurationDiff', { month, week, day })
  return { unit: 'untreated' };
}
/**
 * 
 * @param {*} datesArray [{dateStart, dateEnd}]
 * @returns 
 */
export const getDurationDiffArray = (datesArray) => {
  if (datesArray.some(d => Object.values(d).reduce((datesFormated, date) => [...datesFormated, new Date(date)], []).length !== 2))
    return { unit: 'untreated' };

  const totalDuration = datesArray.reduce((total, dates) => {
    const datesPair = Object.values(dates).reduce((datesFormated, date) => {
      return [...datesFormated, new Date(getDateFromEuropeanString(date))]
    }, []);
    return total + Math.abs(datesPair[0].getTime() - datesPair[1].getTime())
  }, 0);


  const month = numberMonth(totalDuration);
  if (month > 0) {
    return { value: month, unit: 'month' };
  }
  const week = numberWeek(totalDuration);
  if (week > 0) {
    return { value: week, unit: 'week' };
  }
  const day = numberDay(totalDuration);
  if (day > 0) {
    return { value: day, unit: 'day' };
  }
  console.log('getDurationDiff', { month, week, day, totalDuration })
  return { unit: 'untreated' };
}