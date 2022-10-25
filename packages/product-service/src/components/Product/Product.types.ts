export type Product = {
  productId: string;
  title: string;
  description: string;
  image: string;
  price: number;
  isDeleted: boolean;
  createdAt: string;
}

export type WithAvailabilityInStocks<T> = T & {
  count: number;
}
