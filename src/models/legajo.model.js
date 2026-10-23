import {model, Schema, Types} from "mongoose";

const legajoSchema = new Schema (
{
numero: {
    type: String,
    required: true,
    unique: true,
},
fechaIngreso: {
    type: Date,
    default: Date.now,
},
// 1.1: "unique" esto hace que un alumno tenga un solo legajo
alumno: {
    type: Types.ObjectId,
    ref: "Alumno",
    required: true,
    unique: true,
},
//eliminación lógica
activo:{
    type: Boolean,
    unique: true,
},
},
{
    timestramps: true,
    versionKey: false,
}
);

export const LegajoModel = model("Legajo", legajoSchema);