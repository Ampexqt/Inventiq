import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Minus, Plus } from 'lucide-react';
import CheckoutModal from './CheckoutModal';

/* 
 * =========================================================
 * CART SIDEBAR COMPONENT
 * =========================================================
 * This component handles the right-side panel showing the 
 * items the customer has added to their cart. It also includes 
 * the CheckoutModal at the bottom!
 */

// Again, we define the shape of our data
interface Product {
  product_id: number;
  product_name: string;
  price: number;
  stock_quantity: number;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartSidebarProps {
  cart: CartItem[];
  products: Product[];
  total: number;
  removeFromCart: (id: number) => void;
  addToCart: (product: Product) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (isOpen: boolean) => void;
  handleCheckout: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({
  cart,
  products,
  total,
  removeFromCart,
  addToCart,
  isCheckoutOpen,
  setIsCheckoutOpen,
  handleCheckout
}) => {
  return (
    <div className="w-full lg:w-96 flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm h-[400px] lg:h-full overflow-hidden shrink-0">
      
      {/* Header of the Cart */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-primary" />
          <h2 className="font-semibold text-slate-800">Shopping Cart</h2>
        </div>
        {/* Calculate total number of items in the cart */}
        <Badge variant="secondary" className="bg-slate-100 text-slate-600 rounded-full font-bold px-2">
          {cart.reduce((a, b) => a + b.quantity, 0)}
        </Badge>
      </div>

      {/* The List of Items */}
      <div className="flex-1 overflow-y-auto p-0">
        
        {/* Empty State */}
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-8 text-center text-slate-400 space-y-3 mt-20">
            <div className="p-4 bg-slate-50 rounded-full">
              <ShoppingCart className="w-8 h-8 text-slate-300" />
            </div>
            <div>
              <p className="font-medium text-slate-600">Your cart is empty</p>
              <p className="text-sm mt-1">Add products from the catalog to begin.</p>
            </div>
          </div>
        ) : (
          
          /* Cart Items List */
          <div className="p-4 space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-start group">
                <div className="flex-1 pr-4">
                  <p className="font-semibold text-sm text-slate-800 leading-tight">{item.name}</p>
                  <p className="text-sm text-slate-500 font-medium mt-0.5">₱{item.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                </div>
                
                {/* Plus / Minus Buttons to change quantity */}
                <div className="flex items-center gap-2 bg-slate-50 rounded-md border border-slate-200 p-0.5">
                  <Button variant="ghost" size="icon" className="h-6 w-6 rounded-sm hover:bg-white hover:text-rose-600" onClick={() => removeFromCart(item.id)}>
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-4 text-center text-sm font-semibold text-slate-700">{item.quantity}</span>
                  <Button variant="ghost" size="icon" className="h-6 w-6 rounded-sm hover:bg-white hover:text-emerald-600" onClick={() => {
                      // We need to find the full product object to pass back to addToCart
                      const prod = products.find(p => p.product_id === item.id);
                      if (prod) addToCart(prod);
                  }}>
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cart Footer (Total amount and Checkout button) */}
      <div className="p-4 bg-slate-50/50 border-t border-slate-200 mt-auto">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-slate-600">Total Amount</span>
          <span className="text-2xl font-bold text-slate-900">₱{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        </div>
        
        {/* We place our CheckoutModal right here at the bottom! */}
        <CheckoutModal 
          isOpen={isCheckoutOpen}
          setIsOpen={setIsCheckoutOpen}
          cart={cart}
          total={total}
          handleCheckout={handleCheckout}
        />
      </div>
    </div>
  );
};

export default CartSidebar;
