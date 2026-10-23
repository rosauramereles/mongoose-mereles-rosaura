import { Router } from "express";
import { validarCampos } from "../middlewares/validar.middleware.js";
import { createCarrera, 
         deleteCarrera,
         getAllCarreras,
         getCarreraById,
        updateCarrera } 
from "../controllers/carrera.controller.js";

import {
  validarActualizarCarrera,
  validarCrearCarrera,
  validarId,
} from "../middlewares/carrera.validator.js";

export const carreraRouter = Router();

// Ruta para crear una carrera
carreraRouter.post("/carreras", validarCrearCarrera, validarCampos, createCarrera);

// Ruta para traer todas las carreras
carreraRouter.get("/carreras", getAllCarreras);

// Ruta para traer una carrera por id
carreraRouter.get("/carreras/:id", validarId, validarCampos, getCarreraById);

// Ruta para actualizar una carrera
carreraRouter.put("/carreras/:id", validarActualizarCarrera, validarCampos, updateCarrera);

// Ruta para eliminar una carrera
carreraRouter.delete("/carreras/:id", validarId, validarCampos, deleteCarrera);