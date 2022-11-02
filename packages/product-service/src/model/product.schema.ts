import { JTDDataType } from 'ajv/dist/jtd';

export const ProductSchema = {
  properties: {
    productId: {
      type: 'string'
    },
    title: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    price: {
      type: 'number',
      default: 0,
      minimum: 0,
    },
  },
} as const;

export const ProductInputSchema = {
  properties: {
    title: ProductSchema.properties.title,
    description: ProductSchema.properties.description,
    price: ProductSchema.properties.price,
    count: {
      type: 'int32',
      default: 1,
      minimum: 1
    }
  },
} as const;

export type Product = JTDDataType<typeof ProductSchema>;
export type ProductWithCount = Product & { count: number }
export type ProductInput = JTDDataType<typeof ProductInputSchema>;
