import { Logger } from "@nestjs/common";
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { AuthService } from "src/auth/auth.service";
import { UserPayload } from "src/users/interfaces/users.interface";

interface Message {
  id: string;
  content: string | null;
  seen: boolean;
  files: any[];
  user: any;
  createdAt: Date;
}

interface Typing {
  typing: boolean;
  username: string;
}

interface Online {
  userId: string;
  socketId: string;
}

@WebSocketGateway({
  cors: {
    origin: process.env.CLIENT_URL,
  },
  transports: ["websocket"],
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger(EventsGateway.name);
  private onlines: Online[] = [];
  @WebSocketServer() server: Server;

  constructor(private authService: AuthService) {}

  afterInit(server: Server) {
    this.logger.log("Initialized");
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.logger.log(`Client Disconnected: ${client.id}`);

    this.removeOnline(client.id);
  }

  async handleConnection(@ConnectedSocket() client: Socket, ...args: any[]) {
    const token = client.handshake.auth.token;

    try {
      const userPayload = await this.authService.verifyToken<UserPayload>(
        token,
        {
          secret: this.authService.accessSecret,
        },
      );

      this.addOnline(client.id, userPayload.userId);
    } catch (error) {
      console.log(error);
      throw new WsException(error.message);
    }

    this.logger.log(`Client Connected: ${client.id}`);
  }

  addOnline(socketId: string, userId: string) {
    const isExists = this.onlines.some((online) => online.userId === userId);

    if (!isExists) {
      this.onlines.push({
        socketId,
        userId,
      });
    }

    this.server.emit("onlines", this.onlines);
  }

  removeOnline(socketId: string) {
    const onlineIndex = this.onlines.findIndex(
      (online) => online.socketId === socketId,
    );

    if (onlineIndex !== -1) {
      this.onlines.splice(onlineIndex, 1);
    }
    this.server.emit("onlines", this.onlines);
  }

  @SubscribeMessage("message")
  handleMessage(@MessageBody() payload: Message) {
    this.server.emit("message", payload);
  }

  @SubscribeMessage("typing")
  handleTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: Typing,
  ) {
    client.broadcast.emit("typing", payload);
  }
}
