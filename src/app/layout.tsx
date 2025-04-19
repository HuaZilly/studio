import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/cart-context';
import MiniCart from '@/components/minicart';
import { Search } from 'lucide-react';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Code & Couture',
  description: 'Buy and sell code snippets and clothing.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>
          <header className="bg-secondary p-4 flex justify-between items-center">
            <div className="font-bold text-xl">Code & Couture</div> {/* Logo */}
            <div className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-background border border-input rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
              <MiniCart className="ml-4"/>
            </div>
          </header>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
