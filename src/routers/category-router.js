import { Router } from 'express';
import { categoryService } from '../services';

const categoryRouter = Router();

categoryRouter.get('/', (req, res) => {
    res.send("category test")
})

export { categoryRouter }