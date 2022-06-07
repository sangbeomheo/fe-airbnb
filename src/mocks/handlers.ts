import { rest } from 'msw';
import { MILLISECOND_FOR_ONE_DAY } from '@/constants';
import accommodations from './accommodations';

const getDataForPeriod = (checkin: string, checkout: string) => {
  const [, , checkinDay] = checkin.split('-').map(Number);
  const checkinToTime = new Date(checkin).getTime();
  const checkoutToTime = new Date(checkout).getTime();
  const period = (checkoutToTime - checkinToTime) / MILLISECOND_FOR_ONE_DAY;
  const dataForPeriod = accommodations.map(accommodation => {
    const pricesForPeriod = [];

    for (let count = 0; count < period; count += 1) {
      const idx = Number(`${checkinDay + count}`.slice(-1));
      pricesForPeriod.push(accommodation.price[idx]);
    }

    return { ...accommodation, price: pricesForPeriod };
  });

  return dataForPeriod;
};

export const handlers = [
  rest.get('/reservation', (req, res, ctx) => {
    const checkin = req.url.searchParams.get('checkin');
    const checkout = req.url.searchParams.get('checkout');

    if (checkin && checkout) {
      const dataForPeriod = getDataForPeriod(checkin, checkout);
      return res(ctx.status(200), ctx.json(dataForPeriod));
    }

    return res(ctx.status(200), ctx.json(accommodations));
  })
];
