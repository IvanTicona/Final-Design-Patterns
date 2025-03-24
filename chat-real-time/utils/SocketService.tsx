import { io, Socket } from 'socket.io-client';
import { env } from '@/constants/environment';

class SocketService {
  private static instance: SocketService;
  private socket: Socket | null = null;

  private constructor() {
    // Inicializamos el socket con autoConnect en false
    this.socket = io(env.SERVER, {
      transports: ['websocket'],
      autoConnect: false,
    });
  }

  // Retorna la única instancia de SocketService
  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  // Conectar si no está conectado
  public connect() {
    if (this.socket && !this.socket.connected) {
      this.socket.connect();
    }
  }

  public disconnect() {
    if (this.socket && this.socket.connected) {
      this.socket.disconnect();
    }
  }

  public emit(eventName: string, data?: any) {
    if (!this.socket) return;
    this.socket.emit(eventName, data);
  }

  public on(eventName: string, callback: (...args: any[]) => void) {
    if (!this.socket) return;
    this.socket.on(eventName, callback);
  }

  public off(eventName: string, callback?: (...args: any[]) => void) {
    if (!this.socket) return;
    this.socket.off(eventName, callback);
  }
}

export default SocketService;
