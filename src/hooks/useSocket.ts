import { SocketOptions } from "dgram";
import React from "react";
import io, { ManagerOptions, Socket } from "socket.io-client";

// defines socket
export const useSocket = ({
  uri,
  opts,
}: {
  uri: string;
  opts?: Partial<ManagerOptions & SocketOptions> | undefined;
}): Socket => {
  const { current: socket } = React.useRef(io(uri, opts));

  React.useEffect(() => {
    if (socket) socket.close();
  }, [socket]);

  return socket;
};
