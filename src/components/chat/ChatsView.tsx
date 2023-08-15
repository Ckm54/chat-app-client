import { cn } from "@/lib/utils";
import { IAuthUser, IChatMessage, IUser } from "@/types/typings";
import { Loader } from "lucide-react";
import React from "react";

interface ChatsViewProps {
  currentUser: IAuthUser;
  chatMessages: IChatMessage[];
  isLoading: boolean;
  currentChat: IUser;
}

const ChatsView = ({
  // currentUser,
  chatMessages,
  isLoading,
  currentChat,
}: ChatsViewProps) => {
  const scrollRef: React.LegacyRef<HTMLDivElement | undefined> = React.useRef();

  // scroll messsages on overflow
  React.useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  return (
    <div className="relative h-full">
      {isLoading ? (
        <div className="absolute w-full h-full flex flex-col items-center justify-center top-0 bg-black/25">
          <Loader className="w-8 h-8 animate-spin text-white" />
          <p className="text-neutral-200 italic">Loading chats...</p>
        </div>
      ) : (
        <>
          {chatMessages.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center">
              <div className="flex flex-col items-center">
                <div className="text-3xl animate-bounce">👋</div>
                <h4 className="text-center text-lg text-white">
                  This is the begining of your conversation with <br />
                  <span className="italic">@{currentChat.username}</span>
                </h4>
              </div>
            </div>
          ) : (
            <div className="px-4 py-6 flex flex-col gap-y-4 overflow-auto">
              {chatMessages.map((message, index) => (
                <div
                  key={index}
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  ref={scrollRef}
                  className={cn(
                    message.fromSelf
                      ? "ml-auto bg-[#4f04]"
                      : "bg-[#4f004f] mr-auto",
                    "max-w-[40%] rounded-md break-all text-white p-[1rem]"
                  )}
                >
                  <div>
                    <p>{message.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChatsView;
