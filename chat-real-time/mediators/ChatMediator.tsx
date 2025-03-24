import SocketService from '@/utils/SocketService';

class ChatMediator {
  private static instance: ChatMediator;
  private observers: ((message: any) => void)[] = [];

  private constructor() {
    // Al instanciar el mediador, conectamos el socket y escuchamos 'receiveMessage'
    const socketService = SocketService.getInstance();
    socketService.connect();

    socketService.on('receiveMessage', (message) => {
      this.notifyObservers(message);
    });
  }

  public static getInstance(): ChatMediator {
    if (!ChatMediator.instance) {
      ChatMediator.instance = new ChatMediator();
    }
    return ChatMediator.instance;
  }

  // Suscribir un observer (ej: ChatScreen) para recibir mensajes
  public subscribe(observer: (message: any) => void) {
    this.observers.push(observer);
  }

  // Desuscribir un observer
  public unsubscribe(observer: (message: any) => void) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  private notifyObservers(message: any) {
    this.observers.forEach((obs) => obs(message));
  }

  // Unirse a una conversación
  public joinConversation(conversationId: string) {
    const socketService = SocketService.getInstance();
    socketService.emit('joinConversation', conversationId);
  }

  // Salir de una conversación
  public leaveConversation(conversationId: string) {
    const socketService = SocketService.getInstance();
    socketService.emit('leaveConversation', conversationId);
  }

  // Enviar un mensaje
  public sendMessage(conversationId: string, sender: string, content: string) {
    const socketService = SocketService.getInstance();
    socketService.emit('sendMessage', {
      conversationId,
      sender,
      content,
      type: 'text',
    });
  }
}

export default ChatMediator.getInstance();
