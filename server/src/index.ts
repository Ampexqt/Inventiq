import express from 'express';
import cors from 'cors';

// Import Routes (These are the "traffic cops" for our API)
import productRoutes from './routes/productRoutes';
import saleRoutes from './routes/saleRoutes';
import dashboardRoutes from './routes/dashboardRoutes';

/*
 * ==========================================
 * SERVER INITIALIZATION
 * ==========================================
 * We are creating our Express server application here.
 */
const app = express();
const PORT = process.env.PORT || 5000;

/*
 * ==========================================
 * MIDDLEWARE
 * ==========================================
 * Middleware are functions that run BEFORE the request reaches our routes.
 * 
 * 1. cors(): "Cross-Origin Resource Sharing". This allows our React frontend 
 *    (running on port 5173) to talk to this backend (running on port 5000).
 *    Without this, the browser would block the connection for security reasons.
 * 
 * 2. express.json(): Tells the server to accept data in JSON format. 
 *    If React sends { "name": "Apple" }, this line allows us to read it as `req.body.name`.
 */
app.use(cors());
app.use(express.json());

/*
 * ==========================================
 * ROUTE MOUNTING
 * ==========================================
 * Here we tell the server: "If a request starts with '/api/products', 
 * send it over to the productRoutes file to handle it."
 */
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
