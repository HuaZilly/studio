import {Product} from '@/services/products';
import {useEffect, useState} from 'react';
import {cn} from "@/lib/utils";

interface ProductGridProps {
  filters: Record<string, any>;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export const ProductGrid = ({filters, sortBy, sortOrder}: ProductGridProps) => {
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
    <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map(product => (
        <div key={product.id} className="relative rounded-lg border bg-card text-card-foreground shadow-sm">
          <img src={product.imageUrl} alt={product.name} className="aspect-square h-auto w-full rounded-md object-cover" />
          <div className="p-4">
            <h3 className="font-semibold">{product.name}</h3>
            <p className="text-sm text-muted-foreground">{product.description}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm">Price: ${product.price}</span>
              <span className="text-sm text-muted-foreground">Category: {product.category}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
