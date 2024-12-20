import mongoose, { Schema, Document } from "mongoose";

export interface IProducto extends Document {
    name: string;
    category: string;
    description: string;
    price: String;
    imagenUrl: string;
};

const ProductoSchema: Schema=new Schema({
    name: { type: String, required: true},
    category: {type: String, required: true},
    description: {type: String, required: true},
    price: { type: String, required: true},
    imagenUrl: { type: String, required: true},
});

export default mongoose.model<IProducto>('Producto', ProductoSchema);