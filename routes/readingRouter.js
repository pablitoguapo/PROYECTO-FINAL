const express = require('express');
const router = express.Router();

const ReadingService = require('../services/readingService');
const readingService = new ReadingService();

/**
 * @swagger
 * components:
 *   schemas:
 *     Reading:
 *       type: object
 *       required:
 *         - sensorId
 *         - value
 *       properties:
 *         sensorId:
 *           type: string
 *           description: ID del sensor asociado (ObjectId)
 *         value:
 *           type: number
 *           description: Valor de la lectura
 *         time:
 *           type: string
 *           format: date-time
 *           description: Fecha de la lectura
 */

/**
 * @swagger
 * /readings:
 *   get:
 *     summary: Obtener todas las lecturas
 *     tags: [Readings]
 *     responses:
 *       200:
 *         description: Lista de lecturas
 */
router.get('/', async (req, res, next) => {
  try {
    const readings = await readingService.getAll();
    res.json(readings);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /readings:
 *   post:
 *     summary: Crear una nueva lectura
 *     tags: [Readings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - sensorId
 *               - value
 *             properties:
 *               sensorId:
 *                 type: string
 *                 description: ID del sensor asociado
 *               value:
 *                 type: number
 *                 description: Valor numérico de la lectura
 *               time:
 *                 type: string
 *                 format: date-time
 *                 description: Fecha/hora de la lectura (opcional)
 *     responses:
 *       201:
 *         description: Lectura creada
 *       400:
 *         description: Error de validación (sensor no existe)
 */
router.post('/', async (req, res, next) => {
  try {
    const newReading = await readingService.create(req.body);
    res.status(201).json(newReading);
  } catch (error) {
    if (error.message.includes("no existe")) {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
});


/**
 * @swagger
 * /readings/{id}:
 *   get:
 *     summary: Obtener una lectura por ID
 *     tags: [Readings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalle de la lectura
 */
router.get('/:id', async (req, res, next) => {
  try {
    const reading = await readingService.getById(req.params.id);
    res.json(reading);
  } catch (error) {
    if (error.message.includes("no encontrada")) {
      return res.status(404).json({ message: error.message });
    }
    next(error);
  }
});

/**
 * @swagger
 * /readings/{id}:
 *   patch:
 *     summary: Actualizar parcialmente una lectura
 *     tags: [Readings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               zoneId:
 *                 type: string
 *                 description: ID de la zona relacionada
 *               value:
 *                 type: number
 *                 description: Valor numérico de la lectura
 *               isActive:
 *                 type: boolean
 *                 description: Estado de la lectura
 *     responses:
 *       200:
 *         description: Lectura actualizada
 */
router.patch('/:id', async (req, res, next) => {
  try {
    const updated = await readingService.update(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    if (error.message.includes("no encontrada")) {
      return res.status(404).json({ message: error.message });
    }
    next(error);
  }
});

/**
 * @swagger
 * /readings/{id}:
 *   delete:
 *     summary: Eliminar una lectura
 *     tags: [Readings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lectura eliminada
 */
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await readingService.delete(req.params.id);
    res.json({ message: "Lectura eliminada correctamente", id: deleted.id });
  } catch (error) {
    if (error.message.includes("no encontrada")) {
      return res.status(404).json({ message: error.message });
    }
    next(error);
  }
});

module.exports = router;
