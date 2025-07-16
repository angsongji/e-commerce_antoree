import { useState } from "react";
import { FaComments } from "react-icons/fa";
import ChatBoxComponent from "./ChatBoxComponent";
const FloatingChat = () => {
  const [chats, setChats] = useState([
    {
      id: 1,
      content: "Bạn cần hỗ trợ gì?",
      createdAt: new Date().toTimeString().split(" ")[0],
      isUser: false
    }
  ]);
  const [open, setOpen] = useState(false);

  return (
    <div
      className=" fixed z-30 w-[30vw] bottom-5 right-5 flex flex-col gap-2 items-end"
    >
      {open && (
        <ChatBoxComponent chats={chats} setChats={setChats}/>
      )}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer w-12 h-12 rounded-full bg-[var(--orange)] hover:scale-110 transition-all duration-300 text-white shadow-md flex items-center justify-center"
      >
        <FaComments size={24} />
      </button>

      
    </div>
  );
};

export default FloatingChat;
