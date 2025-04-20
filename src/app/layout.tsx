'use client';

import type {Metadata} from 'next';
import Link from 'next/link';
import SearchBar from '@/components/search-bar';
import MiniCart from '@/components/minicart';
import {ShoppingCart} from 'lucide-react';
import {CartProvider} from '@/context/cart-context';
import {useState, useEffect} from 'react';

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <CartProvider>
          <header className="bg-secondary p-4 flex justify-between items-center">
            <Link href="/" className="font-bold text-xl">
              Code &amp; Couture {/* Replace with actual logo component if needed */}
            </Link>
            <SearchBar />
            <div className="flex items-center gap-4">
              <Link href="/cart">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Checkout
              </Link>
              <MiniCart />
            </div>
          </header>
          {children}
        </CartProvider>
        </body>
    </html>
  );
}
