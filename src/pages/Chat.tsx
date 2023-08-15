import ChatContainer from "@/components/ChatContainer";
import ChatWelcomeScreen from "@/components/ChatWelcomeScreen";
import UserList from "@/components/UserList";
import socketContext from "@/contexts/Socket/socket.context";
import { BASE_API_URL } from "@/lib/constants";
import { IAuthUser, IUser } from "@/types/typings";
import axios from "axios";
import jwt_decode from "jwt-decode";
import React from "react";
import { useNavigate } from "react-router-dom";

const ChatPage = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useState<IAuthUser>();
  const [currentChat, setCurrentChat] = React.useState<IUser>();
  const [isLoading, setIsLoading] = React.useState(false);

  const { socketState, socketDispatch } = React.useContext(socketContext);

  const socket = socketState.socket;

  const [users, setUsers] = React.useState<IUser[]>([]);
  // on launch first try getting logged in user from localstorage
  // if no user return back to homepage
  React.useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/", { replace: true });
      return;
    }

    setCurrentUser(jwt_decode(user));
    // setUser(JSON.parse(user));
  }, [navigate]);

  React.useEffect(() => {
    if (currentUser) {
      socketDispatch({ type: "add-user", payload: currentUser._id });
      socket?.emit("add-user", currentUser._id);
    }
  }, [currentUser, socketDispatch]);

  // fetch all registered users
  React.useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      // fetch users from api
      if (!currentUser) {
        // current user not yet set so just return
        return;
      }
      try {
        const response = await axios.get(
          `${BASE_API_URL}/auth/allusers/${currentUser._id}`
        );

        setUsers(response.data);
        setIsLoading(false);
      } catch (error) {
        console.warn(error);
        return;
      }
    };

    fetchUsers();
  }, [currentUser]);

  if (!currentUser) return null;

  const handleChangeChat = (chatUser: IUser) => {
    setCurrentChat(chatUser);
  };
  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center gap-y-2 items-center bg-[#131324]">
      <div className="w-full lg:w-[85vw] h-screen lg:h-[85vh] bg-[#000076c7] grid grid-cols-4">
        {/* user list view */}
        <div className="col-span-1 overflow-hidden border-r">
          <UserList
            users={users}
            currentUser={currentUser}
            handleChatChange={handleChangeChat}
            loading={isLoading}
          />
        </div>
        {/* message box */}
        <div className="col-span-3 overflow-hidden">
          {currentChat ? (
            <ChatContainer
              currentUser={currentUser}
              currentChat={currentChat}
            />
          ) : (
            <ChatWelcomeScreen currentUser={currentUser} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
