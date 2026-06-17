import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PackageOpen, Tag, Hash, Save, Pencil } from 'lucide-react';

/* 
 * =========================================================
 * EDIT PRODUCT MODAL COMPONENT
 * =========================================================
 * This component handles the popup window for editing a product.
 * Notice that we don't manage any complex "state" here. Instead,
 * we use a simple HTML <form> and grab the values when submitted!
 */

interface Product {
  product_id: number;
  product_name: string;
  price: number;
  stock_quantity: number;
}

interface EditProductModalProps {
  // The specific product we are editing
  product: Product;
  // The function to call when the form is submitted
  handleEditProduct: (id: number, name: string, price: number, stock: number) => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({ product, handleEditProduct }) => {
  return (
    <Dialog>
      
      {/* The Trigger is what opens the dialog. In this case, it's the Pencil icon button */}
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        {/* We use a standard HTML form here. When the user clicks "Save Changes", it triggers onSubmit */}
        <form onSubmit={(e) => {
          e.preventDefault(); // Prevents the page from refreshing
          const formData = new FormData(e.currentTarget); // Grabs all the inputs
          
          // Call the function from the parent file with the new data!
          handleEditProduct(
            product.product_id,
            formData.get('name') as string,
            parseFloat(formData.get('price') as string),
            parseInt(formData.get('stock') as string, 10)
          );
        }}>
          
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update the details for {product.product_name}.</DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-5 py-4">
            <div className="grid gap-2">
              <Label htmlFor={`edit-name-${product.product_id}`} className="text-slate-700 font-medium">Product Name</Label>
              <div className="relative">
                <PackageOpen className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input 
                  id={`edit-name-${product.product_id}`} 
                  name="name" 
                  defaultValue={product.product_name} 
                  className="pl-9 bg-slate-50/50 border-slate-200 focus-visible:ring-primary/30 transition-all"
                  required 
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor={`edit-price-${product.product_id}`} className="text-slate-700 font-medium">Price (₱)</Label>
              <div className="relative">
                <Tag className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input 
                  id={`edit-price-${product.product_id}`} 
                  name="price" 
                  type="number" 
                  step="0.01" 
                  defaultValue={product.price} 
                  className="pl-9 bg-slate-50/50 border-slate-200 focus-visible:ring-primary/30 transition-all"
                  required 
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor={`edit-stock-${product.product_id}`} className="text-slate-700 font-medium">Stock Quantity</Label>
              <div className="relative">
                <Hash className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input 
                  id={`edit-stock-${product.product_id}`} 
                  name="stock" 
                  type="number" 
                  defaultValue={product.stock_quantity} 
                  className="pl-9 bg-slate-50/50 border-slate-200 focus-visible:ring-primary/30 transition-all"
                  required 
                />
              </div>
            </div>
          </div>
          
          <DialogFooter className="border-t border-slate-100 pt-4 mt-2">
            <DialogTrigger asChild>
              <Button type="button" variant="outline" className="font-medium text-slate-600">Cancel</Button>
            </DialogTrigger>
            <DialogTrigger asChild>
              <Button type="submit" className="bg-primary text-white shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all font-medium">
                <Save className="w-4 h-4 mr-2" /> Save Changes
              </Button>
            </DialogTrigger>
          </DialogFooter>
          
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;
