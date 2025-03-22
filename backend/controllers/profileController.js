const User = require('../models/User');

exports.uploadProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No se subió ningún archivo' });
    }

    const fileUrl = req.file.location;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ msg: 'Se requiere el userId' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: fileUrl },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    res.status(201).json({ msg: 'Imagen de perfil actualizada correctamente', user: updatedUser });
  } catch (error) {
    res.status(500).json({ msg: 'Error interno del servidor' });
  }
};
