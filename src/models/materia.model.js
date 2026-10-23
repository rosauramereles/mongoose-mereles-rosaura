import { model, Schema } from "mongoose";

const materiaSchema = new Schema(
    {
        nombreMatria : {
            type: String,
            required: true,
            unique: true,
        },
        anio : {
            type: Number,
            required: true,
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