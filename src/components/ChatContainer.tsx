import socketContext from "@/contexts/Socket/socket.context";
import { BASE_API_URL } from "@/lib/constants";
import { IAuthUser, IChatMessage, IUser } from "@/types/typings";
import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import { v4 as uuidV4 } from "uuid";
import ChatHeader from "./chat/ChatHeader";
import ChatInputForm from "./chat/ChatInputForm";
import ChatsView from "./chat/ChatsView";

interface ChatContainerProps {
  currentUser: IAuthUser;
  currentChat: IUser;
}

const ChatContainer = ({ currentUser, currentChat }: ChatContainerProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [loadingMessages, setLoadingMessages] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [receivedMessage, setReceivedMessage] =
    React.useState<IChatMessage | null>(null);
  const [chatMessages, setChatMessages] = React.useState<IChatMessage[]>([]);
  const { socketDispatch } = React.useContext(socketContext);

  const { socket } = React.useContext(socketContext).socketState;

  // fetch this chat's messages when this container loads
  React.useEffect(() => {
    const fetchMessages = async () => {
      setLoadingMessages(true);
      try {
        const response = await axios.post(
          `${BASE_API_URL}/messages/get-messages`,
          {
            from: currentUser._id,
            to: currentChat._id,
          }
        );

        if (response.status !== 200) {
          toast.error("Something went wrong!");
        }

        setChatMessages(response.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log("error fetching messages: " + error);
      } finally {
        setLoadingMessages(false);
      }
    };

    fetchMessages();
  }, [currentChat, currentUser]);

  React.useEffect(() => {
    if (socket) {
      socket.on("message-received", (message) => {
        const data = {
          fromSelf: false,
          message: message.message,
          _id: uuidV4(),
        };
        setReceivedMessage(data);
      });
    }
  }, [socket]);

  // when message arrives run this
  React.useEffect(() => {
    // receivedMessage && setChatMessages((prev) => [...prev, receivedMessage]);
    if (receivedMessage) {
      setChatMessages((prev) => [...prev, receivedMessage]);
    }
  }, [receivedMessage]);

  const handleSendMessage = async (message: string) => {
    setIsLoading(true);
    try {
      const requestData = {
        from: currentUser._id,
        to: currentChat._id,
        message,
      };

      const messages = [...chatMessages];
      messages.push({ fromSelf: true, message, _id: uuidV4() });
      setChatMessages(messages);

      socketDispatch({ type: "send-message", payload: chatMessages });
      socket?.emit("send-message", requestData);

      await axios.post(`${BASE_API_URL}/messages/addmsg`, requestData);

      toast.success("message sent");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setErrorMessage(error.response.data.message);
      console.log({ error });
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* chat section header */}
      <ChatHeader currentChat={currentChat} />
      {/* messages within this chat */}
      <div className="flex-1 overflow-auto">
        <ChatsView
          currentUser={currentUser}
          chatMessages={chatMessages}
          isLoading={loadingMessages}
        />
      </div>
      {/* form input */}
      <ChatInputForm
        handleSendMessage={handleSendMessage}
        isLoading={isLoading}
        error={error}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default ChatContainer;
