import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

/* 
 * =========================================================
 * DELETE PRODUCT MODAL COMPONENT
 * =========================================================
 * This component is simply a confirmation popup to make sure
 * the user doesn't accidentally delete a product.
 */

interface Product {
  product_id: number;
  product_name: string;
}

interface DeleteProductModalProps {
  // The product we are potentially deleting
  product: Product;
  // The function to call if they click "Yes, delete it"
  handleDeleteProduct: (id: number) => void;
}

const DeleteProductModal: React.FC<DeleteProductModalProps> = ({ product, handleDeleteProduct }) => {
  return (
    <Dialog>
      {/* The Trash can icon button that opens the dialog */}
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-rose-600 hover:bg-rose-50">
          <Trash2 className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-rose-600">Delete Product</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <strong>{product.product_name}</strong>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="mt-4">
          <DialogTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogTrigger>
          <DialogTrigger asChild>
            {/* If they click this, we call the delete function and pass the ID */}
            <Button variant="destructive" onClick={() => handleDeleteProduct(product.product_id)}>
              Delete Product
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProductModal;
