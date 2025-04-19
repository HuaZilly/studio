import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/context/cart-context';
import MiniCart from '@/components/minicart';

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
          <header className="bg-secondary p-4 flex justify-end">
            <MiniCart/>
          </header>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
