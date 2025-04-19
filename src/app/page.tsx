'use client';

import {ProductGrid} from '@/components/product-grid';
import {SidebarComponent} from '@/components/sidebar';
import {Toaster} from '@/components/ui/toaster';
import {useState} from 'react';

export default function Home() {
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  return (
    <div className="flex h-full">
      <SidebarComponent
        filters={filters}
        setFilters={setFilters}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <ProductGrid filters={filters} sortBy={sortBy} sortOrder={sortOrder} />
      <Toaster />
    </div>
  );
}
