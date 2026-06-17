import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PackageOpen, Tag, Hash, Save } from 'lucide-react';

/* 
 * =========================================================
 * ADD PRODUCT MODAL COMPONENT
 * =========================================================
 * This component handles the popup window for adding a new product.
 * By pulling this out of the main Products.tsx file, our code
 * becomes much shorter and easier to read!
 * 
 * We use "Props" (properties) to pass data and functions 
 * from the parent (Products.tsx) down to this child component.
 */

// We define the shape of the data we expect the parent to give us.
// Think of this like a contract. The parent MUST provide these exact things.
interface AddProductModalProps {
  // A boolean (true/false) that tells the modal if it should be visible
  isOpen: boolean;
  // A function to change the visibility (e.g. close the modal)
  setIsOpen: (open: boolean) => void;
  // The current state of the new product being typed in
  newProduct: { name: string; price: string; stock: string };
  // A function to update the new product state when the user types
  setNewProduct: (product: { name: string; price: string; stock: string }) => void;
  // The function to actually save the product to the database
  handleAddProduct: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  setIsOpen,
  newProduct,
  setNewProduct,
  handleAddProduct
}) => {
  return (
    // <Dialog> comes from our shadcn/ui library. It handles all the complex accessibility stuff for us!
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        
        {/* The Title Section */}
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        
        {/* The Input Fields Section */}
        <div className="grid gap-5 py-4">
          
          {/* Product Name Input */}
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-slate-700 font-medium">Product Name</Label>
            <div className="relative">
              <PackageOpen className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input 
                id="name" 
                className="pl-9 bg-slate-50/50 border-slate-200 focus-visible:ring-primary/30 transition-all"
                placeholder="e.g. Wireless Mouse" 
                value={newProduct.name}
                // When the user types, we keep the old values (...newProduct) and just update the 'name'
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
              />
            </div>
          </div>
          
          {/* Price Input */}
          <div className="grid gap-2">
            <Label htmlFor="price" className="text-slate-700 font-medium">Price (₱)</Label>
            <div className="relative">
              <Tag className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input 
                id="price" 
                type="number" 
                className="pl-9 bg-slate-50/50 border-slate-200 focus-visible:ring-primary/30 transition-all"
                placeholder="0.00" 
                value={newProduct.price}
                onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
              />
            </div>
          </div>

          {/* Stock Quantity Input */}
          <div className="grid gap-2">
            <Label htmlFor="stock" className="text-slate-700 font-medium">Stock Quantity</Label>
            <div className="relative">
              <Hash className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input 
                id="stock" 
                type="number" 
                className="pl-9 bg-slate-50/50 border-slate-200 focus-visible:ring-primary/30 transition-all"
                placeholder="0" 
                value={newProduct.stock}
                onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
              />
            </div>
          </div>
        </div>
        
        {/* Footer Buttons Section */}
        <DialogFooter className="border-t border-slate-100 pt-4 mt-2">
          {/* Cancel button simply sets isOpen to false to close the modal */}
          <Button variant="outline" className="font-medium text-slate-600" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          
          {/* Save button triggers the API call passed from the parent file */}
          <Button onClick={handleAddProduct} className="bg-primary text-white shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all font-medium">
            <Save className="w-4 h-4 mr-2" /> Save Product
          </Button>
        </DialogFooter>
        
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
