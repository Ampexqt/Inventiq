import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, SearchX, Package, Plus } from 'lucide-react';

/* 
 * =========================================================
 * PRODUCT GRID COMPONENT
 * =========================================================
 * This component displays the list of all available products
 * on the left side of the Point of Sale screen. 
 * Users can search and click "Add to Cart".
 */

// We define our Product shape so TypeScript knows what fields exist
interface Product {
  product_id: number;
  product_name: string;
  price: number;
  stock_quantity: number;
}

interface ProductGridProps {
  filteredProducts: Product[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addToCart: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  filteredProducts,
  searchQuery,
  setSearchQuery,
  addToCart
}) => {
  return (
    <div className="flex-1 flex flex-col min-h-[500px] lg:min-h-0 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      
      {/* Header section showing how many items match the search */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h2 className="font-semibold text-slate-700">Product Catalog</h2>
        <div className="text-xs font-medium text-slate-500 bg-slate-200/50 px-2.5 py-1 rounded-full">
          {filteredProducts.length} items
        </div>
      </div>
      
      {/* Search Input Box */}
      <div className="p-4 border-b border-slate-100 bg-white">
          <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <Input 
            type="search" 
            placeholder="Search products..." 
            className="w-full bg-slate-50 border-transparent focus-visible:ring-1 focus-visible:ring-primary pl-9 h-9" 
            value={searchQuery}
            // Update the search state whenever the user types
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* The Scrollable Grid of Products */}
      <div className="flex-1 overflow-y-auto p-4 bg-slate-50/30">
        
        {/* If no products are found, show an empty state message */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-3 mt-10">
            <div className="p-4 bg-white rounded-full shadow-sm border border-slate-100 mb-2">
              {searchQuery ? <SearchX className="h-8 w-8 text-slate-400" /> : <Package className="h-8 w-8 text-slate-400" />}
            </div>
            <div className="text-center">
              <p className="font-medium text-slate-600">{searchQuery ? 'No products found' : 'Catalog is empty'}</p>
              <p className="text-sm mt-1 text-slate-400">{searchQuery ? 'Try searching for a different item.' : 'Add products from the Products page.'}</p>
            </div>
          </div>
        ) : (
          
          /* If products ARE found, loop through them and render a Card for each one */
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 pb-4">
            
            {/* The .map() function loops through the array. We must give each item a unique 'key' */}
            {filteredProducts.map(product => (
              <Card 
                key={product.product_id} 
                className="group relative shadow-sm hover:shadow-md border-slate-200 hover:border-primary/30 transition-all duration-300 flex flex-col justify-between hover:-translate-y-0.5 overflow-hidden"
              >
                {/* Optional subtle top border highlight on hover */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/40 group-hover:via-primary/60 group-hover:to-primary/40 transition-all duration-500" />
                
                <CardContent className="p-5 flex flex-col h-full justify-between gap-5 relative z-10">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-3">
                      <h3 className="font-semibold text-slate-800 leading-tight line-clamp-2 flex-1 pt-1">{product.product_name}</h3>
                      
                      {/* Conditionally show the stock badge based on how many are left */}
                      {product.stock_quantity === 0 ? (
                        <Badge variant="outline" className="bg-rose-50/80 text-rose-700 border-rose-200/60 font-medium rounded-md px-2 py-0.5 shadow-none text-[10px] uppercase whitespace-nowrap shrink-0">Out</Badge>
                      ) : product.stock_quantity <= 5 ? (
                        <Badge variant="outline" className="bg-amber-50/80 text-amber-700 border-amber-200/60 font-medium rounded-md px-2 py-0.5 shadow-none text-[10px] whitespace-nowrap shrink-0">{product.stock_quantity} left</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-emerald-50/80 text-emerald-700 border-emerald-200/60 font-medium rounded-md px-2 py-0.5 shadow-none text-[10px] whitespace-nowrap shrink-0">{product.stock_quantity} in stock</Badge>
                      )}
                    </div>
                    
                    {/* Format price with smaller currency symbol and prominent amount */}
                    <div className="flex items-baseline text-slate-900">
                      <span className="text-sm font-semibold text-slate-500 mr-0.5">₱</span>
                      <span className="text-2xl font-bold tracking-tight">
                        {Number(product.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <Button 
                    className={`w-full shadow-sm transition-all duration-300 ${
                      product.stock_quantity === 0 
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed hover:bg-slate-100" 
                        : "bg-white text-primary border border-primary/20 hover:bg-primary hover:text-white group-hover:border-primary"
                    }`}
                    onClick={() => addToCart(product)}
                    disabled={product.stock_quantity === 0}
                    variant="outline"
                  >
                    <Plus className={`w-4 h-4 mr-1.5 ${product.stock_quantity === 0 ? 'opacity-50' : ''}`} />
                    {product.stock_quantity === 0 ? "Out of Stock" : "Add to Cart"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
