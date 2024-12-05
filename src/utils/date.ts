import { RESERVATION_DATE_DIFF_LIST } from 'constants/class';

export const formatDate = (date: Date = new Date()): string => {
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
};

export const formatReservationTime = (diff: number, time: string): string => {
  return `${RESERVATION_DATE_DIFF_LIST[diff]} ${time}`;
};
