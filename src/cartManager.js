//const fs = require('fs'); //commonJS (node trae está por default)
import { error } from 'console';
import fs from 'fs'; // ES module 
const path = 'CartsFile.json';
//import { existsSync, promises} from 'fs';
import { manager1 } from './ProductManager.js'

class cartManager {
    async getCarts() {
        try {
            if (fs.existsSync(path)) {
                const cartsFile = await fs.promises.readFile(path, "utf-8");
                const cartData = JSON.parse(cartsFile);
                return cartData;
            } else {
                return [];
            }
        } catch (error) {
            return error;
        }
    }
    async addCart() {
        try {
            const carts = await this.getCarts();
            let id;
            if (!carts.length) {
                id = 1;
            } else {
                id = carts[carts.length - 1].id + 1;
            }
            const newCart = { id, products: [] };
            carts.push(newCart);
            await fs.promises.writeFile(path, JSON.stringify(carts));
            return newCart;
        } catch (error) {
            return error;
        }
    }

    async getCartsById(id) {
        try {
            const carts = await this.getCarts();
            const cart = carts.find(u => u.id == id);
            if (!cart) {
                return 'No hay carrito';
            } else {
                return cart;
            }
        } catch (error) {
            return error;
        }
    }

    async addProductToCart(idCart, idProduct) {
        const cart = await this.getCartsById(idCart);
        if (!cart) {
            throw new Error('No existe carrito con ese id');
        }
        const product = await manager1.getProductsById(idProduct);
        if (!product) {
            throw new Error('No existe producto con ese id');
        }
        const productIndex = cart.products.findIndex(p => p.id === idProduct);
        if (productIndex === -1) {
            const newProduct = { id: idProduct, quantify: 1 };
            cart.products.push(newProduct);
        }else{
            cart.products[productIndex].quantify++;
        }
    }

}


async function test() {
}
test();
export const cartManager1 = new cartManager();
