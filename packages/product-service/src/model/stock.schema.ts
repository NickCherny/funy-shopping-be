import { JTDDataType } from 'ajv/dist/jtd';

export const StockSchema = {
  properties: {
    productId: {
      type: 'string'
    },
    count: {
      type: 'number'
    }
  }
} as const;

export type Stock = JTDDataType<typeof StockSchema>;
