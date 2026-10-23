import { matchedData } from "express-validator";
import { CarreraModel } from "../models/carrera.model.js";
import { AlumnoModel } from "../models/alumno.model.js";
import { LegajoModel } from "../models/legajo.model.js";

// Crear una carrera -> 201 Created
export const createCarrera = async (req, res) => {
  try {
    // Solo los datos que pasaron las validaciones
    const { nombre, duracionAnios } = matchedData(req);

    const newCarrera = await CarreraModel.create({
      nombre,
      duracionAnios,
    });

    return res.status(201).json({
      msg: "Carrera creada correctamente",
      data: newCarrera,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

// Traer todas las carreras activas -> 200 OK
export const getAllCarreras = async (req, res) => {
  try {
    // activo: true -> no trae las eliminadas lógicamente
    const carreras = await CarreraModel.find({ activo: true });

    return res.status(200).json({
      data: carreras,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

// Traer una carrera por id -> 200 OK
export const getCarreraById = async (req, res) => {
  try {
    const { id } = matchedData(req);

    const carrera = await CarreraModel.findOne({ _id: id, activo: true });

    if (!carrera) {
      return res.status(404).json({
        msg: "Carrera no encontrada",
      });
    }

    return res.status(200).json({
      data: carrera,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

// Actualizar una carrera -> 200 OK
export const updateCarrera = async (req, res) => {
  try {
    // id viene de la URL; nombre y duracionAnios, del body
    const { id, nombre, duracionAnios } = matchedData(req);

    // new: true -> devuelve la carrera ya actualizada
    const carreraActualizada = await CarreraModel.findOneAndUpdate(
      { _id: id, activo: true },
      { nombre, duracionAnios },
      { new: true }
    );

    if (!carreraActualizada) {
      return res.status(404).json({
        msg: "Carrera no encontrada",
      });
    }

    return res.status(200).json({
      msg: "Carrera actualizada correctamente",
      data: carreraActualizada,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};

// Eliminar una carrera (lógica + cascada) -> 200 OK
export const deleteCarrera = async (req, res) => {
  try {
    const { id } = matchedData(req);

    // 1) Eliminación LÓGICA: no se borra, se marca como inactiva
    const carrera = await CarreraModel.findOneAndUpdate(
      { _id: id, activo: true },
      { activo: false },
      { new: true }
    );

    if (!carrera) {
      return res.status(404).json({
        msg: "Carrera no encontrada",
      });
    }

    // 2) Eliminación en CASCADA: desactiva los alumnos de esa carrera...
    const alumnos = await AlumnoModel.find({ carrera: id, activo: true }).select("_id");
    const idsAlumnos = alumnos.map((alumno) => alumno._id);

    await AlumnoModel.updateMany({ _id: { $in: idsAlumnos } }, { activo: false });

    // ...y también los legajos de esos alumnos
    await LegajoModel.updateMany({ alumno: { $in: idsAlumnos } }, { activo: false });

    return res.status(200).json({
      msg: `Carrera eliminada correctamente. Alumnos desactivados en cascada: ${idsAlumnos.length}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Error interno del servidor",
    });
  }
};