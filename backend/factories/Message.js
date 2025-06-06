class Message {
  constructor({ sender, content, timestamp, type }) {
    if (new.target === Message) {
      throw new Error("No se puede instanciar directamente la clase abstracta Message");
    }
    this.sender = sender;
    this.content = content;
    this.timestamp = timestamp || new Date();
    this.type = type;
  }

  getType() {
    throw new Error("El método getType() debe ser implementado en la subclase");
  }
}

module.exports = Message;
