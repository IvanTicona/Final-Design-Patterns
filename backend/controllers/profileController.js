const User = require('../models/User');
const Conversation = require('../models/Conversation'); // <-- Agregado
const { Types } = require('mongoose');

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

    const userObjId = new Types.ObjectId(userId);

    await Conversation.updateMany(
      { "participants._id": userObjId },
      { $set: { "participants.$[elem].profilePicture": fileUrl } },
      { arrayFilters: [{ "elem._id": userObjId }] }
    );

    return res.status(201).json({
      msg: 'Imagen de perfil actualizada correctamente',
      user: updatedUser
    });
  } catch (error) {
    console.error('Error al actualizar imagen de perfil:', error);
    return res.status(500).json({ msg: 'DORIAN Error interno del servidor' });
  }
};
