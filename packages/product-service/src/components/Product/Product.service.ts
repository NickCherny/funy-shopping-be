import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { Product, WithAvailabilityInStocks } from './Product.types';
import { StockServiceInterface } from '../Stock/Stock.types';

export class ProductService {
  private Tablename: string = 'ProductTable';
  private docClient: DocumentClient;
  private stockService: StockServiceInterface;

  constructor(client: DocumentClient, stockService: StockServiceInterface) {
    this.docClient = client;
    this.stockService = stockService;
  }

  async getProductList(): Promise<WithAvailabilityInStocks<Product>[]> {
    const products = (await this.docClient.scan({
      TableName: this.Tablename,
    }).promise());
    const result = await Promise.all(products.Items.map(async product => {
      const stocks = await this.stockService.getProductStocks(product.productId);
      return {
        ...product,
        count: stocks.reduce((acc, { count }) => acc + count, 0),
      }
    }));
    return result as WithAvailabilityInStocks<Product>[];
  }

  async createProduct(product: Product): Promise<Product> {
    await this.docClient.put({
      TableName: this.Tablename,
      Item: product
    }).promise()
    return product as Product;
  }

  async getProductById(productId: string): Promise<WithAvailabilityInStocks<Product>> {
    const product = await this.docClient.get({
      TableName: this.Tablename,
      Key: { productId }
    }).promise()
    if (!product.Item) throw new Error("Id does not exit");
    const stocks = await this.stockService.getProductStocks(product.Item.productId);
    
    return {
      ...product.Item,
      count: stocks.reduce((acc, { count }) => count + acc, 0)
    } as WithAvailabilityInStocks<Product>;
  }

  async updateProduct(productId: string, data: Partial<Product>): Promise<Product> {
    const updated = await this.docClient
      .update({
        TableName: this.Tablename,
        Key: { productId },
        UpdateExpression: "set price = :price",
        ExpressionAttributeValues: {
          ":price": data.price,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();
    return updated.Attributes as Product;
  }

  async softDelete(productId: string): Promise<Boolean> {
    const product = await this.docClient.update({
      TableName: this.Tablename,
      Key: { productId },
      UpdateExpression: "set isDeleted = :value",
      ExpressionAttributeValues: {
        ':value': true
      },
      ReturnValues: "ALL_NEW",
    }).promise();

    return (product as unknown as Product).isDeleted;
  }

  async removeProduct(productId: string): Promise<unknown> {
    return await this.docClient.delete({
      TableName: this.Tablename,
      Key: {
        productId
      }
    }).promise();
  }
}
