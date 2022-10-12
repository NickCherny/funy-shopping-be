export type Product = {
  createdAt: string;
  description: string;
  id: string;
  image: string;
  isSoftDelete: boolean;
  labels: string[];
  score: 0 | 1 | 2 | 3 | 4 | 5;
  shortDescription: string;
  title: string;
}
