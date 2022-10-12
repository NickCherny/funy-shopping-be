import { Product } from './Product.types';
import { createRandomProduct } from '../../__mocks__/product.properties';

const products = (new Array(10).fill(null).map(createRandomProduct));

export class ProductService {

  // private Tablename: string = "ProductTable";


  async getProductList(): Promise<Product[]> {
    return products
    // TODO: Return in 4 Task.
    // const products = await this.docClient.scan({
    //   TableName: this.Tablename,
    // }).promise();
    // return products.Items as ProductSchema[];
  }

  async createProduct(product: Product): Promise<Product> {
    products.push(product);
    // await this.docClient.put({
    //   TableName: this.Tablename,
    //   Item: product
    // }).promise()
    return product as Product;
  }

  async getProductById(id: string): Promise<any> {
    return (products as unknown as Product[]).find(currentProduct => currentProduct.id === id);
    // TODO: Return in 4 Task.
    // const product = await this.docClient.get({
    //   TableName: this.Tablename,
    //   Key: {
    //     todosId: id
    //   }
    // }).promise()
    // if (!product.Item) throw new Error("Id does not exit");
    //
    // return product.Item as ProductSchema;
  }

  // async updateProduct(id: string, data: Partial<ProductSchema>): Promise<ProductSchema> {
  //   const updated = await this.docClient
  //     .update({
  //       TableName: this.Tablename,
  //       Key: { productId: id },
  //       UpdateExpression:
  //         "set #status = :status",
  //       ExpressionAttributeNames: {
  //         "#status": "status",
  //       },
  //       ExpressionAttributeValues: {
  //         ":status": true,
  //       },
  //       ReturnValues: "ALL_NEW",
  //     })
  //     .promise();
  //   return updated.Attributes as ProductSchema;
  // }

  // async removeProduct(id: string): Promise<unknown> {
  //   return await this.docClient.delete({
  //     TableName: this.Tablename,
  //     Key: {
  //       productId: id
  //     }
  //   }).promise();
  // }
}
