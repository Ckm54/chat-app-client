import {
  IChatMessage,
  ISocketContextActions,
  ISocketContextProps,
  ISocketContextState,
} from "@/types/typings";
import React from "react";
import { Socket } from "socket.io-client";

export const defaultSocketContextState: ISocketContextState = {
  socket: undefined,
  uid: "",
  users: [],
  messages: [],
};

export const SocketReducer = (
  state: ISocketContextState,
  action: ISocketContextActions
) => {
  switch (action.type) {
    case "add-user":
      return { ...state, users: state.users.push(action.payload as string) };
    case "set-messages":
      return {
        ...state,
        messages: action.payload as unknown as IChatMessage[],
      };
    case "send-message":
      return {
        ...state,
        messsages: [...state.messages, action.payload],
      };
    case "message-received":
      console.log(action.payload);
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case "update_socket":
      return { ...state, socket: action.payload as Socket };
    case "remove_user":
      return {
        ...state,
        users: state.users.filter(
          (user_id) => user_id !== (action.payload as string)
        ),
      };
    case "update_uid":
      return { ...state, uid: action.payload as string };
    case "update_users":
      return { ...state, users: action.payload as string[] };
    default:
      return { ...state };
  }
};

const socketContext = React.createContext<ISocketContextProps>({
  socketState: defaultSocketContextState,
  socketDispatch: () => {},
});

export const SocketContextConsumer = socketContext.Consumer;
export const SocketContextProvider = socketContext.Provider;

export default socketContext;
