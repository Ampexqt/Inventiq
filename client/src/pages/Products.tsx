import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, SearchX, Package } from 'lucide-react';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import api from '../lib/api';

// --- IMPORTING OUR EXTRACTED COMPONENTS ---
import AddProductModal from '../features/products/components/AddProductModal';
import EditProductModal from '../features/products/components/EditProductModal';
import DeleteProductModal from '../features/products/components/DeleteProductModal';

interface Product {
  product_id: number;
  product_name: string;
  price: number;
  stock_quantity: number;
  created_at: string;
  updated_at: string;
}

const Products: React.FC = () => {
  /* 
   * ==========================================
   * STATE VARIABLES
   * ==========================================
   * "State" is how React remembers things. When state changes, 
   * React automatically updates the screen for us!
   */
  const [products, setProducts] = useState<Product[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false); // Controls if the Add Modal is open
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '' });
  
  // Pagination and Search State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await api.get('/products', { params: { page: currentPage, limit: 6, search: searchQuery } });
      if (response.data.data) {
        setProducts(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
      } else {
        setProducts(response.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  /*
   * ==========================================
   * USE EFFECT
   * ==========================================
   * useEffect tells React to run some code "after" the screen has rendered.
   * Here, we are saying: "Every time 'currentPage' or 'searchQuery' changes, 
   * go fetch the new list of products from the database."
   */
  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchQuery]);

  // Add product
  const handleAddProduct = async () => {
    try {
      await api.post('/products', {
        product_name: newProduct.name,
        price: parseFloat(newProduct.price),
        stock_quantity: parseInt(newProduct.stock, 10)
      });
      setIsAddOpen(false);
      setNewProduct({ name: '', price: '', stock: '' });
      fetchProducts();
      toast.success('Product added successfully!');
    } catch (error: any) {
      console.error('Error adding product:', error);
      const message = error.response?.data?.error || 'Failed to add product.';
      toast.error(message);
    }
  };

  // Edit product
  const handleEditProduct = async (id: number, name: string, price: number, stock: number) => {
    try {
      await api.put(`/products/${id}`, {
        product_name: name,
        price,
        stock_quantity: stock
      });
      fetchProducts();
      toast.success('Product updated successfully!');
    } catch (error: any) {
      console.error('Error updating product:', error);
      const message = error.response?.data?.error || 'Failed to update product.';
      toast.error(message);
    }
  };

  // Delete product
  const handleDeleteProduct = async (id: number) => {
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
      toast.success('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product.');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Products</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your product catalog, pricing, and stock levels.</p>
        </div>
        <Button className="bg-primary text-white shadow-sm hover:bg-primary/90" onClick={() => setIsAddOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
        
        {/* We pass our state variables as "Props" down into the AddProductModal */}
        <AddProductModal 
          isOpen={isAddOpen} 
          setIsOpen={setIsAddOpen} 
          newProduct={newProduct} 
          setNewProduct={setNewProduct} 
          handleAddProduct={handleAddProduct} 
        />
      </div>

      <Card className="shadow-sm border-slate-200">
        <div className="p-4 border-b border-slate-100 flex items-center">
          <Input 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="max-w-sm h-9 bg-slate-50 border-transparent focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow className="border-b-slate-100">
                <TableHead className="font-semibold text-slate-600 pl-6 py-3 text-xs">Product ID</TableHead>
                <TableHead className="font-semibold text-slate-600 py-3 text-xs">Product Name</TableHead>
                <TableHead className="font-semibold text-slate-600 py-3 text-xs">Price</TableHead>
                <TableHead className="font-semibold text-slate-600 py-3 text-xs">Stock</TableHead>
                <TableHead className="font-semibold text-slate-600 py-3 text-xs">Availability</TableHead>
                <TableHead className="font-semibold text-slate-600 py-3 text-xs">Created At</TableHead>
                <TableHead className="font-semibold text-slate-600 py-3 text-xs">Updated At</TableHead>
                <TableHead className="text-right font-semibold text-slate-600 pr-6 py-3 text-xs">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-500 space-y-2 py-8">
                      {searchQuery ? (
                        <>
                          <SearchX className="h-8 w-8 text-slate-400 mb-2" />
                          <span className="text-sm font-medium">No products found</span>
                          <span className="text-xs text-slate-400">Try adjusting your search.</span>
                        </>
                      ) : (
                        <>
                          <Package className="h-8 w-8 text-slate-400 mb-2" />
                          <span className="text-sm font-medium">Your catalog is empty</span>
                          <span className="text-xs text-slate-400">Add some products to get started.</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : products.map((product) => (
                <TableRow key={product.product_id} className="border-b-slate-100 hover:bg-slate-50/50">
                  <TableCell className="font-mono text-xs text-slate-500 pl-6">PRD-{product.product_id.toString().padStart(3, '0')}</TableCell>
                  <TableCell className="font-medium text-slate-900">{product.product_name}</TableCell>
                  <TableCell className="font-semibold text-slate-700">₱{Number(product.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
                  <TableCell className="text-slate-600">{product.stock_quantity}</TableCell>
                  <TableCell>
                    {product.stock_quantity > 10 ? (
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-medium rounded-full px-2.5 shadow-none">In Stock</Badge>
                    ) : product.stock_quantity > 0 ? (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 font-medium rounded-full px-2.5 shadow-none">Low Stock</Badge>
                    ) : (
                      <Badge variant="outline" className="bg-rose-50 text-rose-700 border-rose-200 font-medium rounded-full px-2.5 shadow-none">Out of Stock</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-slate-500">{formatDate(product.created_at)}</TableCell>
                  <TableCell className="text-sm text-slate-500">{formatDate(product.updated_at)}</TableCell>
                  <TableCell className="text-right pr-6 space-x-2">
                    
                    {/* EDIT DIALOG */}
                    <EditProductModal 
                      product={product} 
                      handleEditProduct={handleEditProduct} 
                    />

                    {/* DELETE DIALOG */}
                    <DeleteProductModal 
                      product={product} 
                      handleDeleteProduct={handleDeleteProduct} 
                    />

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))} 
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-slate-500 font-medium">Page {currentPage} of {totalPages}</span>
          <Button 
            variant="outline" 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} 
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default Products;
