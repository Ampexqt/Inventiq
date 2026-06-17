import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Eye, FileText, SearchX } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import api from '../lib/api';

interface Sale {
  sale_id: number;
  receipt_number: string;
  total_amount: number;
  transaction_date: string;
  items_count: number;
}

interface SaleDetail {
  sale_detail_id: number;
  product_name: string;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

const SalesTransactions: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [selectedDetails, setSelectedDetails] = useState<SaleDetail[]>([]);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState<Sale | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchSales();
  }, [currentPage, searchQuery]);

  const fetchSales = async () => {
    try {
      const response = await api.get('/sales', { params: { page: currentPage, limit: 6, search: searchQuery } });
      if (response.data.data) {
        setSales(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
      } else {
        setSales(response.data);
      }
    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  };

  const handleViewDetails = async (sale: Sale) => {
    try {
      setActiveReceipt(sale);
      const response = await api.get(`/sales/${sale.sale_id}`);
      setSelectedDetails(response.data);
      setIsDetailsOpen(true);
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' 
    });
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Sales Transactions</h1>
        <p className="text-sm text-slate-500 mt-1">Review and inspect every completed sale.</p>
      </div>

      <Card className="shadow-sm border-slate-200">
        <div className="p-4 border-b border-slate-100 flex items-center">
          <Input 
            placeholder="Search receipts..." 
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
                <TableHead className="font-semibold text-slate-600 pl-6 py-3 text-xs">Receipt Number</TableHead>
                <TableHead className="font-semibold text-slate-600 py-3 text-xs">Transaction Date</TableHead>
                <TableHead className="text-right font-semibold text-slate-600 py-3 text-xs">Total Amount</TableHead>
                <TableHead className="text-center font-semibold text-slate-600 py-3 text-xs">Total Items</TableHead>
                <TableHead className="text-right font-semibold text-slate-600 pr-6 py-3 text-xs">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-500 space-y-2 py-8">
                      {searchQuery ? (
                        <>
                          <SearchX className="h-8 w-8 text-slate-400 mb-2" />
                          <span className="text-sm font-medium">No sales found</span>
                          <span className="text-xs text-slate-400">Try adjusting your search.</span>
                        </>
                      ) : (
                        <>
                          <FileText className="h-8 w-8 text-slate-400 mb-2" />
                          <span className="text-sm font-medium">No transactions yet</span>
                          <span className="text-xs text-slate-400">Your completed sales will appear here.</span>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ) : sales.map((tx) => (
                <TableRow key={tx.sale_id} className="border-b-slate-100 hover:bg-slate-50/50 transition-colors">
                  <TableCell className="font-semibold text-slate-700 pl-6">{tx.receipt_number}</TableCell>
                  <TableCell className="text-slate-500 text-sm">{formatDate(tx.transaction_date)}</TableCell>
                  <TableCell className="text-right font-semibold text-slate-900">
                    ₱{Number(tx.total_amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="text-center text-slate-600">{tx.items_count}</TableCell>
                  <TableCell className="text-right pr-6">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 text-xs font-medium bg-white text-slate-600 border-slate-200 hover:bg-slate-50 shadow-none"
                      onClick={() => handleViewDetails(tx)}
                    >
                      <Eye className="mr-1.5 h-3.5 w-3.5" /> View Details
                    </Button>
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

      {/* Details Dialog extracted outside the loop for performance */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          {activeReceipt && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">Receipt Details</DialogTitle>
                <DialogDescription>
                  Transaction processed on {formatDate(activeReceipt.transaction_date)}
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-2">
                <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100 mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <span className="font-semibold text-slate-800">{activeReceipt.receipt_number}</span>
                  </div>
                  <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-medium">Paid</Badge>
                </div>
                
                <div className="w-full bg-white rounded-lg border border-slate-200 overflow-hidden">
                  <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 font-semibold text-slate-700 text-sm flex justify-between items-center">
                    <span>Order Summary</span>
                    <Badge variant="secondary" className="bg-white text-slate-600 border-slate-200">{activeReceipt.items_count} items</Badge>
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
                        {selectedDetails.map(detail => (
                          <tr key={detail.sale_detail_id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-4 py-2.5 font-semibold text-slate-700 w-16">{detail.quantity}</td>
                            <td className="px-4 py-2.5 text-slate-600 truncate max-w-[160px]">{detail.product_name}</td>
                            <td className="px-4 py-2.5 text-right font-semibold text-slate-900 whitespace-nowrap">₱{Number(detail.subtotal).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="bg-slate-50 px-4 py-3 border-t border-slate-200 flex justify-between items-center">
                    <span className="font-semibold text-slate-600">Total Amount</span>
                    <span className="text-xl font-bold text-slate-900">
                      ₱{Number(activeReceipt.total_amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" className="w-full sm:w-auto" onClick={() => setIsDetailsOpen(false)}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default SalesTransactions;
