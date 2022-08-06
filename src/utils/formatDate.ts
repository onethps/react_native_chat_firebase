import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
dayjs.extend(calendar);

export const formatDate = (date: any) => {
  return dayjs(date).calendar(null, {
    sameDay: 'HH:mm',
    lastDay: 'ddd',
    nextDay: 'ddd',
    nextWeek: 'DD/MM',
    lastWeek: 'DD/MM',
    sameElse: 'DD/MM/YY',
  });
};
