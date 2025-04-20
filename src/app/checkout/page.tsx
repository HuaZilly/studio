'use client';

import {useCart} from '@/context/cart-context';
import {Button} from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const CheckoutPage = () => {
  const {items, clearCart} = useCart();

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      // Assuming you have a way to fetch the product price based on item.id
      // Replace this with your actual price fetching logic
      const price = 25; // Example price
      return total + price * item.quantity;
    }, 0);
  };

  const total = calculateTotal();

  const handleCheckout = () => {
    // Implement your checkout logic here, e.g., redirect to a payment gateway
    alert('Checkout initiated! Total: $' + total);
    clearCart();
  };

  return (
    <div className="container mx-auto mt-8">
      <Card className="w-[500px]">
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          <CardDescription>Review your order and proceed to checkout.</CardDescription>
        </CardHeader>
        <CardContent>
          {items.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <ul>
              {items.map((item) => (
                <li key={item.id} className="py-2">
                  {item.id} - Quantity: {item.quantity}
                </li>
              ))}
            </ul>
          )}
          <p className="text-xl font-semibold mt-4">Total: ${total}</p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleCheckout} disabled={items.length === 0}>
            Proceed to Checkout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CheckoutPage;
