'use client';

import {ProductGrid} from '@/components/product-grid';
import {SidebarComponent} from '@/components/sidebar';
import {Toaster} from '@/components/ui/toaster';
import {useEffect, useState} from 'react';
import { Product } from '@/services/products';

export default function Home() {
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      // TODO: actually call the getProducts service
      setProducts([
        {
          id: '1',
          name: 'T-Shirt',
          description: 'A comfortable cotton t-shirt.',
          price: 25,
          imageUrl: 'https://picsum.photos/200/300',
          category: 'clothing',
          attributes: {size: 'M', color: 'blue'},
        },
        {
          id: '2',
          name: 'React Template',
          description: 'A basic React template with routing.',
          price: 50,
          imageUrl: 'https://picsum.photos/200/300',
          category: 'code',
          attributes: {language: 'React', type: 'template'},
        },
      ]);
    };

    fetchProducts();
  }, [filters, sortBy, sortOrder]);

  return (
    <div className="flex h-full">
      <SidebarComponent
        filters={filters}
        setFilters={setFilters}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <ProductGrid products={products} filters={filters} sortBy={sortBy} sortOrder={sortOrder} />
      <Toaster />
    </div>
  );
}
