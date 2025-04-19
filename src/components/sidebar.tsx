import {useState} from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {Icons} from '@/components/icons';
import {Button} from '@/components/ui/button';
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {cn} from "@/lib/utils";

interface SidebarProps {
  filters: Record<string, any>;
  setFilters: (filters: Record<string, any>) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (sortOrder: 'asc' | 'desc') => void;
}

export const SidebarComponent = ({filters, setFilters, sortBy, setSortBy, sortOrder, setSortOrder}: SidebarProps) => {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <SidebarTrigger>
            <Icons.filter className="mr-2 h-4 w-4"/>
          </SidebarTrigger>
          <h4 className="font-semibold">Filters & Sorting</h4>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="justify-start w-full">
                  Category: {filters.category || 'All'}
                  <Icons.chevronDown className="ml-auto h-4 w-4"/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem onClick={() => setFilters({...filters, category: undefined})}>
                  All
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilters({...filters, category: 'clothing'})}>
                  Clothing
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilters({...filters, category: 'code'})}>
                  Code
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarGroup>
          <SidebarGroup>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="justify-start w-full">
                  Sort By: {sortBy} ({sortOrder})
                  <Icons.chevronDown className="ml-auto h-4 w-4"/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem onClick={() => setSortBy('name')}>Name</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortBy('price')}>Price</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
                  Sort Order: {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <Button variant="primary" className="w-full">
            Apply Filters
          </Button>
        </SidebarFooter>
      </Sidebar>
    </SidebarProvider>
  );
};
