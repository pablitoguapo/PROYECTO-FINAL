const express = require("express");
const DeviceService = require("../services/DeviceService");
const router = express.Router();
const service = new DeviceService();

/**
 * @swagger
 * components:
 *   schemas:
 *     Device:
 *       type: object
 *       required:
 *         - serialNumber
 *         - model
 *         - ownerId
 *         - zoneId
 *       properties:
 *         serialNumber:
 *           type: string
 *           description: Número de serie del dispositivo
 *         model:
 *           type: string
 *           description: Modelo del dispositivo
 *         ownerId:
 *           type: string
 *           description: ID del usuario dueño del dispositivo
 *         zoneId:
 *           type: string
 *           description: ID de la zona donde está instalado
 *         installedAt:
 *           type: string
 *           format: date-time
 *           description: Fecha de instalación
 *         status:
 *           type: string
 *           enum: [active, maintenance, offline]
 *         sensors:
 *           type: array
 *           description: Sensores asociados
 *           items:
 *             type: string
 */
/**
 * @swagger
 * tags:
 *   name: Devices
 *   description: Administración de dispositivos
 */

/**
 * @swagger
 * /devices:
 *   get:
 *     summary: Obtener todos los dispositivos
 *     tags: [Devices]
 *     responses:
 *       200:
 *         description: Lista de dispositivos
 */
router.get("/", async (req, res, next) => {
  try {
    const devices = await service.getAll();
    res.json(devices);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /devices:
 *   post:
 *     summary: Crear un dispositivo
 *     tags: [Devices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serialNumber:
 *                 type: string
 *               model:
 *                 type: string
 *               ownerId:
 *                 type: string
 *               zoneId:
 *                 type: string
 *               installedAt:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [active, maintenance, offline]
 *               sensors:
 *                 type: array
 *                 items:
 *                   type: string
 *             required:
 *               - serialNumber
 *               - model
 *               - ownerId
 *               - zoneId
 *     responses:
 *       201:
 *         description: Dispositivo creado
 */
router.post("/", async (req, res) => {
  try {
    const newDevice = await service.create(req.body);
    res.status(201).json(newDevice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /devices/{id}:
 *   get:
 *     summary: Obtener un dispositivo por ID
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Dispositivo encontrado
 */
router.get("/:id", async (req, res) => {
  try {
    const device = await service.getById(req.params.id);
    res.json(device);
  } catch (error) {
    res.status(404).json({ message: "ID no encontrado" });
  }
});

/**
 * @swagger
 * /devices/{id}:
 *   patch:
 *     summary: Actualizar un dispositivo
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serialNumber:
 *                 type: string
 *               model:
 *                 type: string
 *               ownerId:
 *                 type: string
 *               zoneId:
 *                 type: string
 *               installedAt:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [active, maintenance, offline]
 *               sensors:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Dispositivo actualizado
 */
router.patch("/:id", async (req, res) => {
  try {
    const updated = await service.update(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /devices/{id}:
 *   delete:
 *     summary: Eliminar un dispositivo
 *     tags: [Devices]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Dispositivo eliminado
 */
router.delete("/:id", async (req, res) => {
  try {
    const result = await service.delete(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
