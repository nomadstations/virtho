import React from 'react';
import { ShoppingBag } from 'lucide-react';
import ContentSection from './ContentSection';
import MarketplaceProductCard from './MarketplaceProductCard';

const mockProducts = [
  {
    id: 'prod_1',
    title: 'Premium UI Kit - SaaS Dashboard',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    mockCategory: 'Design Assets',
    mockRating: 5,
    mockReviews: 124,
    purchasable: true,
    ribbon_text: 'Best Seller',
    variants: [{
      id: 'var_1',
      price_in_cents: 4900,
      price_formatted: '$49.00',
      sale_price_in_cents: null,
      inventory_quantity: 999,
      manage_inventory: false
    }]
  },
  {
    id: 'prod_2',
    title: 'React Components Library Pro',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    mockCategory: 'Code Templates',
    mockRating: 4,
    mockReviews: 89,
    purchasable: true,
    variants: [{
      id: 'var_2',
      price_in_cents: 12900,
      price_formatted: '$129.00',
      sale_price_in_cents: 9900,
      sale_price_formatted: '$99.00',
      inventory_quantity: 999,
      manage_inventory: false
    }]
  },
  {
    id: 'prod_3',
    title: 'Notion Life Planner Template',
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&q=80',
    mockCategory: 'Productivity',
    mockRating: 5,
    mockReviews: 342,
    purchasable: true,
    variants: [{
      id: 'var_3',
      price_in_cents: 1900,
      price_formatted: '$19.00',
      sale_price_in_cents: null,
      inventory_quantity: 999,
      manage_inventory: false
    }]
  }
];

function LatestMarketplace() {
  return (
    <ContentSection 
      title="Trending in Marketplace"
      icon={ShoppingBag}
      items={mockProducts}
      viewAllLink="/marketplace"
      className="bg-gray-50 border-y border-gray-100"
      renderItem={(product) => <MarketplaceProductCard product={product} index={0} />}
    />
  );
}

export default LatestMarketplace;