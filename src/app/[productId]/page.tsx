'use client';

import {Product} from '@/services/products';
import {useEffect, useState} from 'react';
import {useParams} from 'next/navigation';

export default function ProductPage() {
  const [product, setProduct] = useState<Product | null>(null);
  const {productId} = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      // TODO: actually call the getProduct service with productId
      setProduct({
        id: '1',
        name: 'T-Shirt',
        description: 'A comfortable cotton t-shirt.',
        price: 25,
        imageUrl: 'https://picsum.photos/200/300',
        category: 'clothing',
        attributes: {size: 'M', color: 'blue'},
      });
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img src={product.imageUrl} alt={product.name} className="rounded-lg shadow-md" />
        <div>
          <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-semibold mb-4">Price: ${product.price}</p>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Attributes:</h2>
            <ul>
              {Object.entries(product.attributes).map(([key, value]) => (
                <li key={key} className="text-gray-600">
                  {key}: {value}
                </li>
              ))}
            </ul>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
'