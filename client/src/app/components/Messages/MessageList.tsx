"use client";

import { useState } from "react";
import MessageItem from "./MessageItem";
import { Message } from "@/app/types/message";

export default function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);

  return (
    <ul className="overflow-y-auto p-0 m-0">
      {messages.map((message) => (
        <MessageItem key={message.id} {...message} />
      ))}
    </ul>
  );
}
