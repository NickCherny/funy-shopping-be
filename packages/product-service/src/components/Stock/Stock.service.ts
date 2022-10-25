import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { Stock, StockServiceInterface } from './Stock.types';

export class StockService implements StockServiceInterface {
  private Tablename: string = 'ProductTable';
  private docClient: DocumentClient;

  constructor(client: DocumentClient) {
    this.docClient = client;
  }

  async getProductStocks(productId: string): Promise<Stock[]> {
    const items = await this.docClient.query({
      TableName: this.Tablename,
      KeyConditionExpression: 'productId = :productId and count > 0',
      ExpressionAttributeValues: {
        ':productId': productId,
      }
    }).promise();

    return (items.Items as unknown as Stock[]);
  }

 async putProductToStock(productId: string, amount: number): Promise<boolean> {
     await this.docClient.put({
        TableName: this.Tablename,
        Item: {
          productId,
          count: amount,
        }
     }).promise();

     return true;
 }

 async removeProductInStock(productId: string, amount: number): Promise<boolean> {
     const stocks = await this.getProductStocks(productId);
     const count = stocks.reduce((acc, { count }) => count + acc, 0);
     const isOver = count <= amount;
     if (isOver) {
        await this.docClient.delete({
          TableName: this.Tablename,
          Key: {
            productId,
          }
        });
     } else {
        await this.docClient.update({
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
