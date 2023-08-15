import { IAuthUser, IUser } from "@/types/typings";
import ChatHeader from "./chat/ChatHeader";
import ChatsView from "./chat/ChatsView";
import ChatInputForm from "./chat/ChatInputForm";

interface ChatContainerProps {
  currentUser: IAuthUser;
  currentChat: IUser;
}

const ChatContainer = ({ currentUser, currentChat }: ChatContainerProps) => {
  return (
    <div className="flex flex-col h-full">
      {/* chat section header */}
      <ChatHeader currentChat={currentChat} />
      {/* messages within this chat */}
      <div className="flex-1 overflow-auto">
        <ChatsView currentUser={currentUser} />
      </div>
      {/* form input */}
      <ChatInputForm />
    </div>
  );
};

export default ChatContainer;
