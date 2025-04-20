'use client';

import {useCart} from '@/context/cart-context';
import {ShoppingCart} from 'lucide-react';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {Product} from '@/services/products';
import {Button} from '@/components/ui/button';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';

const MiniCart = () => {
  const {items, removeFromCart} = useCart();
  const [cartItems, setCartItems] = useState<
    {product: Product; quantity: number}[]
  >([]);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    // TODO: Replace with actual product fetching logic based on item IDs
    const fetchCartItems = async () => {
      const products: Product[] = [
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
      ];

      const cartDetails = items.map(item => {
        const product = products.find(p => p.id === item.id);
        return product ? {product, quantity: item.quantity} : null;
      }).filter(Boolean) as {product: Product; quantity: number}[];

      setCartItems(cartDetails);
      setTotalItems(items.reduce((acc, item) => acc + item.quantity, 0));
    };

    fetchCartItems();
  }, [items]);

  const handleRemoveFromCart = (id: string) => {
    removeFromCart(id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <ShoppingCart className="h-5 w-5"/>
          <span className="sr-only">Toggle Cart</span>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 rounded-full bg-primary text-primary-foreground px-1 py-0.5 text-xs font-bold">{totalItems}</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80">
        {cartItems.length === 0 ? (
          <DropdownMenuItem className="text-center">Cart is empty</DropdownMenuItem>
        ) : (
          <>
            {cartItems.map(item => (
              <DropdownMenuItem key={item.product.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <img src={item.product.imageUrl} alt={item.product.name} className="w-12 h-12 object-cover rounded"/>
                  <div>
                    <p className="text-sm font-medium">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <Button variant="outline" size="xs" onClick={() => handleRemoveFromCart(item.product.id)}>
                  Remove
                </Button>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem className="flex items-center justify-center">
              <Link href="/cart">
                <Button>View Cart</Button>
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MiniCart;
