import { dynamoDBClient } from '../../model';
import {StockService} from './Stock.service';


export default new StockService(dynamoDBClient());
