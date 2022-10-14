import productService from './index';

const mockProduct = {"createdAt": "Sun Jul 17 2022", "description": "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit", "id": "e299f358-fe09-4771-bcb1-65a7b62e2298", "image": "https://loremflickr.com/640/480/cats", "isSoftDelete": false, "labels": [], "score": 0, "shortDescription": "Bacon", "title": "Helene68"}

jest.mock('../../../__mocks__/product.properties', () => ({
  createRandomProduct: () => ({"createdAt": "Sun Jul 17 2022", "description": "Carbonite web goalkeeper gloves are ergonomically designed to give easy fit", "id": "e299f358-fe09-4771-bcb1-65a7b62e2298", "image": "https://loremflickr.com/640/480/cats", "isSoftDelete": false, "labels": [], "score": 0, "shortDescription": "Bacon", "title": "Helene68"}),
}));

describe('Given ProductService',  () => {
  it('And get whole products, should match',  async () => {
    const result = await productService.getProductList();
    expect(result)
      .toEqual(expect.arrayContaining((new Array(10)).fill(mockProduct)));
  });

  it('And get current product by id, should return the product',  async () => {
    const product = await productService.getProductById('e299f358-fe09-4771-bcb1-65a7b62e2298');
    expect(product).toMatchObject(mockProduct);
  })
});
