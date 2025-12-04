const express = require("express");
const UserService = require("../services/UserService");
const router = express.Router();
const service = new UserService();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API para administrar usuarios
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get("/", async (req, res, next) => {
  try {
    const users = await service.getAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, viewer, technician]
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Usuario creado
 */
router.post("/", async (req, res) => {
  try {
    const newUser = await service.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: No encontrado
 */
router.get("/:id", async (req, res) => {
  try {
    const user = await service.getById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(404).json({ message: "ID no encontrado" });
  }
});

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Actualiza un usuario por ID
 *     tags: [Users]
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
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [admin, viewer, technician]
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       404:
 *         description: Usuario no encontrado
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
 * /users/{id}:
 *   delete:
 *     summary: Elimina un usuario
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Usuario eliminado
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
