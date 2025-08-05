import axios from "axios";
import express from 'express'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import rutas from './routes/index.routes.js'
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()

const PORT = process.env.PORT


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('🔗 Conexión a MongoDB exitosa'))
    .catch(err => console.error('❌ Error al conectar a MongoDB:', err));
    

const app = express()
app.use(express.json());

app.use('/api', rutas)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.static(path.join(__dirname, 'public')));

const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
    fs.mkdirSync(uploadsPath);
}


app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}/productos.html`)
})