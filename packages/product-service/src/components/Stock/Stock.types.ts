import { Stock } from '@models/stock.schema';

export interface StockServiceInterface {
    getProductCount(productId: string): Promise<Stock[]>;
    addProductToStore(payload: Stock): Promise<boolean>;
    removeProductFromStock(productId: string, amount: number): Promise<boolean>;
}
