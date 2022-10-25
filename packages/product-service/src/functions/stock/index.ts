import { handlerPath } from '@libs/handler-resolver';

export const putProductToStock = {
  handler: `${handlerPath(__dirname)}/handler.putProductToStock`,
  events: [
    {
      http: {
        method: 'post',
        path: 'stock/product',
        cors: true,
      },
    }
  ]
}
