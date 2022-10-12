import { handlerPath } from '@libs/handler-resolver';

export const getProductList = {
  handler: `${handlerPath(__dirname)}/handler.getProductList`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/',
        cors: {

        },
      },
    },
  ],
};

export const createProduct = {
  handler: `${handlerPath(__dirname)}/handler.createProduct`,
  events: [
    {
      http: {
        method: 'post',
        path: 'product',
        cors: true,
      },
    },
  ],
};

export const getProductById = {
  handler: `${handlerPath(__dirname)}/handler.getProductById`,
  events: [
    {
      http: {
        method: 'get',
        path: 'product/{id}',
        cors: true,
      },
    },
  ],
};

export const updateProduct = {
  handler: `${handlerPath(__dirname)}/handler.updateProduct`,
  events: [
    {
      http: {
        method: 'put',
        path: 'product/{id}',
        cors: true,
      },
    },
  ],
};

export const removeProduct = {
  handler: `${handlerPath(__dirname)}/handler.removeProduct`,
  events: [
    {
      http: {
        method: 'delete',
        path: 'product/{id}',
        cors: true,
      },
    },
  ],
};
