class MessageCommand {
  async execute() {
    throw new Error("execute() must be implemented");
  }
}

module.exports = MessageCommand;
