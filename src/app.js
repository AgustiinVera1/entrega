import {manager1} from  './ProductManager.js';

import express from "express";
const app = express()

app.get('/products', async (req, res) => {
    try {
        console.log('query', req.query);
        const users = await manager1.getProducts(req.query);
        res.status(200).json({ message: users });
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

app.get('/products/:id', async (req,res)=>{
    const {id} = req.params;
    try {
        console.log(req.params);
        const usersId = await manager1.getProductsById(+id);
        if(!usersId){
            return res.status(404).json({message: 'Producto no encontrado con el ID'}); 
        }
        res.status(200).json({message:'Usuario encontrado', usersId});
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})



app.listen(8080, () => {
    console.log('escuchando puerto 8080')
})