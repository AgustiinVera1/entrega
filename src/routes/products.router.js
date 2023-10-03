import { Router } from "express";
const router = Router();
import { manager1 } from "../ProductManager.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

router.get('/', async (req, res) => {
    try {
        console.log('query', req.query);
        const products = await manager1.getProducts(req.query);
        if (!products.length) {
            res.status(404).json({ message: 'No hay productos' });
        }
        res.status(200).json({ message: 'Hay productos', products });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:idProduct', async (req, res) => {
    const { idProduct } = req.params;
    try {
        console.log(req.params);
        const product = await manager1.getProductsById(+idProduct);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado con el ID' });
        }
        res.status(200).json({ message: 'Producto encontrado', product });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const { title, description, price, code, stock, category } = req.body;
    console.log('body', req.body);
    if (!title || !description || !price || !code || !stock || !category) {
        res.status(400).json({ message: 'Falta algun dato' });
    }
    try {
        const response = await manager1.addProduct(req.body);
        res.status(200).json({ message: 'Producto creado', product: response });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await manager1.deleteProduct(+id);
        if (!response) {
            return res.status(404).json({ message: 'Producto no encontrado con el ID' });
        }
        res.status(200).json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await manager1.updateProduct(+id, req.body);
        if (!response) {
            return res.status(404).json({ message: 'Producto no encontrado con el ID' });
        }
        res.status(200).json({ message: 'Producto actualizado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.post('/signup', async (req, res) => {
    const { nombre, contraseña } = req.body;
    if (!nombre, !contraseña) {
        res.status(400).json({ message: 'Falta algun dato' });
    }
    try {
        const response = await manager1.addProduct(req.body);
        res.redirect(`/api/views/user/${response.id}`);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})


export default router;