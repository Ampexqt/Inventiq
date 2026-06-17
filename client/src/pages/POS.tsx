import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';
import api from '../lib/api';

// --- IMPORTING OUR EXTRACTED COMPONENTS ---
import ProductGrid from '../features/pos/components/ProductGrid';
import CartSidebar from '../features/pos/components/CartSidebar';

interface Product {
  product_id: number;
  product_name: string;
  price: number;
  stock_quantity: number;
}

const POS: React.FC = () => {
  /* 
   * ==========================================
   * STATE VARIABLES
   * ==========================================
   * This is where we hold the "memory" of the Point of Sale screen.
   */
  const [products, setProducts] = useState<Product[]>([]);
  // The cart holds items the user wants to buy
  const [cart, setCart] = useState<{id: number, name: string, price: number, quantity: number}[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Fetch the products from the database when the page loads
  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /*
   * useMemo is a React hook that "remembers" a calculation.
   * Instead of filtering the massive product list every single time 
   * the screen updates, it only re-filters when `products` or `searchQuery` changes!
   */
  const filteredProducts = useMemo(() => {
    return products.filter(p => p.product_name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [products, searchQuery]);

  const addToCart = (product: Product) => {
    if (product.stock_quantity === 0) return;
    
    setCart(prev => {
      const existing = prev.find(item => item.id === product.product_id);
      // Don't let them add more than in stock
      if (existing && existing.quantity >= product.stock_quantity) {
        return prev; 
      }
      if (existing) {
        return prev.map(item => item.id === product.product_id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id: product.product_id, name: product.product_name, price: Number(product.price), quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing && existing.quantity > 1) {
        return prev.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item);
      }
      return prev.filter(item => item.id !== id);
    });
  };

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckout = async () => {
    try {
      await api.post('/sales', {
        cart: cart,
        total_amount: total
      });
      // Clear cart, close modal, refresh inventory
      setCart([]);
      setIsCheckoutOpen(false);
      fetchProducts();
      toast.success('Transaction Completed Successfully!');
    } catch (error) {
      console.error('Checkout failed:', error);
      toast.error('Transaction failed.');
    }
  };

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Point of Sale</h1>
        <p className="text-sm text-slate-500 mt-1">Build an order, scan the catalog, and check out in seconds.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:h-[calc(100vh-140px)]">
        {/* Left Side: Product Grid */}
        <ProductGrid 
          filteredProducts={filteredProducts} 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          addToCart={addToCart} 
        />

        {/* Right Side: Cart */}
        <CartSidebar 
          cart={cart}
          products={products}
          total={total}
          removeFromCart={removeFromCart}
          addToCart={addToCart}
          isCheckoutOpen={isCheckoutOpen}
          setIsCheckoutOpen={setIsCheckoutOpen}
          handleCheckout={handleCheckout}
        />
      </div>
    </div>
  );
};

export default POS;
