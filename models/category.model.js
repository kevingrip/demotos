import mongoose from 'mongoose';

mongoose.pluralize(null);

const collection = 'categoryMoto'; 

const categorySchema = new mongoose.Schema({

    title: {type: String, required: true},

    imagen: { type: String, required: true }

},{ versionKey: false });

const categoryModel = mongoose.model(collection, categorySchema); 

export default categoryModel;