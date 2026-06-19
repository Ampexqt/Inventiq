import type { Request, Response } from 'express';
import pool from '../config/db';

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const [prodResult]: any = await pool.query('SELECT COUNT(*) as count FROM products');
    const totalProducts = prodResult[0].count;

    const [stockResult]: any = await pool.query('SELECT SUM(stock_quantity) as total FROM products');
    const inventoryLevel = stockResult[0].total || 0;

    const [salesResult]: any = await pool.query('SELECT COUNT(*) as count FROM sales');
    const totalSales = salesResult[0].count;

    const [revenueResult]: any = await pool.query('SELECT SUM(total_amount) as total FROM sales');
    const totalRevenue = revenueResult[0].total || 0;

    const [lowStockResult]: any = await pool.query('SELECT COUNT(*) as count FROM products WHERE stock_quantity <= 10 AND stock_quantity > 0');
    const lowStockProducts = lowStockResult[0].count;

    const [outOfStockResult]: any = await pool.query('SELECT COUNT(*) as count FROM products WHERE stock_quantity = 0');
    const outOfStockProducts = outOfStockResult[0].count;

    const [recentSalesResult]: any = await pool.query('SELECT receipt_number, transaction_date, total_amount FROM sales ORDER BY transaction_date DESC LIMIT 5');

    res.json({
      totalProducts,
      inventoryLevel,
      totalSales,
      totalRevenue,
      lowStockProducts,
      outOfStockProducts,
      recentSales: recentSalesResult
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};
