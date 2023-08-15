import {
  SocketContextProvider,
  SocketReducer,
  defaultSocketContextState,
} from "@/contexts/Socket/socket.context";
import { useSocket } from "@/hooks/useSocket";
import React, { PropsWithChildren } from "react";

export interface ISocketComponentProps extends PropsWithChildren {}

const SocketComponent = ({ children }: ISocketComponentProps) => {
  const [socketState, socketDispatch] = React.useReducer(
    SocketReducer,
    defaultSocketContextState
  );
  const [loading, setLoading] = React.useState(false);

  const user = localStorage.getItem("user");
  const socket = useSocket({
    uri: "ws://localhost:8000",
    opts: {
      reconnectionAttempts: 5,
      reconnectionDelay: 5000,
      autoConnect: false,
      transports: ["websocket"],
    },
  });

  React.useEffect(() => {
    if (!user) return;
    // connect to websocket
    socket.connect();
    // save socket to context
    socketDispatch({ type: "update_socket", payload: socket });
    // start listening to events
    startListeners();
    // send a conn handshake
    sendHandshake();
  }, [socket]);

  const startListeners = () => {
    // user connected
    socket.on("user_connected", (users: string[]) => {
      console.log("User connected");
      socketDispatch({ type: "update_users", payload: users });
    });

    socket.on("user_disconnected", (uid: string) => {
      console.log("user disconnected");
      socketDispatch({ type: "remove_user", payload: uid });
    });

    socket.on("send-message", (message) => {
      console.log("sending", message);
      socketDispatch({ type: "send-message", payload: message });
    });

    socket.on("message-received", (message) => {
      console.log("receiving", message);
      socketDispatch({ type: "message-received", payload: message });
    });
    // reconnect
    socket.io.on("reconnect", (attempt) => {
      console.log("Reconnected on attempt ", attempt);
    });
    // reconnect attempt
    socket.io.on("reconnect_attempt", (attempt) => {
      console.log("Reconnection attempt: ", attempt);
    });
    // reconect error
    socket.io.on("reconnect_error", (error) => {
      console.log("Reconnect error ", error);
    });

    // reconnect failed
    socket.io.on("reconnect_failed", () => {
      console.log("Reconnect failure");
      alert("Could not connect to websocket");
    });
  };

  const sendHandshake = () => {
    console.log("Sending handshake...");
    socket.emit("handshake", (uid: string, users: string[]) => {
      console.log("handshake message received");
      socketDispatch({ type: "update_uid", payload: uid });
      socketDispatch({ type: "update_users", payload: users });
      setLoading(false);
    });
  };

  if (loading) return <p>Loading socket...</p>;
  return (
    <SocketContextProvider value={{ socketState, socketDispatch }}>
      {children}
    </SocketContextProvider>
  );
};

export default SocketComponent;
