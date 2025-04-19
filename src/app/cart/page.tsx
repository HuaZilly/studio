'use client';

import {useCart} from '@/context/cart-context';
import {useEffect, useState} from 'react';
import {Product} from '@/services/products';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {ShoppingCart} from 'lucide-react';
import {useToast} from '@/hooks/use-toast';

const CartPage = () => {
  const {items, removeFromCart} = useCart();
  const [cartItems, setCartItems] = useState<
    {product: Product; quantity: number}[]
  >([]);
  const {toast} = useToast();

  useEffect(() => {
    const fetchCartItems = async () => {
      // TODO: Replace with actual product fetching logic based on item IDs
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
    };

    fetchCartItems();
  }, [items]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;

  const handleRemoveFromCart = (id: string) => {
    removeFromCart(id);
    toast({
      title: 'Item removed',
      description: 'Successfully removed item from cart.',
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Your cart is empty</CardTitle>
            <CardDescription>
              Looks like you haven&apos;t added anything to your cart yet.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Browse our products and add them to your cart to proceed to
              checkout.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Shopping Cart</CardTitle>
          <CardDescription>Review your cart items and proceed to checkout.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul>
            {cartItems.map(item => (
              <li key={item.product.id} className="mb-4 p-4 border rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="rounded-md shadow-md w-full h-32 object-cover"
                  />
                  <div className="md:col-span-2">
                    <h3 className="text-xl font-semibold">{item.product.name}</h3>
                    <p className="text-gray-600">{item.product.description}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-semibold">
                        Price: ${item.product.price}
                      </span>
                      <span className="text-gray-600">Quantity: {item.quantity}</span>
                    </div>
                    <Button
                      onClick={() => handleRemoveFromCart(item.product.id)}
                      variant="outline"
                      size="sm"
                      className="mt-4"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping:</span>
              <span>${shipping}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Total:</span>
              <span>${total}</span>
            </div>
            <Link href="/checkout">
              <Button className="w-full">
                Proceed to Checkout
                <ShoppingCart className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CartPage;

    