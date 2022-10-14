import { faker } from "@faker-js/faker";
import { Product } from "../src/components/Product/Product.types";

export function createRandomProduct(): Product {
  return {
    id: faker.datatype.uuid(),
    title: faker.internet.userName(),
    shortDescription: faker.commerce.product(),
    description: faker.commerce.productDescription(),
    labels: [],
    score: 0,
    isSoftDelete: false,
    createdAt: faker.date.past().toDateString(),
    image: faker.image.cats(),
  };
}
