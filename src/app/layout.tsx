'use client';

import {CartProvider} from '@/context/cart-context';
import Link from 'next/link';
import SearchBar from '@/components/search-bar';
import {useState, useEffect} from 'react';
import MiniCart from '@/components/minicart';

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <CartProvider>
          <header className="bg-secondary p-4 flex justify-between items-center">
            <Link href="/" className="font-bold text-xl">
              Code &amp; Couture
            </Link>
            <SearchBar />
            <div className="flex items-center gap-4">
              <MiniCart />
            </div>
          </header>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
