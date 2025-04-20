
import Link from 'next/link';
import SearchBar from '@/components/search-bar';
import MiniCart from '@/components/minicart';
import {ShoppingCart} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {CartProvider} from '@/context/cart-context';
import {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Code & Couture',
  description: 'Buy and sell code snippets and clothing.',
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <CartProvider>
          <header className="bg-secondary p-4 flex justify-between items-center">
            <Link href="/" className="font-bold text-xl">
              Code &amp; Couture
            </Link>
            {/* Logo */}
            <SearchBar />
            <div className="flex items-center gap-4">
              <Link href="/checkout">
                <Button variant="outline">Checkout</Button>
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
