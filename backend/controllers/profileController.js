const User = require('../models/User');

exports.uploadProfilePicture = async (req, res) => {
  try {
    // Verificamos que se haya subido un archivo
    if (!req.file) {
      return res.status(400).json({ msg: 'No se subió ningún archivo' });
    }
    // La URL pública del archivo devuelta por multer-s3-v3
    const fileUrl = req.file.location;
    
    // Obtenemos el userId desde el body o de la sesión/token (según tu implementación)
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ msg: 'Se requiere el userId' });
    }

    // Actualizamos el campo profilePicture en el usuario
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: fileUrl },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    res.json({ msg: 'Imagen de perfil actualizada correctamente', user: updatedUser });
  } catch (error) {
    console.error('Error al actualizar la imagen de perfil:', error);
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};
