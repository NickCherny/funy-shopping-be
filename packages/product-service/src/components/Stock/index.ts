import { dynamoDBClient } from '@models/client';
import {StockService} from './Stock.service';

export type { StockServiceInterface } from './Stock.types';

export default new StockService(dynamoDBClient());
