import { handlerPath } from '@libs/handler-resolver';

export const createProduct = {
  handler: `${handlerPath(__dirname)}/handler.createProduct`,
  events: [
    {
      http: {
        method: 'post',
        path: 'product',
        cors: true,
        documentation: {
          summary: 'Create product',
          description: 'Take product input, put it in db and return result productId',
          requestBody: {
            description: 'A product',
          },
          methodResponses: [
            {
              statusCode: 200,
              requestModels: {
                'application/json': "CreateProductRequest",
              },
              responseBody: {
                description: 'Return product id',
              },
              responseModels: {
                "application/json": "ProductResponse",
              },
            },
          ],
        },
      },
    },
  ],
};

export const getProductList = {
  handler: `${handlerPath(__dirname)}/handler.getProductList`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/',
        cors: true,
        documentation: {
          summary: 'Get list of products',
          description: 'Return whole list of available products',
          methodResponses: [
            {
              statusCode: 200,
              responseBody: {
                description: 'Get all products',
              },
              responseModels: {
                "application/json": "ProductsResponse",
              }
            },
          ],
        },
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
        documentation: {
          summary: 'Get product by product ID',
          description: 'Provide productId as a path params',
          pathParams: {
            name: 'productId',
            description: 'Product ID to search'
          },
          methodResponses: [
            {
              statusCode: 200,
              responseBody: {
                description: 'Found product',
              },
              responseModels: {
                "application/json": "ProductResponse",
              }
            },
            {
              statusCode: 404,
              responseBody: {
                description: 'Product not found',
              },
              responseModels: {
                "application/json": "NotFoundResponse"
              }
            }
          ]
        }
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
        path: 'product/{productId}',
        cors: true,
        documentation: {
          summary: 'Delete current product',
          description: 'Take product id and if product exist delete it',
          pathParams: {
            name: 'productId',
            description: 'Product ID to search',
            schema: {
              type: 'string'
            }
          },
          methodResponses: [
            {
              statusCode: 200,
              requestModels: {
                'application/json': "DeleteProductRequest",
              },
              responseBody: {
                description: 'Return deleted product',
              },
              responseModels: {
                "application/json": "ProductResponse",
              },
            },
          ],
        },
      },
    },
  ],
};
