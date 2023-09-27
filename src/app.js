import { manager1 } from './ProductManager.js';
import express from "express";
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

import productsRouter from './routes/products.router.js';
import ordersRouter from './routes/orders.router.js';
import cartsRouter from './routes/carts.router.js';
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/carts', cartsRouter);





app.listen(8080, () => {
    console.log('escuchando puerto 8080')
})