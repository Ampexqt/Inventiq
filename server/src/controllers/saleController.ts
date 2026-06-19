import type { Request, Response } from 'express';
import pool from '../config/db';

export const getSales = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string || '';
    let queryParams: any[] = [];
    let searchCondition = '';

    if (search) {
      searchCondition = 'WHERE s.receipt_number LIKE ?';
      queryParams.push(`%${search}%`);
    }

    const queryBase = `
      SELECT 
        s.sale_id, s.receipt_number, s.total_amount, s.transaction_date,
        (SELECT SUM(quantity) FROM sales_details WHERE sale_id = s.sale_id) as items_count
      FROM sales s
      ${searchCondition}
      ORDER BY s.transaction_date DESC
    `;

    if (req.query.page) {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = (page - 1) * limit;

      const [countResult]: any = await pool.query(`SELECT COUNT(*) as count FROM sales s ${searchCondition}`, [...queryParams]);
      const totalCount = countResult[0].count;
      const totalPages = Math.ceil(totalCount / limit) || 1;

      const paginatedQuery = queryBase + ` LIMIT ${limit} OFFSET ${offset}`;
      const [rows] = await pool.query(paginatedQuery, queryParams);
      
      res.json({
        data: rows,
        pagination: { totalCount, totalPages, currentPage: page, limit }
      });
    } else {
      const [rows] = await pool.query(queryBase, queryParams);
      res.json(rows);
    }
  } catch (error: any) {
    console.error('Error fetching sales:', error);
    res.status(500).json({ error: 'Failed to fetch sales', details: error.message || String(error) });
  }
};

export const getSaleDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(`
      SELECT sd.*, p.product_name 
      FROM sales_details sd
      JOIN products p ON sd.product_id = p.product_id
      WHERE sd.sale_id = ?
    `, [id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sale details' });
  }
};

export const checkout = async (req: Request, res: Response): Promise<void> => {
  const { cart, total_amount } = req.body; 
  
  if (!cart || cart.length === 0) {
    res.status(400).json({ error: 'Cart is empty' });
    return;
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const receipt_number = 'RCP-' + Math.floor(10000 + Math.random() * 90000);

    const [saleResult]: any = await connection.query(
      'INSERT INTO sales (receipt_number, total_amount) VALUES (?, ?)',
      [receipt_number, total_amount]
    );
    const sale_id = saleResult.insertId;

    for (const item of cart) {
      const subtotal = item.price * item.quantity;
      
      await connection.query(
        'INSERT INTO sales_details (sale_id, product_id, quantity, unit_price, subtotal) VALUES (?, ?, ?, ?, ?)',
        [sale_id, item.id, item.quantity, item.price, subtotal]
      );

      await connection.query(
        'UPDATE products SET stock_quantity = stock_quantity - ? WHERE product_id = ?',
        [item.quantity, item.id]
      );
    }

    await connection.commit();
    res.status(201).json({ message: 'Transaction successful', receipt_number });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: 'Transaction failed' });
  } finally {
    connection.release();
  }
};
