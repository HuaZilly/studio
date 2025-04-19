'use client';

import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SearchBar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      router.push(`/search?q=${searchQuery}`);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search"
        className="bg-background border border-input rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleSearch}
      />
      <Search className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    </div>
  );
};

export default SearchBar;
