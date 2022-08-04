import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
dayjs.extend(calendar);

export const formatDate = (date: any) => {
  return dayjs(date).calendar(null, {
    sameDay: 'HH:mm',
    nextDay: 'ddd',
    nextWeek: 'DD/MM',
    nextYear: 'DD/MM/YY',
    sameElse: 'DD/MM/YY',
  });
};
