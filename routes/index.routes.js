import { Router } from "express";
import productManager from "../manager/product.manager.js";
import multer from 'multer';
import path from 'path';

const router = Router()


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Carpeta donde guardar las imágenes
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

router.get('/inicio', async (req, res) => {
    const result = await productManager.getProducts()
    res.json(result)
})


router.get('/productos', async (req, res) => {
    const { family, title } = req.query;

    // Armar filtro MongoDB vacío
    const filtro = {};

    if (family) {
        filtro.familia = family.toLowerCase() ; 
    }

    if (title) {
        filtro.title = { $regex: title, $options: 'i' };
    }

    try {
        const result = await productManager.getProductsByCategory(filtro);
        console.log(filtro)
        return res.json(result);
    } catch (error) {
        console.error('Error al buscar productos:', error);
        res.status(500).json({ error: 'Error interno' });
    }
});



router.post('/newproduct', upload.single('imagen'), async (req, res) => {
    try {
        const newProduct = {...req.body, imagen: req.file.filename}
        await productManager.newProduct(newProduct)
        res.json({ mensaje: 'Producto creado correctamente' });

    } catch (error) {
        console.error(error.message)
    }
})

export default router;