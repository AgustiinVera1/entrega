//const fs = require('fs'); //commonJS (node trae está por default)
import fs from 'fs'; // ES module 
const path = 'ProductFile.json';
//import { existsSync, promises} from 'fs';

class ProductManager {
    async getProducts(queryObj) {
        //console.log('queryObj', queryObj);
        const { limit } = queryObj;
        try {
            if (fs.existsSync(path)) {
                const productsFile = await fs.promises.readFile(path, "utf-8");
                const productData = JSON.parse(productsFile);
                return limit ? productData.slice(0, +limit) : productData;
            } else {
                return [];
            }
        } catch (error) {
            return error;
        }
    }
    async addProduct(product) {
        try {
            const products = await this.getProducts({});
            let id;
            if (!products.length) {
                id = 1;
            } else {
                id = products[products.length - 1].id + 1;
            }
            const newProduct = { id, ...product};
            products.push(newProduct);
            await fs.promises.writeFile(path, JSON.stringify(products));
            return newProduct;
        } catch (error) {
            return error;
        }
    }

    async getProductsById(id) {
        try {
            const products = await this.getProducts({});
            const product = products.find(u => u.id == id);
            if (!product) {
                return 'No hay producto';
            } else {
                return product;
            }
        } catch (error) {
            return error;
        }
    }

    async updateProduct(idProduct, obj) {
        try {
            const products = await this.getProducts({});
            const index = products.findIndex(u => u.id === idProduct);
            if (index === -1) {
                return null;
            }
            const updateProduct = { ...products[index], ...obj };
            products.splice(index, 1, updateProduct);
            await fs.promises.writeFile(path, JSON.stringify(products));
            return updateProduct;
        } catch (error) {
            return error;
        }

    }

    async deleteProduct(id) {
        try {
            const products = await this.getProducts({});
            const product = products.find((u) => u.id === id);
            if (product) {
                const NewArrProducts = products.filter((u) => u.id !== id);
                await fs.promises.writeFile(path, JSON.stringify(NewArrProducts));
            }
            return product;
        } catch (error) {
            return error;
        }
    }

}

const product1 = {
    title: "ps5",
    description: "consola gamming",
    price: 5000,
    thumbnail: "img",
    code: 11111,
    stock: 5,
}

const product2 = {
    title: "celular",
    description: "asdasdasd",
    price: 900,
    thumbnail: "jpg",
    code: 555,
    stock: 20,
}
const product3 = {
    title: "computadora",
    description: "asdasdasd",
    price: 300,
    thumbnail: "jpg",
    code: 333,
    stock: 30,
}
const product4 = {
    title: "bicicleta",
    description: "asdasdasd",
    price: 400,
    thumbnail: "jpg",
    code: 444,
    stock: 40,
}
const product5 = {
    title: "tv",
    description: "asdasdasd",
    price: 500,
    thumbnail: "jpg",
    code: 5555,
    stock: 50,
}
const product6 = {
    title: "auto",
    description: "asdasdasd",
    price: 600,
    thumbnail: "jpg",
    code: 666,
    stock: 60,
}
const product7 = {
    title: "xiaomi",
    description: "asdasdasd",
    price: 700,
    thumbnail: "jpg",
    code: 777,
    stock: 70,
}
const product8 = {
    title: "motorola",
    description: "asdasdasd",
    price: 800,
    thumbnail: "jpg",
    code: 888,
    stock: 80,
}
const product9 = {
    title: "sony",
    description: "asdasdasd",
    price: 9000,
    thumbnail: "jpg",
    code: 999,
    stock: 90,
}
const product10 = {
    title: "lenovo",
    description: "asdasdasd",
    price: 10000,
    thumbnail: "jpg",
    code: 1010,
    stock: 100,
}
const product11 = {
    title: "title",
    description: "des",
    price: 90,
    thumbnail: "img",
    code: 1212,
    stock: 3232,
    category: "category"
}


async function test() {
    //const manager1 = new ProductManager();
    //await manager1.addProduct(product1);
    //await manager1.addProduct(product2);
    //await manager1.addProduct(product3);
    //await manager1.addProduct(product4);
    //await manager1.addProduct(product5);
    //await manager1.addProduct(product6);
    //await manager1.addProduct(product7);
    //await manager1.addProduct(product8);
    //await manager1.addProduct(product9);
    //await manager1.addProduct(product10);
    //await manager1.addProduct(product11);


    //const products = await manager1.getProducts();
    //console.log(products);

    //await manager1.deleteProduct();

    //const productId = await manager1.getProductsById();
    //console.log(productId);

    //await manager1.updateProduct(2,{title: "iphone", price: 9999});
}
test()

export const manager1 = new ProductManager();
