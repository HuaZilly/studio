'use client';

import {Product} from '@/services/products';
import {useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {ShoppingCart} from "lucide-react";

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
      <Card>
        <CardHeader>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>{product.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <img src={product.imageUrl} alt={product.name} className="rounded-md shadow-md" />
            <div>
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
              <Button>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
'
