const express = require('express');
const router = express.Router();
const SensorService = require('../services/sensorService'); 
const service = new SensorService();

/**
 * @swagger
 * components:
 *   schemas:
 *     Sensor:
 *       type: object
 *       required:
 *         - type
 *         - unit
 *         - model
 *         - location
 *       properties:
 *         type:
 *           type: string
 *           enum: [temperature, humidity, co2, noise]
 *           description: Tipo de sensor
 *         unit:
 *           type: string
 *           enum: ['°C', '%', 'ppm', 'dB']
 *           description: Unidad de medida
 *         model:
 *           type: string
 *           description: Modelo del dispositivo
 *         location:
 *           type: string
 *           description: Coordenadas o ubicación física
 *         isActive:
 *           type: boolean
 *           description: Estado del sensor
 */

/**
 * @swagger
 * tags:
 *   name: Sensors
 *   description: API para administrar sensores
 */

/**
 * @swagger
 * /sensors:
 *   get:
 *     summary: Obtener todos los sensores
 *     tags: [Sensors]
 *     responses:
 *       200:
 *         description: Lista de sensores
 */
router.get('/', async (req, res, next) => {
  try {
    const sensors = await service.getAll();
    res.json(sensors);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /sensors:
 *   post:
 *     summary: Crear un nuevo sensor
 *     tags: [Sensors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sensor'
 *     responses:
 *       201:
 *         description: Sensor creado exitosamente
 */
router.post('/', async (req, res, next) => {
  try {
    const newSensor = await service.create(req.body);
    res.status(201).json(newSensor);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /sensors/{id}:
 *   get:
 *     summary: Obtener un sensor por ID
 *     tags: [Sensors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Sensor encontrado
 *       404:
 *         description: No encontrado
 */
router.get('/:id', async (req, res, next) => {
  try {
    const sensor = await service.getById(req.params.id);
    res.json(sensor);
  } catch (error) {
    res.status(404).json({ message: 'Sensor no encontrado' });
  }
});

/**
 * @swagger
 * /sensors/{id}:
 *   patch:
 *     summary: Actualizar parcialmente un sensor
 *     tags: [Sensors]
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
 *             $ref: '#/components/schemas/Sensor'
 *     responses:
 *       200:
 *         description: Sensor actualizado
 *       404:
 *         description: Sensor no encontrado
 */
router.patch('/:id', async (req, res, next) => {
  try {
    const updated = await service.update(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    res.status(404).json({ message: 'Sensor no encontrado' });
  }
});

/**
 * @swagger
 * /sensors/{id}:
 *   delete:
 *     summary: Eliminar un sensor
 *     tags: [Sensors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Sensor eliminado
 *       409:
 *         description: No se puede eliminar (tiene lecturas asociadas)
 */
router.delete('/:id', async (req, res, next) => {
  try {
    await service.delete(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error.message.includes('lecturas')) {
      return res.status(409).json({ message: error.message });
    }
    res.status(404).json({ message: 'Sensor no encontrado' });
  }
});

module.exports = router;
