const generateChatRoomId = (userId1, userId2) => {
  // Ordena los IDs de forma lexicográfica
  return [userId1, userId2].sort().join('_');
};

module.exports = { generateChatRoomId };
