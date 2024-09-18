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
import { AuthService } from "src/modules/auth/auth.service";
import { UserPayload } from "src/modules/users/interfaces/users.interface";
import { UserService } from "../users/users.service";
import "dotenv/config";

interface Message {
  id: string;
  content: string | null;
  seen: boolean;
  files: any[];
  user: any;
  conversation: { id: string };
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

interface Conversation {
  id: string;
  name: string;
  isGroup: boolean;
  messages: Message[];
  deletedAt: string | null;
  createdAt: Date;
}

interface ConversationPayload {
  id: string;
  type: "add" | "remove";
}

interface CallUser {
  callerId: string;
  calleeId: string;
  hasVideo: boolean;
  room: string;
}

@WebSocketGateway({
  cors: {
    origin: [
      process.env.CLIENT_URL,
      process.env.ADMIN_URL,
      "http://192.168.1.4:3000",
    ],
  },
  transports: ["websocket"],
})
export class EventsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger: Logger = new Logger(EventsGateway.name);
  private onlines: Online[] = [];
  @WebSocketServer() server: Server;

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  afterInit(server: Server) {
    this.logger.log("Initialized");
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

  async removeOnline(socketId: string) {
    const onlineIndex = this.onlines.findIndex(
      (online) => online.socketId === socketId,
    );

    if (onlineIndex !== -1) {
      const userId = this.onlines[onlineIndex].userId;
      await this.userService.update(userId, {
        offlineAt: new Date(),
      });
      this.onlines.splice(onlineIndex, 1);
    }
    this.server.emit("onlines", this.onlines);
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    this.logger.log(`Client Disconnected: ${client.id}`);

    await this.removeOnline(client.id);
  }

  async handleConnection(@ConnectedSocket() client: Socket, ...args: any[]) {
    const token = client.handshake.auth.token;

    try {
      const userPayload =
        await this.authService.verifyToken<UserPayload>(token);

      this.addOnline(client.id, userPayload.userId);
      this.logger.log(`Client Connected: ${client.id}`);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @SubscribeMessage("message")
  handleMessage(@MessageBody() payload: Message) {
    this.server.emit("message", payload);
  }

  @SubscribeMessage("conversation")
  handleConversation(@MessageBody() payload: ConversationPayload) {
    this.server.emit("conversation", payload);
  }

  @SubscribeMessage("joinCall")
  handleJoinCall(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: string,
  ) {
    client.join(room);
  }

  @SubscribeMessage("callUser")
  handleCallUser(@MessageBody() payload: CallUser) {
    const callee = this.onlines.find(
      (online) => online.userId === payload.calleeId,
    );

    if (callee) {
      this.server.to(callee.socketId).emit("callUser", payload);
    }
  }

  @SubscribeMessage("endCall")
  handleEndCall(@ConnectedSocket() client: Socket) {
    client.broadcast.emit("endCall");
  }

  @SubscribeMessage("remoteCamOn")
  handleRemoteCamOn(
    @ConnectedSocket() client: Socket,
    @MessageBody() isOn: boolean,
  ) {
    client.broadcast.emit("remoteCamOn", isOn);
  }

  @SubscribeMessage("typing")
  handleTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: Typing,
  ) {
    client.broadcast.emit("typing", payload);
  }
}
