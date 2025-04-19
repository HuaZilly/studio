'use client';

import {useCart} from '@/context/cart-context';
import {ShoppingCart} from 'lucide-react';
import Link from 'next/link';

const MiniCart = () => {
  const {items} = useCart();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Link href="/cart" className="flex items-center space-x-2">
      <ShoppingCart className="h-5 w-5" />
      <span>{totalItems}</span>
    </Link>
  );
};

export default MiniCart;
