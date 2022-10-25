export type Stock = {
    stockId: string;
    productId: string;
    price: number;
    count: number;
}

export interface StockServiceInterface {
    getProductStocks(productId: string): Promise<Stock[]>;
    putProductToStock(productId: string, amount: number): Promise<boolean>;
    removeProductInStock(productId: string, amount: number): Promise<boolean>;
}