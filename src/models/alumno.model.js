import { model, Schema, Types } from "mongoose";

const alumnoSchema = new Schema (
{
nombre: {
    type: String,
    required: true,
},
apellido: {
    type: String,
    required: true,
},
email: {
    type: String,
    required: true,
    unique: true,
},
//Propiedad embebida: la dirreción pertenece dentro del alumno 
dirrecion: {
    calle:{
        type: String,
        required: true,
    },
},
ciudad: {
    type: String,
    required: true,
},
codigoPostal: {
    type: String,
},
// 1:N: muchos alumnos pertenecen a una carrera 
carrera: {
    type: Types.ObjectId,
    ref:"Carrera",
    required: true,
},
// N:M: un alumno cursa varias materias 
materias: [
    {
        type: Types.ObjectId,
        ref: "Materia",
    },
],
//eliminación lógica
activo: {
    type: Boolean,
    default: true,
},
},
{
timestamps: true,
versionKey: false,    
},
);

export const AlumnoModel = model ("Alumno", alumnoSchema);