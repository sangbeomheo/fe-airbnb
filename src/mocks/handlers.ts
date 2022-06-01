import { rest } from 'msw';
import { MILLISECOND_FOR_ONE_DAY } from '@constants/date';

import accommodations from './accommodations';

const getDataForPeriod = (checkin: string, checkout: string) => {
  const [, , checkinDay] = checkin.split('-').map(Number);
  const checkinToTime = new Date(checkin).getTime();
  const checkoutToTime = new Date(checkout).getTime();
  const period = (checkoutToTime - checkinToTime) / MILLISECOND_FOR_ONE_DAY;
  const dataForPeriod = accommodations.map(accommodation => {
    const priceForPeriod = [];

    for (let count = checkinDay - 1; count < period; count += 1) {
      const idx = count % accommodations.length;
      priceForPeriod.push(accommodation.price[idx]);
    }

    return { ...accommodation, price: priceForPeriod };
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
