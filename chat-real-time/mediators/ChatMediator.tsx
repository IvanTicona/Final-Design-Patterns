import { io, Socket } from "socket.io-client";

class ChatMediator {
  private socket: Socket;
  private observers: ((message: any) => void)[] = [];

  constructor(serverUrl: string) {
    this.socket = io(serverUrl);
    
    // Listener para recibir mensajes y notificar a observadores
    this.socket.on("receiveMessage", (message) => {
      console.log("Mediator: received message", message);
      this.notifyObservers(message);
    });
  }

  subscribe(observer: (message: any) => void) {
    this.observers.push(observer);
  }

  unsubscribe(observer: (message: any) => void) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  private notifyObservers(message: any) {
    this.observers.forEach((observer) => observer(message));
  }

  sendMessage(conversationId: string, sender: string, content: string) {
    this.socket.emit("sendMessage", { conversationId, sender, content, type: "text" });
  }

  joinConversation(conversationId: string) {
    this.socket.emit("joinConversation", conversationId);
  }

  disconnect() {
    this.socket.disconnect();
  }
}

const chatMediator = new ChatMediator("http://192.168.1.215:3000");
export default chatMediator;
