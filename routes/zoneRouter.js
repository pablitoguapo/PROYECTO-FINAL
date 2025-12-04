const express = require("express");
const ZoneService = require("../services/zoneService");
const router = express.Router();
const service = new ZoneService();

/**
 * @swagger
 * components:
 *   schemas:
 *     Zone:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         name:
 *           type: string
 *           description: Nombre de la zona
 *         description:
 *           type: string
 *           description: Descripción de la zona
 *         isActive:
 *           type: boolean
 *           description: Estado de la zona (activa/inactiva)
 */
/**
 * @swagger
 * tags:
 *   name: Zones
 *   description: API para administrar zonas
 */

/**
 * @swagger
 * /zones:
 *   get:
 *     summary: Obtiene todas las zonas
 *     tags: [Zones]
 *     responses:
 *       200:
 *         description: Lista de zonas
 */
router.get("/", async (req, res, next) => {
  try {
    const zones = await service.getAll();
    res.json(zones);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /zones:
 *   post:
 *     summary: Crea una nueva zona
 *     tags: [Zones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Zona creada
 */
router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const newZone = await service.create(body);
    res.status(201).json(newZone);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /zones/{id}:
 *   get:
 *     summary: Obtiene una zona por ID
 *     tags: [Zones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Zona encontrada
 *       404:
 *         description: No encontrada
 */
router.get("/:id", async (req, res) => {
  try {
    const zone = await service.getById(req.params.id);
    res.json(zone);
  } catch (error) {
    res.status(404).json({ message: "ID no encontrado" });
  }
});

/**
 * @swagger
 * /zones/{id}:
 *   patch:
 *     summary: Actualiza una zona por ID
 *     tags: [Zones]
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Zona actualizada
 *       404:
 *         description: Zona no encontrada
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
 * /zones/{id}:
 *   delete:
 *     summary: Elimina una zona
 *     tags: [Zones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Zona eliminada
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
