import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ShoppingBag, Banknote } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import api from '../lib/api';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    inventoryLevel: 0,
    totalSales: 0,
    totalRevenue: 0,
    lowStockProducts: 0,
    outOfStockProducts: 0,
    recentSales: [] as { receipt_number: string, transaction_date: string, total_amount: number }[]
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/dashboard/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard Overview</h1>
        <p className="text-sm text-slate-500 mt-1">Monitor inventory, sales activity, and business performance.</p>
      </div>

      {/* Top Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-slate-500 uppercase">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end mt-2">
              <div>
                <div className="text-3xl font-bold text-slate-900">{stats.totalProducts}</div>
                <p className="text-xs text-slate-500 mt-1">Active catalog items</p>
              </div>
              <div className="p-2.5 bg-blue-100 rounded-lg">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-slate-500 uppercase">Current Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end mt-2">
              <div>
                <div className="text-3xl font-bold text-slate-900">{stats.inventoryLevel}</div>
                <p className="text-xs text-slate-500 mt-1">Units in stock</p>
              </div>
              <div className="p-2.5 bg-sky-100 rounded-lg">
                <Package className="w-5 h-5 text-sky-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-slate-500 uppercase">Sales Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end mt-2">
              <div>
                <div className="text-3xl font-bold text-slate-900">{stats.totalSales}</div>
                <p className="text-xs text-slate-500 mt-1">Completed orders</p>
              </div>
              <div className="p-2.5 bg-purple-100 rounded-lg">
                <ShoppingBag className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-xs font-semibold text-slate-500 uppercase">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-end mt-2">
              <div>
                <div className="text-3xl font-bold text-slate-900">₱{stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                <p className="text-xs text-slate-500 mt-1">All-time sales</p>
              </div>
              <div className="p-2.5 bg-emerald-100 rounded-lg">
                <Banknote className="w-5 h-5 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="pb-2 border-b border-slate-100 mb-2">
            <CardTitle className="text-base font-semibold text-slate-800">Inventory Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="flex justify-between items-center p-3 rounded-lg border border-slate-200 bg-white shadow-sm">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-blue-50 text-blue-600 rounded-md">
                  <Package className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-slate-700">Total Stock Available</span>
              </div>
              <span className="font-bold text-lg text-slate-900">{stats.inventoryLevel}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg border border-slate-200 bg-white shadow-sm relative overflow-hidden">
              <div className="absolute bottom-0 left-0 h-0.5 bg-amber-500 w-full" />
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-amber-50 text-amber-600 rounded-md">
                  <Package className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-slate-700">Low Stock Products</span>
              </div>
              <span className="font-bold text-lg text-slate-900">{stats.lowStockProducts}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg border border-slate-200 bg-white shadow-sm relative overflow-hidden">
              <div className="absolute bottom-0 left-0 h-0.5 bg-rose-500 w-full" />
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-rose-50 text-rose-600 rounded-md">
                  <Package className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium text-slate-700">Out of Stock Products</span>
              </div>
              <span className="font-bold text-lg text-slate-900">{stats.outOfStockProducts}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader className="pb-2 border-b border-slate-100 mb-2">
            <CardTitle className="text-base font-semibold text-slate-800">Recent Sales Activity</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow>
                  <TableHead className="text-xs font-semibold text-slate-500 pl-4 py-2 h-auto">Receipt</TableHead>
                  <TableHead className="text-xs font-semibold text-slate-500 py-2 h-auto">Date</TableHead>
                  <TableHead className="text-right text-xs font-semibold text-slate-500 pr-4 py-2 h-auto">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.recentSales.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center text-slate-500 py-4">No recent sales</TableCell>
                  </TableRow>
                ) : stats.recentSales.map((tx) => (
                  <TableRow key={tx.receipt_number} className="border-b-slate-100">
                    <TableCell className="font-medium text-slate-700 pl-4 py-3">{tx.receipt_number}</TableCell>
                    <TableCell className="text-slate-500 text-sm py-3">
                      {new Date(tx.transaction_date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-slate-900 pr-4 py-3">
                      ₱{parseFloat(tx.total_amount.toString()).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
