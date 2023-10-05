import { Router } from "express";
import { manager1 } from "../ProductManager.js";
const router = Router();

//routes
router.get('/view1', (req, res) => {
    res.render('view1');    //no hace falta poner view1.handlebars
});

router.get('/view2', (req, res) => {
    res.render('view2');
});


router.get('/user', (req, res) => {
    res.render('usuario', { user });
})
const user = {
    nombre: 'Agus',
    apellido: 'Vera',
    email: 'agusvera@hotmail.com'
};


router.get('/users', (req, res) => {
    res.render('usuarios', { users });
})
const users = [
    {
        nombre: 'Agusasd',
        apellido: 'Veraasd',
        email: 'agusvdasdera@hotmail.com'
    },
    {
        nombre: 'rarar',
        apellido: 'saassa',
        email: 'rarsraas@hotmail.com'
    },
    {
        nombre: 'ffff',
        apellido: 'wwwww',
        email: 'fffffwwww@hotmail.com'
    }
];

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.get('/user/:idUser', async (req, res) => {
    const { idUser } = req.params;
    const userProfile = await manager1.getProductsById(+idUser);
    res.render('profile', { userProfile, style: 'first' });
})

router.get('/home', async (req, res) => {
    try {
        const products = await manager1.getProducts({});
        res.render('home', {listProduct: products});
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.get('/realtimeproducts', async (req,res)=>{
    try {
        const products = await manager1.getProducts({});
        res.render('realTimeProducts',{listProduct: products});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

export default router; 