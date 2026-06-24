import type { Request, Response } from 'express';
import pool from '../config/db';

/*
 * ==========================================
 * CONTROLLERS
 * ==========================================
 * A "Controller" is just a function that handles an incoming request.
 * `req` stands for Request (what the frontend sent us).
 * `res` stands for Response (what we will send back to the frontend).
 */

// GET /api/products
export const getProducts = async (req: Request, res: Response) => {
  try {
    // 1. Grab the search query from the URL (e.g. ?search=apple)
    const search = req.query.search as string || '';
    let queryParams: any[] = [];
    let searchCondition = '';

    // 2. Build the search condition if the user searched for something
    if (search) {
      const idMatch = search.match(/^PRD-(\d+)$/i) || search.match(/^(\d+)$/);
      if (idMatch) {
        const id = parseInt(idMatch[1], 10);
        searchCondition = 'WHERE product_name LIKE ? OR product_id = ?';
        queryParams.push(`%${search}%`, id);
      } else {
        searchCondition = 'WHERE product_name LIKE ?';
        queryParams.push(`%${search}%`);
      }
    }

    // 3. Handle Pagination (e.g. ?page=1)
    if (req.query.page) {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = (page - 1) * limit; // Skip previous pages

      // Count total matching products for pagination
      const [countResult]: any = await pool.query(`SELECT COUNT(*) as count FROM products ${searchCondition}`, queryParams);
      const totalCount = countResult[0].count;
      const totalPages = Math.ceil(totalCount / limit);

      // Fetch the actual data
      const [rows] = await pool.query(`SELECT * FROM products ${searchCondition} ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`, queryParams);
      
      // Send JSON response back to the React app
      res.json({
        data: rows,
        pagination: { totalCount, totalPages, currentPage: page, limit }
      });
    } else {
      // If no page is provided, just return all of them
      const [rows] = await pool.query(`SELECT * FROM products ${searchCondition} ORDER BY created_at DESC`, queryParams);
      res.json(rows);
    }
  } catch (error) {
    // If something breaks, send a 500 Internal Server Error
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// POST /api/products (Add a new product)
export const addProduct = async (req: Request, res: Response): Promise<any> => {
  // `req.body` contains the JSON data the frontend sent us
  const { product_name, price, stock_quantity } = req.body;
  
  try {
    const cleanName = product_name.trim();
    
    // 1. Check if the product already exists (Validation)
    console.log(`[Validation] Checking if "${cleanName}" exists...`);
    // Note the `?` mark! This prevents "SQL Injection" hackers from breaking the database.
    const [existing]: any = await pool.query('SELECT * FROM products WHERE product_name = ?', [cleanName]);
    console.log(`[Validation] Found ${existing.length} existing products.`);
    
    if (existing.length > 0) {
      console.log(`[Validation] Blocked duplicate product: ${cleanName}`);
      // Send a 400 Bad Request error
      return res.status(400).json({ error: 'A product with this name already exists' });
    }

    // 2. Insert the new product
    const [result]: any = await pool.query(
      'INSERT INTO products (product_name, price, stock_quantity) VALUES (?, ?, ?)',
      [cleanName, price, stock_quantity]
    );
    
    // 3. Respond with 201 Created and the new ID
    res.status(201).json({ id: result.insertId, product_name: cleanName, price, stock_quantity });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add product' });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<any> => {
  const { product_name, price, stock_quantity } = req.body;
  const { id } = req.params;
  try {
    const cleanName = product_name.trim();
    const [existing]: any = await pool.query('SELECT * FROM products WHERE product_name = ? AND product_id != ?', [cleanName, id]);
    if (existing.length > 0) {
      return res.status(400).json({ error: 'A product with this name already exists' });
    }

    await pool.query(
      'UPDATE products SET product_name = ?, price = ?, stock_quantity = ? WHERE product_id = ?',
      [cleanName, price, stock_quantity, id]
    );
    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM products WHERE product_id = ?', [id]);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
