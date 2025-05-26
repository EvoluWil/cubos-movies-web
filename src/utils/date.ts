export function isValidDate(dateString: string): boolean {
  if (!dateString) {
    return false;
  }

  const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
  const match = dateString.match(regex);

  if (!match) {
    return false;
  }

  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10);
  const year = parseInt(match[3], 10);

  const dateObject = new Date(year, month - 1, day);

  return (
    dateObject.getMonth() + 1 === month &&
    dateObject.getDate() === day &&
    dateObject.getFullYear() === year
  );
}

export const formatDateToSend = (date: string): string => {
  const [day, month, year] = date.split('/');
  return `${year}-${month}-${day}T03:00:00.000Z`;
};
