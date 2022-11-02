import * as AWS from 'aws-sdk';

export default {
  setupAWS: () => {
    AWS.config.update(
      process.env.NODE_ENV === 'test'
        ? {
            region: 'mock',
            credentials: {
              accessKeyId: 'accessKeyId',
              secretAccessKey: 'secretAccessKey'
            }
          }
        : {
            credentials: {
              accessKeyId: process.env.AWS_ACCESS_KEY_ID,
              secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
            },
            region: process.env.AWS_REGION
          }
    )
  }
}
