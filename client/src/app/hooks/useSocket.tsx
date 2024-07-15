"use client";
import { useContext } from "react";
import { SocketContext } from "../providers/SocketProvider";

export default function useSocket() {
  return useContext(SocketContext);
}
