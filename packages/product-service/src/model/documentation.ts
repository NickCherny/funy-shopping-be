import { ProductSchema, ProductInputSchema } from './product.schema';
import { NotFoundSchema } from './errors'

export default [
  {
    name: 'NotFoundResponse',
    description: 'Not Found Response Model',
    contentType: 'application/json',
    schema: NotFoundSchema,
  },
  {
    name: 'CreateProductRequest',
    description: 'Product Request Model',
    contentType: 'application/json',
    schema: ProductInputSchema,
  },
  {
    name: 'ProductResponse',
    description: 'Product Response Model',
    contentType: 'application/json',
    schema: ProductSchema,
  },
];
