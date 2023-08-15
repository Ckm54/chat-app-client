import { IAuthUser, IUser } from "@/types/typings";
import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { cn, logoutUser } from "@/lib/utils";
import { Loader, LogOut, MoreVertical } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "@/ui/button";
import { useNavigate } from "react-router-dom";
import socketContext from "@/contexts/Socket/socket.context";

interface UserListProps {
  users: IUser[];
  currentUser: IAuthUser;
  handleChatChange: (user: IUser) => void;
  loading: boolean;
}
const UserList = ({
  users,
  currentUser,
  handleChatChange,
  loading,
}: UserListProps) => {
  const [currentChat, setCurrentChat] = React.useState<string>();
  const navigate = useNavigate();
  const { socket } = React.useContext(socketContext).socketState;
  const { socketDispatch } = React.useContext(socketContext);

  const switchChat = ({ id, user }: { id: string; user: IUser }) => {
    setCurrentChat(id);
    handleChatChange(user);
  };
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-x-4 px-4 py-6">
        <h2 className="text-white">ChatApp</h2>
      </div>
      <Separator />

      {/* other users here */}

      <div
        className={cn(
          !loading && "px-4 py-6",
          "flex-1 flex flex-col gap-y-[0.4rem] overflow-auto relative"
        )}
      >
        <>
          {loading ? (
            <div className="absolute w-full h-full flex flex-col items-center justify-center top-0 bg-black/25">
              <Loader className="w-8 h-8 animate-spin text-white" />
              <p className="text-neutral-200 italic">Loading chats...</p>
            </div>
          ) : (
            <>
              {users.map((user) => (
                <div
                  key={user._id}
                  className={cn(
                    currentChat === user._id && "bg-blue-500",
                    "flex items-start gap-x-4 rounded-md hover:bg-blue-600 p-4 cursor-pointer transition-colors duration-150"
                  )}
                  onClick={() => switchChat({ id: user._id, user })}
                >
                  <Avatar>
                    <AvatarFallback>
                      {user.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="text-neutral-200">{user.username}</h3>
                </div>
              ))}
            </>
          )}
        </>
      </div>

      <Separator />
      {/* render current user at bottom */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-x-4">
          <Avatar>
            <AvatarFallback className="bg-green-600 text-white text-xl font-semibold">
              {currentUser.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h3 className="text-white">
            Logged in as:{" "}
            <span className="italic">@{currentUser.username}</span>
          </h3>
        </div>
        <Popover>
          <PopoverTrigger className="bg-gray-600 rounded-full p-2 hover:bg-gray-700 transition">
            <MoreVertical className="h-6 w-6 text-white" />
          </PopoverTrigger>
          <PopoverContent className="max-w-min p-0">
            <Button
              variant={"destructive"}
              className="flex gap-x-2"
              onClick={() => {
                logoutUser();
                socket?.on("user_disconnected", (uid: string) => {
                  console.log("user disconnected");
                  socketDispatch({ type: "remove_user", payload: uid });
                });
                socket?.off();
                navigate("/", { replace: true });
              }}
            >
              Logout <LogOut className="w-4 h-4" />
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default UserList;
