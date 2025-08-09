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
    const categories = await productManager.getCategories()
    res.json({result,categories})
})


router.get('/productos', async (req, res) => {
    const { family, title, codigo } = req.query;

    const filtro = {};

    if (family) {
        filtro.familia = family.toLowerCase() ; 
    }

    if (codigo) {
        filtro.codigo = codigo ; 
    }

    if (title) {
        filtro.title = { $regex: title, $options: 'i' };
    }

    try {
        const result = await productManager.getProductsByCategory(filtro);
        return res.json(result);
    } catch (error) {
        console.error('Error al buscar productos:', error);
        res.status(500).json({ error: 'Error interno' });
    }
});

router.delete('/delete/:codigo', async (req, res) => {
    try {
        const codigo = req.params.codigo
        await productManager.deleteProduct(codigo)
        res.json({ mensaje: 'Producto borrado correctamente' });

    } catch (error) {
        console.error(error.message)
    }
})


router.post('/newproduct', upload.single('imagen'), async (req, res) => {
    try {
        const dataProduct = {...req.body, imagen: req.file.filename}
        await productManager.newProduct(dataProduct)
        res.json({ mensaje: 'Producto creado correctamente' });

    } catch (error) {
        console.error(error.message)
    }
})

router.post('/newcategory', upload.single('imagen'), async (req, res) => {
    try {
        const dataCategory = {...req.body, imagen: req.file.filename}
        await productManager.newcategory(dataCategory)
        res.json({ mensaje: 'Categoria creada correctamente' });

    } catch (error) {
        console.error(error.message)
    }
})

export default router;