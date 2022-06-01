import { rest } from 'msw';
import { MILLISECOND_FOR_ONE_DAY } from '@constants/date';

import accommodations from './accommodations';

const getDataToPeriod = (checkin: string, checkout: string) => {
  const [, , checkinDay] = checkin.split('-').map(Number);
  const checkinToTime = new Date(checkin).getTime();
  const checkoutToTime = new Date(checkout).getTime();
  const period = (checkoutToTime - checkinToTime) / MILLISECOND_FOR_ONE_DAY;
  const dataToPeriod = [];

  for (let count = checkinDay - 1; count < period; count += 1) {
    const idx = count % accommodations.length;
    dataToPeriod.push(accommodations[idx]);
  }

  return dataToPeriod;
};

export const handlers = [
  rest.get('/reservation', (req, res, ctx) => {
    const checkin = req.url.searchParams.get('checkin');
    const checkout = req.url.searchParams.get('checkout');
    if (checkin && checkout) {
      const dataToPeriod = getDataToPeriod(checkin, checkout);
      return res(ctx.status(200), ctx.json(dataToPeriod));
    }
    return res(ctx.status(200), ctx.json(accommodations));
  })
];
