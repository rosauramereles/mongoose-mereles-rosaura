import express from "express";
import cors from "cors"; 
import "dotenv/config";// Carga las variables del .env
import { startDB } from "./src/config/database.js"; 
//import { userRouter } from "./src/routes/user.routes.js";//Importa las rutas específicas de usuarios 

//Inicializa la aplicación de Express
const app = express();

//Acá le defino el puerto que correrá mi servidor (lee del .env o usa por defecto el 3003)
const PORT = process.env.PORT || 3003;

//middlewares
app.use(express.json()); //Permite leer JSON en el body
app.use(cors()); //Habilita CORS

//Configuración de las rutas 
//app.use("/api", userRouter);

// Primero conecta a la BD y recién después levanta el servidor
app.listen(PORT, async () => {
  await startDB();
  console.log(`Servidor listo en el puerto ${PORT}`);
});

