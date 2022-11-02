import { JTDDataType } from 'ajv/dist/jtd';

export const NotFoundSchema = {
  properties: {
    message: {
      type: 'string',
      default: 'Not found'
    },
    status: {
      type: 'int32',
      default: 404
    }
  }
} as const;

export const InvalidProductInputSchema = NotFoundSchema;

export type NotFount = JTDDataType<typeof NotFoundSchema>;
