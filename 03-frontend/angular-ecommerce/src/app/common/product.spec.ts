import { Product } from './product';

describe('Product', () => {
  it('should create an instance', () => {
    expect(new Product('BOOK-TECH-1000', 'C++ - For Beginners', 'Learn C++', 19.99,
     'assets/images/products/placeholder.png', true, 100, new Date('2024-02-15 12:07:23.000000'), new Date('2024-02-15 12:07:23.000000'))).toBeTruthy();
  });
});
