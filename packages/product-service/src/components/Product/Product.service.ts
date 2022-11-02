import { v4 } from "uuid";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { ProductInput, ProductWithCount } from '@models/product.schema';
import { StockServiceInterface } from '@components/Stock';

export class ProductService {
  private Tablename: string = process.env.PRODUCTS_TABLE_NAME;
  private dynamoDbClient: DocumentClient;
  private stockService: StockServiceInterface;

  constructor(client: DocumentClient, stockService: StockServiceInterface) {
    this.dynamoDbClient = client;
    this.stockService = stockService;
  }

  async createProduct({ count, ...otherData }: ProductInput): Promise<string> {
    const productId: string = v4();
    await this.dynamoDbClient.put({
      TableName: this.Tablename,
      Item: {
        ...otherData,
        productId,
      }
    }).promise();
    await this.stockService.addProductToStore({ productId, count });
    return productId;
  }

  async getProductList(): Promise<ProductWithCount[]> {
    const products = (await this.dynamoDbClient.scan({
      TableName: this.Tablename,
    }).promise());
    const result = await Promise.all(products.Items.map(async product => {
      const stocks = await this.stockService.getProductCount(product.productId);
      return {
        ...product,
        count: stocks.reduce((acc, { count }) => acc + count, 0),
      }
    }));
    return result as ProductWithCount[];
  }

  async getProductById(productId: string): Promise<ProductWithCount> {
    const product = await this.dynamoDbClient.get({
      TableName: this.Tablename,
      Key: { productId }
    }).promise()
    if (!product.Item) throw new Error("Id does not exit");
    const stocks = await this.stockService.getProductCount(product.Item.productId);

    return {
      ...product.Item,
      count: stocks.reduce((acc, { count }) => count + acc, 0)
    } as ProductWithCount;
  }


  async removeProduct(productId: string): Promise<unknown> {
    const product = await this.dynamoDbClient.delete({
      TableName: this.Tablename,
      Key: {
        productId
      }
    }).promise();
    await this.stockService.removeProductFromStock(productId, Infinity);
    return product;
  }
}
