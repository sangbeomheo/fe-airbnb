const getStringDate = (date: Date, form: string) => {
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  const stringToday = year + form + month + form + day;

  return stringToday;
};

const addCommasToNumber = (number: number) => number.toLocaleString('en');

export { getStringDate, addCommasToNumber };
const fetchData = async (URL: string) => {
  const response = await fetch(URL);
  const data = await response.json();

  return data;
};
