export const _dateFormat = (dateToFormat) => {
  !dateToFormat && new Date();
  const date = new Date(dateToFormat);
  const day =
    date?.getDate() < 10 ? `0${date?.getDate()}` : date?.getDate();
  const month =
    date?.getMonth() + 1 < 10
      ? `0${date?.getMonth() + 1}`
      : date?.getMonth() + 1;
  const year = date?.getFullYear();

  return `${day}/${month}/${year}`;
};

export const _changeUSDate = (str) => {
  let splitted = str.split('/')
  
  return `${splitted[2]}/${splitted[1]}/${splitted[0]}`
}

export const _onlyOneDay = (data, day) => {
  let oneDay = []
  for (let i = 0; i < data.length; i++) {
    if (data[i]?.date === day) {
      oneDay.push(data[i])
    }
  }

  return oneDay
}

// next features: filter data for more detailed Charts

