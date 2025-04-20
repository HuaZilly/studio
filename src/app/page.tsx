'use client';

import {ProductGrid} from '@/components/product-grid';
import {SidebarComponent} from '@/components/sidebar';
import {Toaster} from '@/components/ui/toaster';
import {useEffect, useState} from 'react';
import {Product} from '@/services/products';
import {Button} from '@/components/ui/button';
import Link from 'next/link';

const categories = [
  {name: 'TV & Audio', imageUrl: 'https://picsum.photos/100/100'},
  {name: 'Fridges & Freezers', imageUrl: 'https://picsum.photos/100/100'},
  {name: 'Laundry', imageUrl: 'https://picsum.photos/100/100'},
  {name: 'Small Appliances', imageUrl: 'https://picsum.photos/100/100'},
  {name: 'Cooking & Heating', imageUrl: 'https://picsum.photos/100/100'},
  {name: 'Furniture & Bedding', imageUrl: 'https://picsum.photos/100/100'},
  {name: 'Ovens', imageUrl: 'https://picsum.photos/100/100'},
  {name: 'Cooktops', imageUrl: 'https://picsum.photos/100/100'},
  {name: 'Dishwashers', imageUrl: 'https://picsum.photos/100/100'},
  {name: 'Vacuums', imageUrl: 'https://picsum.photos/100/100'},
];

const trendingOffers = [
  {
    title: 'Red Hot Deals',
    description: 'Save on a range of products',
    imageUrl: 'https://picsum.photos/300/200',
    link: '#',
  },
  {
    title: 'Shop with humm',
    description: 'Get $300',
    imageUrl: 'https://picsum.photos/300/200',
    link: '#',
  },
  {
    title: 'Cashback $600',
    description: 'On selected washing machines',
    imageUrl: 'https://picsum.photos/300/200',
    link: '#',
  },
  {
    title: 'Making Movie Nights',
    description: 'Enjoy home theatre',
    imageUrl: 'https://picsum.photos/300/200',
    link: '#',
  },
];

const featuredBrands = [
  {name: 'Westinghouse', imageUrl: 'https://picsum.photos/50/30'},
  {name: 'LG', imageUrl: 'https://picsum.photos/50/30'},
  {name: 'Fisher & Paykel', imageUrl: 'https://picsum.photos/50/30'},
  {name: 'Samsung', imageUrl: 'https://picsum.photos/50/30'},
  {name: 'Hisense', imageUrl: 'https://picsum.photos/50/30'},
  {name: 'Asko', imageUrl: 'https://picsum.photos/50/30'},
  {name: 'Beko', imageUrl: 'https://picsum.photos/50/30'},
  {name: 'Electrolux', imageUrl: 'https://picsum.photos/50/30'},
  {name: 'Simpson', imageUrl: 'https://picsum.photos/50/30'},
  {name: 'Panasonic', imageUrl: 'https://picsum.photos/50/30'},
  {name: 'Haier', imageUrl: 'https://picsum.photos/50/30'},
  {name: 'Smeg', imageUrl: 'https://picsum.photos/50/30'},
];

const shopGifts = [
  {title: 'Gifts Under $200', link: '#'},
  {title: 'Gifts Under $300', link: '#'},
  {title: 'Gifts Under $400', link: '#'},
  {title: 'Gifts Under $500', link: '#'},
];

const inspiredSections = [
  {
    title: 'Hot Deals',
    description: 'Final days bonus',
    imageUrl: 'https://picsum.photos/150/100',
    link: '#',
  },
  {
    title: 'Promotions & Redemptions',
    description: 'Bonus cashback',
    imageUrl: 'https://picsum.photos/150/100',
    link: '#',
  },
  {
    title: 'Store Locator',
    description: 'Easy navigation',
    imageUrl: 'https://picsum.photos/150/100',
    link: '#',
  },
  {
    title: 'Product Tips & Tricks',
    description: 'Final days bonus',
    imageUrl: 'https://picsum.photos/150/100',
    link: '#',
  },
];

export default function Home() {
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>] = useState<'asc' | 'desc'>('asc');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      // TODO: actually call the getProducts service
      setProducts([
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
      ]);
    };

    fetchProducts();
  }, [filters, sortBy, sortOrder]);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Mother's Day Gift Guide</h1>
          <p className="text-lg">Find the perfect gift for mom</p>
          <Button className="mt-4">Shop Now</Button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-8">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {categories.map(category => (
              <Link href="#" key={category.name} className="text-center">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-24 h-24 object-cover rounded-md mx-auto"
                />
                <p className="mt-2">{category.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Offers Section */}
      <section className="py-8">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Trending Offers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trendingOffers.map(offer => (
              <div key={offer.title} className="border rounded-md overflow-hidden">
                <img src={offer.imageUrl} alt={offer.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold">{offer.title}</h3>
                  <p className="text-sm text-muted-foreground">{offer.description}</p>
                  <Link href={offer.link} className="text-primary">
                    Shop Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Brands Section */}
      <section className="py-8">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Featured Brands</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-4">
            {featuredBrands.map(brand => (
              <img
                key={brand.name}
                src={brand.imageUrl}
                alt={brand.name}
                className="w-full h-12 object-contain opacity-75 hover:opacity-100"
              />
            ))}
          </div>
          <Link href="#" className="text-primary block mt-4 text-center">
            View All Brands
          </Link>
        </div>
      </section>

      {/* Shop Gifts Section */}
      <section className="py-8">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Shop Gifts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {shopGifts.map(gift => (
              <Link
                key={gift.title}
                href={gift.link}
                className="bg-primary text-primary-foreground text-center py-4 rounded-md"
              >
                {gift.title}
              </Link>
            ))}
          </div>
          <Link href="#" className="text-primary block mt-4 text-center">
            View All Gifts
          </Link>
        </div>
      </section>

      {/* Get Inspired Section */}
      <section className="py-8">
        <div className="container mx-auto">
          <h2 className="text-2xl font-semibold mb-4">Get Inspired</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {inspiredSections.map(section => (
              <div key={section.title} className="border rounded-md overflow-hidden">
                <img src={section.imageUrl} alt={section.title} className="w-full h-32 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold">{section.title}</h3>
                  <p className="text-sm text-muted-foreground">{section.description}</p>
                  <Link href={section.link} className="text-primary">
                    Shop Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Toaster />
    </div>
  );
}
