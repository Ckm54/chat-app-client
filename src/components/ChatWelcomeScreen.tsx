import { IAuthUser } from "@/types/typings";

interface ChatWelcomeScreenProps {
  currentUser: IAuthUser;
}

const ChatWelcomeScreen = ({ currentUser }: ChatWelcomeScreenProps) => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <div className="flex items-center flex-col gap-y-2 text-white">
        <div className="text-6xl animate-pulse">🫂</div>
        <h2 className="text-lg">
          Welcome, <span className="italic">@{currentUser.username}</span>
        </h2>
        <p>Please select a conversation to start messaging!</p>
      </div>
    </div>
  );
};

export default ChatWelcomeScreen;
