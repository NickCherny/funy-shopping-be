export default {
    ProductTable: {
      Type: "AWS::DynamoDB::Table",
      Properties: {
        TableName: "ProductTable",
        AttributeDefinitions: [
          {
            AttributeName: "productId",
            AttributeType: "S",
          },
          {
            AttributeName: "count",
            AttributeType: "N",
          }
        ],
        KeySchema: [
          {
            AttributeName: "productId",
            KeyType: "HASH",
          },
          {
            AttributeName: "count",
            KeyType: "RANGE",
          }
        ],
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1,
        },
      
        GlobalSecondaryIndexes: [
          {
            IndexName: "PkStIndex",
            KeySchema: [
                {
                  AttributeName: "productId", 
                  KeyType: "HASH"
                }
            ],
            Projection: {
                "ProjectionType": "ALL"
            },
            ProvisionedThroughput: {
                "ReadCapacityUnits": 1,
                "WriteCapacityUnits": 1,
            }
        }]
      },
    },
  }