import mongoose from 'mongoose';

mongoose.pluralize(null);

const collection = 'motos'; 

const productSchema = new mongoose.Schema({

    title: {type: String, required: true},

    description: {type: String, required: true},

    precio: { type: Number, required: true },

    codigo: {type: String, required: true, unique: true},

    cantidad: {type: Number, required: true},

    categoria: {type: String, required: true},

    familia: {type: String, required: true},

    condicion: {type: String, required: true},

    origen: {type: String, required: true},

    imagen: { type: String, required: true }


},{ versionKey: false });

const productModel = mongoose.model(collection, productSchema); 

export default productModel;