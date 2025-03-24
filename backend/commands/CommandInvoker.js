class CommandInvoker {
  constructor() {
    this.history = [];
  }

  async executeCommand(command) {
    const result = await command.execute();
    this.history.push(command);
    return result;
  }

  // Implementar undo si los comandos lo soportan
  async undo() {
    const command = this.history.pop();
    if (command && command.undo) {
      return await command.undo();
    }
    throw new Error("No command to undo or undo not supported");
  }
}

module.exports = CommandInvoker;
