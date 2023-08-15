import React from "react";
import { Socket } from "socket.io-client";

export interface IAuthUser extends IUser {
  __v: number;
  exp: number;
  iat: number;
}

export interface IUser {
  _id: string;
  email: string;
  fullName: string;
  username: string;
}

export interface IChatMessage {
  _id: string;
  fromSelf: boolean;
  message: string;
}

export interface ISocketContextState {
  socket: Socket | undefined;
  uid: string;
  users: string[];
  messages: IChatMessage[];
}

// socket context types
export type TSocketContextActions =
  | "update_uid"
  | "update_users"
  | "remove_user"
  | "send-message"
  | "add-user"
  | "message-received"
  | "update_socket";

export type TSocketContextPayload = string | string[] | Socket | IChatMessage[];

export interface ISocketContextActions {
  type: TSocketContextActions;
  payload: TSocketContextPayload;
}

export interface ISocketContextProps {
  socketState: ISocketContextState;
  socketDispatch: React.Dispatch<ISocketContextActions>;
}
