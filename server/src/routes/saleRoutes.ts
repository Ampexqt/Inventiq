import { Router } from 'express';
import { getSales, getSaleDetails, checkout } from '../controllers/saleController';

const router = Router();

router.get('/', getSales);
router.get('/:id', getSaleDetails);
router.post('/', checkout);

export default router;
