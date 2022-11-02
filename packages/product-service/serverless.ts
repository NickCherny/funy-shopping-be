import type { AWS } from "@serverless/typescript";
import {
  getProductList,
  removeProduct,
  createProduct,
  getProductById,
} from "@functions/index";
import DocumentationModels from '@models/documentation';

const serverlessConfiguration: AWS = {
  service: "product-service",
  frameworkVersion: "3",
  useDotenv: true,
  plugins: [
    "serverless-offline",
    "serverless-esbuild",
    "serverless-dynamodb-local",
    "serverless-dotenv-plugin",
    "serverless-stage-manager",
    "serverless-openapi-documentation",
  ],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    profile: "default",
    region: "eu-west-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      PRODUCTS_TABLE_NAME: '${env:PRODUCTS_TABLE_NAME}',
      STOCKS_TABLE_NAME: '${env:STOCKS_TABLE_NAME}',
    },
    iam: {
      role: {
        statements: [
          {
            Effect: "Allow",
            Action: [
              "dynamodb:Query",
              "dynamodb:Scan",
              "dynamodb:GetItem",
              "dynamodb:PutItem",
              "dynamodb:UpdateItem",
              "dynamodb:DeleteItem"
            ],
            Resource: 'arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/${env:PRODUCTS_TABLE_NAME}',
          },
          {
            Effect: "Allow",
            Action: [
              "dynamodb:Query",
              "dynamodb:Scan",
              "dynamodb:GetItem",
              "dynamodb:PutItem",
              "dynamodb:UpdateItem",
              "dynamodb:DeleteItem"
            ],
            Resource: 'arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/${env:STOCKS_TABLE_NAME}',
          },
        ],
      },
    },
  },
  // import the function via paths
  functions: {
    getProductList,
    removeProduct,
    createProduct,
    getProductById,
  },
  package: { individually: true },
  resources: {
    Resources: {
      ProductTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "ProductTable",
          AttributeDefinitions: [
            {
              AttributeName: "productId",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "productId",
              KeyType: "HASH",
            }
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
      StockTable: {
        Type: "AWS::DynamoDB::Table",
        Properties: {
          TableName: "StockTable",
          AttributeDefinitions: [
            {
              AttributeName: "productId",
              AttributeType: "S",
            },
            {
              AttributeName: "count",
              AttributeType: "N",
            },
          ],
          KeySchema: [
            {
              AttributeName: "productId",
              KeyType: "HASH",
            },
            {
              AttributeName: "count",
              KeyType: "RANGE",
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
    }
  },
  custom: {
    stages: [
      'dev',
      'prod',
      'stag'
    ],
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },
    dynamodb: {
      start: {
        docker: true,
        port: 8000,
        inMemory: true,
        migrate: true,
      },
    },
    documentation: {
      version: '1',
      title: 'product-service',
      description: 'Product service API',
      models: DocumentationModels,
    },
  },
};

module.exports = serverlessConfiguration;
