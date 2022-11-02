import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { Stock } from '@models/stock.schema';
import { StockServiceInterface } from './Stock.types';

export class StockService implements StockServiceInterface {
  private Tablename: string = process.env.STOCKS_TABLE_NAME;
  private dynamoDbClient: DocumentClient;

  constructor(client: DocumentClient) {
    this.dynamoDbClient = client;
  }

  async getProductCount(productId: string): Promise<Stock[]> {
    const items = await this.dynamoDbClient.query({
      TableName: this.Tablename,
      KeyConditionExpression: 'productId = :productId and count > 0',
      ExpressionAttributeValues: {
        ':productId': productId,
      }
    }).promise();

    return (items.Items as unknown as Stock[]);
  }

 async addProductToStore({ productId, count }: Stock): Promise<boolean> {
     await this.dynamoDbClient.put({
        TableName: this.Tablename,
        Item: {
          productId,
          count,
        }
     }).promise();

     return true;
 }

 async removeProductFromStock(productId: string, amount: number): Promise<boolean> {
     const stocks = await this.getProductCount(productId);
     const count = stocks.reduce((acc, { count }) => count + acc, 0);
     if (count <= amount) {
        await this.dynamoDbClient.delete({
          TableName: this.Tablename,
          Key: {
            productId,
          }
        });
     } else {
        await this.dynamoDbClient.update({
          TableName: this.Tablename,
          Key: { productId },
          UpdateExpression: "set count = :count",
          ExpressionAttributeValues: {
            ":count": count - amount,
          },
          ReturnValues: "ALL_NEW",
        });
     }

     return true;
 }
}
