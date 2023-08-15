import { IAuthUser } from "@/types/typings";

interface ChatsViewProps {
  currentUser: IAuthUser;
}

const ChatsView = ({ currentUser }: ChatsViewProps) => {
  return (
    <div className="px-4 py-6">
      <div>
        <h3 className="text-white text-lg">{currentUser.username}</h3>
      </div>
      <div className="min-h-[200rem]"></div>
    </div>
  );
};

export default ChatsView;
