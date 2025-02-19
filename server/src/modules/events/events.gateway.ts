import { Injectable, Logger } from "@nestjs/common";
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import { AuthService } from "src/modules/auth/auth.service";
import { UserPayload } from "src/modules/users/interfaces/users.interface";
import { UsersService } from "../users/users.service";
import "dotenv/config";
import { MessagesService } from "../messages/messages.service";
import { CallStatus, CallType } from "../messages/enums/calls.enum";

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
  conversationId: string;
}

interface EndCall {
  callStatus: CallStatus;
  callType: CallType;
  conversation: string;
  callerId: string;
  calleeId: string;
  isCallee: boolean;
  room: string;
}

@Injectable()
export class WebSocketService {
  private server: Server;

  setServer(server: Server) {
    this.server = server;
  }

  getServer(): Server {
    return this.server;
  }
}

@WebSocketGateway({
  cors: {
    origin: [process.env.CLIENT_URL, process.env.ADMIN_URL],
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
    private usersService: UsersService,
    private messageService: MessagesService,
    private webSocketService: WebSocketService,
  ) {}

  afterInit(server: Server) {
    this.logger.log("Initialized");
    this.webSocketService.setServer(server);
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
      await this.usersService.update(userId, {
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

  async handleConnection(@ConnectedSocket() client: Socket) {
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

  @SubscribeMessage("outgoingCall")
  handleOutgoingCall(@MessageBody() payload: CallUser) {
    const callee = this.onlines.find(
      (online) => online.userId === payload.calleeId,
    );

    if (callee) {
      this.server.to(callee.socketId).emit("incomingCall", payload);
    }
  }

  @SubscribeMessage("endCall")
  async handleEndCall(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: EndCall,
  ) {
    client.broadcast.to(payload.room).emit("endCall");

    client.leave(payload.room);

    if (payload.isCallee) return;

    const message = await this.messageService.create(
      {
        callStatus: payload.callStatus,
        callType: payload.callType,
        conversation: payload.conversation,
        callerId: payload.callerId,
        calleeId: payload.calleeId,
      },
      [],
      payload.callerId,
    );

    this.server.emit("message", message);
  }

  @SubscribeMessage("rejectCall")
  handleRejectCall(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: CallUser,
  ) {
    client.broadcast.to(payload.room).emit("callRejected", payload);
  }

  @SubscribeMessage("typing")
  handleTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: Typing,
  ) {
    client.broadcast.emit("typing", payload);
  }
}
