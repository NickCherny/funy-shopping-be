import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
// import { v4 } from "uuid";
import productService from '../../components/Product'
// import ProductSchema from "../../components/Product/Product.schema";

export const getProductList = middyfy(async (): Promise<APIGatewayProxyResult> => {
  const products = await productService.getProductList();
  return formatJSONResponse ({
    products
  })
})

// export const createProduct = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
//   try {
//     const id = v4();
//     const product = await productService.createProduct({
//       id,
//       title: event.body.title,
//       description: event.body.description,
//       shortDescription: event.body.shortDescription,
//       createdAt: new Date().toISOString(),
//       isSoftDelete: false,
//       labels: [],
//       score: 1
//     });
//
//     return formatJSONResponse({
//       product
//     });
//   } catch (e) {
//     return formatJSONResponse({
//       status: 500,
//       message: e
//     });
//   }
// });

export const getProductById = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters.id;
  try {
    const product = await productService.getProductById(id);
    return formatJSONResponse({
      product, id
    });
  } catch (error) {
    return formatJSONResponse({
      status: 500,
      message: error
    });
  }
});

// export const updateProduct = middyfy(async (event): Promise<APIGatewayProxyResult> => {
//   const id = event.pathParameters.id;
//   try {
//     const todo = await productService.updateProduct(id, event.body as ProductSchema)
//     return formatJSONResponse({
//       todo, id
//     });
//   } catch (e) {
//     return formatJSONResponse({
//       status: 500,
//       message: e
//     });
//   }
// });
//
// export const removeProduct = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
//   const id = event.pathParameters.id;
//   try {
//     const product = await productService.removeProduct(id)
//     return formatJSONResponse({
//       product, id
//     });
//   } catch (e) {
//     return formatJSONResponse({
//       status: 500,
//       message: e
//     });
//   }
// })
