import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Printer } from 'lucide-react';

/* 
 * =========================================================
 * CHECKOUT MODAL COMPONENT
 * =========================================================
 * This component displays the final summary and confirmation 
 * before completing a sale. Extracting this keeps our POS 
 * screen code clean!
 */

// Define the shape of our Cart Items
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Define the properties (Props) this component needs from POS.tsx
interface CheckoutModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  cart: CartItem[];
  total: number;
  handleCheckout: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  setIsOpen,
  cart,
  total,
  handleCheckout
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {/* The large button at the bottom of the cart that opens the modal */}
      <DialogTrigger asChild>
        <Button 
          className="w-full py-6 text-base font-bold shadow-sm" 
          size="lg"
          disabled={cart.length === 0}
        >
          Complete Transaction
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">Checkout Completion</DialogTitle>
          <DialogDescription>
            Review the final amount before completing the transaction.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6 flex flex-col items-center justify-center space-y-4">
          <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-2">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div className="text-center">
            <p className="text-sm text-slate-500 font-medium">Total Amount Due</p>
            {/* toLocaleString formats the number with commas and 2 decimal places */}
            <p className="text-4xl font-extrabold text-slate-900 mt-1">₱{total.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
          </div>
          
          {/* Order Summary Table */}
          <div className="w-full bg-white rounded-lg border border-slate-200 mt-4 overflow-hidden">
            <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 font-semibold text-slate-700 text-sm flex justify-between items-center">
              <span>Order Summary</span>
              <Badge variant="secondary" className="bg-white text-slate-600 border-slate-200">
                {/* reduce() loops through the cart to calculate total quantity */}
                {cart.reduce((totalQty, currentItem) => totalQty + currentItem.quantity, 0)} items
              </Badge>
            </div>
            <div className="max-h-[200px] overflow-y-auto relative">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50/80 text-slate-500 text-xs uppercase sticky top-0 backdrop-blur-sm shadow-sm z-10">
                  <tr>
                    <th className="px-4 py-2 font-semibold">Qty</th>
                    <th className="px-4 py-2 font-semibold">Product</th>
                    <th className="px-4 py-2 font-semibold text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {cart.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-4 py-2.5 font-semibold text-slate-700 w-16">{item.quantity}</td>
                      <td className="px-4 py-2.5 text-slate-600 truncate max-w-[160px]">{item.name}</td>
                      <td className="px-4 py-2.5 text-right font-semibold text-slate-900 whitespace-nowrap">
                        ₱{(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" className="w-full sm:w-auto" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button className="w-full sm:w-auto bg-primary text-white" onClick={handleCheckout}>
            <Printer className="w-4 h-4 mr-2" />
            Confirm & Print Receipt
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
