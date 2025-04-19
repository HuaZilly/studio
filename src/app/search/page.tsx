'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Product } from '@/services/products';
import { ProductGrid } from '@/components/product-grid';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      // TODO: Replace with actual product fetching logic based on search query
      // This is a placeholder, you'll need to integrate with your data source
      const products: Product[] = [
        {
          id: '1',
          name: 'T-Shirt',
          description: 'A comfortable cotton t-shirt.',
          price: 25,
          imageUrl: 'https://picsum.photos/200/300',
          category: 'clothing',
          attributes: { size: 'M', color: 'blue' },
        },
        {
          id: '2',
          name: 'React Template',
          description: 'A basic React template with routing.',
          price: 50,
          imageUrl: 'https://picsum.photos/200/300',
          category: 'code',
          attributes: { language: 'React', type: 'template' },
        },
      ];

      // Simulate filtering based on the search query
      const filteredResults = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(filteredResults);
    };

    fetchSearchResults();
  }, [query]);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Search Results for "{query}"</h1>
      {searchResults.length > 0 ? (
        <ProductGrid products={searchResults} />
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchPage;
