function logError(err, req, res, next) {
  console.error(err);
  next(err);
}

function errorHandler(err, req, res, next) {

  // ID inválido (error común de Mongoose)
  if (err.name === "CastError") {
    return res.status(400).json({
      message: "ID inválido",
      detail: err.message
    });
  }

  // Error de validación de Mongoose
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Error de validación",
      errors: err.errors
    });
  }

  // Tus errores personalizados
  if (err.message.includes("no encontrada")) {
    return res.status(404).json({ message: err.message });
  }

  if (err.message.includes("no existe")) {
    return res.status(400).json({ message: err.message });
  }

  // Error desconocido
  return res.status(500).json({
    message: "Error interno",
    detail: err.message
  });
}

module.exports = { logError, errorHandler };