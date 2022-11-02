import {dynamoDBClient} from '../../model';
import { ProductService } from './Product.service'
import stockService from '../Stock';

const productService = new ProductService(dynamoDBClient(), stockService);
export default productService;
