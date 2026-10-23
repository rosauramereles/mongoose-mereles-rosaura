import { model, Schema } from "mongoose";

const carreraSchema = new Schema (
{
nombreMateria: {
    type: String,
    required: true,
    unique: true,
},
anio: {
    tyoe: Number,
    required: true,
},
//elinación lógica
activo: {
    type: Boolean,
    default: true,
},
},
{
    timestamps: true,
    versionKey: false,
}
);

export const MateriaModel = model("Materia", materiaSchema);