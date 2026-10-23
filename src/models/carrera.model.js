import { model, Schema} from "mongoose";

const carreraSchema = new Schema (
    {
    nombre: {
        type: String,
        required: true,
        unique: true,
    },
    duracionAnios: {
        type: Number,
        required: true
    },
//eliminación lógica
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

export const CarreraModel = model ("Carrera, carreraSchema");