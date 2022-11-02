import Ajv from 'ajv/dist/jtd';
import { ProductInput, Product, ProductSchema, ProductInputSchema} from '@models/product.schema';
import { StockSchema } from '@models/stock.schema';

const ajv = new Ajv();

export const validateProductInput = ajv.compile<ProductInput>(ProductInputSchema);
export const parseProductInput = ajv.compileParser<ProductInput>(ProductInputSchema);
export const parseBodyGetProductById = ajv.compileParser<Pick<Product, 'productId'>>({ properties: { productId: ProductSchema.properties.productId } });
export const validateStockInput = ajv.compile(StockSchema);
