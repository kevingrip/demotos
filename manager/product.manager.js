import categoryModel from "../models/category.model.js";
import productModel from "../models/product.model.js";

const getProducts = async() =>{
    const data = await productModel.find()
    return data;
}

const getCategories = async() =>{
    const data = await categoryModel.find()
    return data;
}

const getProductsByCategory = async(family) =>{
    const data = await productModel.find(family)
    return data;
}

const newProduct = async(product) =>{
    
    try {
        await productModel.create(product);
        console.log('PRODUCTO CREADO CORRECTAMENTE')
    } catch (error) {
        console.error(error.message)
    }    
}
const newcategory = async(category) =>{
    
    try {
        await categoryModel.create(category);
        console.log('CATEGORIA CREADA CORRECTAMENTE')
    } catch (error) {
        console.error(error.message)
    }    
}

const deleteProduct = async(codigo) =>{
    try {
        await productModel.deleteOne({codigo});
        console.log('PRODUCTO BORRADO CORRECTAMENTE')
    } catch (error) {
        console.error(error.message)
    }
}

const productManager = {
    getProducts,
    newProduct,
    getProductsByCategory,
    deleteProduct,
    newcategory,
    getCategories
};

export default productManager;