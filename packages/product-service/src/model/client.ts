import 'dotenv/config'
import * as AWS from "aws-sdk";
import { DocumentClient } from "aws-sdk/clients/dynamodb";

const isTest = process.env.JEST_WORKER_ID;

export const dynamoDBClient = (): DocumentClient => {
  if (isTest) {
    return new AWS.DynamoDB.DocumentClient({
      endpoint: 'localhost:8000',
      sslEnabled: false,
      region: 'local-env',
    });
  }

  if (process.env.IS_OFFLINE) {
    return new AWS.DynamoDB.DocumentClient({
      region: process.env.DYNAMO_DB_REGION,
      endpoint: process.env.DYNAMO_DB_ENDPOINT,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }
  return new AWS.DynamoDB.DocumentClient();
};
