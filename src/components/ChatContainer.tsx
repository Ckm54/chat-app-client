import { IAuthUser, IUser } from "@/types/typings";
import ChatHeader from "./chat/ChatHeader";
import ChatsView from "./chat/ChatsView";
import ChatInputForm from "./chat/ChatInputForm";
import { toast } from "react-hot-toast";
import axios from "axios";
import { BASE_API_URL } from "@/lib/constants";
import React from "react";

interface ChatContainerProps {
  currentUser: IAuthUser;
  currentChat: IUser;
}

const ChatContainer = ({ currentUser, currentChat }: ChatContainerProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const handleSendMessage = async (message: string) => {
    setIsLoading(true);
    try {
      const requestData = {
        from: currentUser._id,
        to: currentChat._id,
        message,
      };
      const response = await axios.post(
        `${BASE_API_URL}/messages/addmsg`,
        requestData
      );

      console.log(response);
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
        <ChatsView currentUser={currentUser} />
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