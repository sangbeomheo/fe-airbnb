import { rest } from 'msw';

import accommodations from './accommodations';

export const handlers = [
  rest.get('/testdata', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(accommodations));
  })
];
