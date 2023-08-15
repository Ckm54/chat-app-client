import { IUser } from "@/types/typings";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "@/ui/button";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "@/lib/utils";
import { LogOut } from "lucide-react";

interface ChatHeaderProps {
  currentChat: IUser;
}

const ChatHeader = ({ currentChat }: ChatHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex items-center justify-between bg-blue-800 p-4">
      <div className="flex items-center gap-x-4">
        <Avatar>
          <AvatarFallback className="bg-green-600 text-white text-xl font-semibold">
            {currentChat.username[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <h3 className="text-white text-lg">{currentChat.username}</h3>
      </div>
      <Button
        variant={"destructive"}
        className="flex gap-x-2"
        onClick={() => {
          logoutUser();
          navigate("/", { replace: true });
        }}
      >
        Logout <LogOut className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default ChatHeader;
