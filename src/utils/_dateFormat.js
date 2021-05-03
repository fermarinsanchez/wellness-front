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
    return `${year}-${month}-${day}`;
  };