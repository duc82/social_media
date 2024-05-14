import { Logger } from "@nestjs/common";
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { FriendShip } from "src/users/entities/friendships.entity";

interface Message {
  id: string;
  username: string;
  message: string;
  sentAt?: string;
}

interface Typing {
  typing: boolean;
  username: string;
}

interface FriendRequest {
  userId: string;
  friendship: FriendShip | null;
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
  private logger: Logger = new Logger("MessageGateway");
  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    this.logger.log("Initialized");
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client Connected: ${client.id}`);
  }

  @SubscribeMessage("friendRequest")
  handleFriendRequest(client: Socket, payload: FriendRequest) {
    client.broadcast.emit("friendRequest", payload);
  }

  @SubscribeMessage("message")
  handleMessage(client: Socket, payload: Message) {
    payload.id = client.id;
    payload.sentAt = new Date().toLocaleString("vi-VN", {
      dateStyle: "short",
      timeStyle: "short",
    });
    this.handleTyping(client, { typing: false, username: payload.username });
    this.server.emit("message", payload);
  }

  @SubscribeMessage("typing")
  handleTyping(client: Socket, payload: Typing) {
    client.broadcast.emit("typing", payload);
  }
}
