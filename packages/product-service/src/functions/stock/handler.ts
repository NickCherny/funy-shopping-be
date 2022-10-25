import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import stockService from '../../components/Stock';


export const putProductToStock = middyfy(async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { productId, amount } = (event.body as unknown as Record<'productId' | 'amount', string>);
  try {
    const result = await stockService.putProductToStock(productId, Number(amount));
    return formatJSONResponse({
      isAdded: result,
      status: 200,
    })
  } catch (error) {
    return formatJSONResponse({
      status: 500,
      message: error
    });
  }
});
