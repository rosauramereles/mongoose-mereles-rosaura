import mongoose from "mongoose";

export const startDB = async () => {
  try {
//Lee la URL de la conexión desde el archivo .env    
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado a la base de datos correctamente");
  } catch (error) {
    console.log("No se pudo conectar a la base de datos", error);
    process.exit(1);//Corta la app si no hay conexión
  }
};