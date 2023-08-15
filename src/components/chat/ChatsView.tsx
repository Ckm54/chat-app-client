import { cn } from "@/lib/utils";
import { IAuthUser, IChatMessage } from "@/types/typings";
import { Loader } from "lucide-react";

interface ChatsViewProps {
  currentUser: IAuthUser;
  chatMessages: IChatMessage[];
  isLoading: boolean;
}

const ChatsView = ({
  // currentUser,
  chatMessages,
  isLoading,
}: ChatsViewProps) => {
  return (
    <div className="relative h-full">
      {isLoading ? (
        <div className="absolute w-full h-full flex flex-col items-center justify-center top-0 bg-black/25">
          <Loader className="w-8 h-8 animate-spin text-white" />
          <p className="text-neutral-200 italic">Loading chats...</p>
        </div>
      ) : (
        <div className="px-4 py-6 flex flex-col gap-y-4 overflow-auto">
          {chatMessages.map((message, index) => (
            <div
              key={index}
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
    </div>
  );
};

export default ChatsView;
