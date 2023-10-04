import { manager1 } from './ProductManager.js';
import express from "express";
import { __dirname } from './utils.js';
import { Server } from 'socket.io';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //lo utilizo para q reciba de forma correcta la informacion del formulario
app.use(express.static(__dirname + '/public'));

import productsRouter from './routes/products.router.js';
import ordersRouter from './routes/orders.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/views', viewsRouter);

//dirname, (puse el dirname aca, porque no me funciona en el handlebars)
/*
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
*/

// handlebars
import { engine } from "express-handlebars";
app.engine("handlebars", engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');





const httpServer = app.listen(8080, () => {
    console.log('escuchando puerto 8080')
});

const socketServer = new Server(httpServer);
socketServer.on('connection', (socket)=>{
    
})