import { Router } from "express";
import { cartManager1 } from "../cartManager.js";
const router = Router();

router.post('/', async(req,res)=>{
    const {product} = req.body;
    if (!product) {
        res.status(400).json({ message: 'no existe el producto' });
    }
    try {
        const response = await cartManager1.addCart(req.body);
        res.status(200).json({ message: response });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
router.get('/:cid', async(req,res)=>{
    const { idCart } = req.params;
    try {
        const cart = await cartManager1.getCartsById(+idCart);
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado con el ID' });
        }
        res.status(200).json({ message: 'Carrito encontrado', cart });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/:idCart/product/:idProduct', async(req,res)=>{
    const {idCart, idProduct} = req.body;
    if (!idCart || !idProduct) {
        res.status(400).json({ message: 'Falta algun dato' });
    }
    try {
        const response = await cartManager1.addProductToCart(req.body);
        res.status(200).json({ message: 'Carrito creado', product: response });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default router;
