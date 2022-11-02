import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { parseProductInput } from '@libs/validation';
import productService from '@components/Product'

export const createProduct = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const body = (event.body);
    const data = parseProductInput(body);
    if (data === undefined) {
      return formatJSONResponse({
        status: 400,
        message: 'Invalid product input'
      });
    }
    const productId = await productService.createProduct(data);
    return formatJSONResponse({
      productId
    });
  } catch (e) {
    return formatJSONResponse({
      status: 500,
      message: e
    });
  }
});

export const getProductList = middyfy(async (): Promise<APIGatewayProxyResult> => {
  const products = await productService.getProductList();
  return formatJSONResponse ({
    products
  })
})

export const getProductById = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const productId = event.pathParameters.productId;
  try {
    const product = await productService.getProductById(productId);
    return formatJSONResponse({
      product, productId
    });
  } catch (error) {
    return formatJSONResponse({
      status: 500,
      message: error
    });
  }
});

export const removeProduct = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters.id;
  try {
    const product = await productService.removeProduct(id)
    return formatJSONResponse({
      product, id
    });
  } catch (e) {
    return formatJSONResponse({
      status: 500,
      message: e
    });
  }
})
