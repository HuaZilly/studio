/**
 * Represents a product, which can be either clothing or code.
 */
export interface Product {
  /**
   * The unique identifier of the product.
   */
  id: string;
  /**
   * The name of the product.
   */
  name: string;
  /**
   * A description of the product.
   */
  description: string;
  /**
   * The price of the product.
   */
  price: number;
  /**
   * The URL of the product's image.
   */
  imageUrl: string;
  /**
   * The category of the product (e.g., 'clothing', 'code').
   */
  category: string;
  /**
   * Additional attributes specific to the product (e.g., size for clothing, language for code).
   */
  attributes: Record<string, string>;
}

/**
 * Asynchronously retrieves a list of products based on specified filters and sorting criteria.
 *
 * @param filters An object containing filter criteria (e.g., category, price range).
 * @param sortBy  The field to sort the products by (e.g., 'price', 'name').
 * @param sortOrder The order to sort the products in ('asc' for ascending, 'desc' for descending).
 * @returns A promise that resolves to an array of Product objects.
 */
export async function getProducts(
  filters: Record<string, any>,
  sortBy: string,
  sortOrder: 'asc' | 'desc'
): Promise<Product[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      id: '1',
      name: 'T-Shirt',
      description: 'A comfortable cotton t-shirt.',
      price: 25,
      imageUrl: '/images/t-shirt.jpg',
      category: 'clothing',
      attributes: { size: 'M', color: 'blue' },
    },
    {
      id: '2',
      name: 'React Template',
      description: 'A basic React template with routing.',
      price: 50,
      imageUrl: '/images/react-template.jpg',
      category: 'code',
      attributes: { language: 'React', type: 'template' },
    },
  ];
}
