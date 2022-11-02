import * as dotenv from 'dotenv';
import * as aws from 'aws-sdk';

dotenv.config();

const productTable = process.env.PRODUCTS_TABLE_NAME;
const stockTable = process.env.STOCKS_TABLE_NAME;

const putProducts = async () => {
  return await dynamoDbClient.batchWrite({
    RequestItems: {
      [productTable]: [
        {
          PutRequest: {
            Item: {
              "productId": "7567ec4b-b10c-48c5-9345-fc73c48a802a",
              "title": "Tiptop Audio Mantis Black",
              "description": "Eurorack Housing",
              "price": 342.60,
            },
          },
        },
        {
          PutRequest: {
            Item: {
              "productId": "7567ec4b-b10c-48c5-9345-fc73c48a8011",
              "title": "Intellijel Designs Palette 62 4U",
              "description": "2x Connections for audio in/out modules (6.3 mm TRS)",
              "price": 312.40,
            },
          },
        },
        {
          PutRequest: {
            Item: {
              "productId": "7567ec4b-b10c-48c5-9345-fc73c48a8000",
              "title": "Erica Synths Eurorack Alu Travel Case PSU",
              "description": "Sturdy and portable 6 U 208 HP Eurorack case in case shape",
              "price": 679.39,
            },
          },
        }
      ]
    }
  }).promise();
}

const addProductsToStock = async () => {
  return await dynamoDbClient.batchWrite({
    RequestItems: {
      [stockTable]: [
        {
          PutRequest: {
            Item: {
              "productId": "7567ec4b-b10c-48c5-9345-fc73c48a802a",
              "count": 2,
            },
          },
        },
        {
          PutRequest: {
            Item: {
              "productId": "7567ec4b-b10c-48c5-9345-fc73c48a8011",
              "count": 100
            },
          },
        },
      ]
    }
  }).promise();
}

const dynamoDbClient = new aws.DynamoDB.DocumentClient({
  region: 'eu-west-1',
});

(async () => {
  try {
    const result = await Promise.all([putProducts(), addProductsToStock()]);
    console.log(result);
  }catch (e) {
    console.error(e);
  }
})();
