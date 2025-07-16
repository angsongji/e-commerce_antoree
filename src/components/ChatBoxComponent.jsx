import { message } from "antd";
import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { getAIReply } from "../services/aiService";
const ChatBoxComponent = ({ chats, setChats }) => {
    const [content, setContent] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if(content === "") {
            message.error("Vui lòng nhập tin nhắn", 2);
            return;
        }
        const userChat = {
            id: chats.length + 1,
            content: content,
            createdAt: new Date().toTimeString().split(" ")[0],
            isUser: true
        };

        setChats(prev => [...prev, userChat]);
        setContent("");

        async function handleReply() {
            try {
                const reply = await getAIReply(content);
                let replyHandle;
                if (reply === "") {
                    replyHandle = "Xin lỗi, tôi chưa hiểu rõ yêu cầu. Bạn muốn học khóa học như thế nào?\nGửi cho tôi chủ đề bạn muốn học để tôi có thể gợi ý cho bạn";
                } else {
                    replyHandle = [];
                    reply.split("\n").forEach(item => {
                        item != "" && replyHandle.push(item);
                    });
                }
                const aiChat = {
                    id: chats.length + 2, 
                    content: replyHandle,
                    createdAt: new Date().toTimeString().split(" ")[0],
                    isUser: false
                };
                setChats(prev => [...prev, aiChat]);
            } catch (error) {
                message.error("Lỗi khi lấy phản hồi từ AI", 2);
            }
        }

        handleReply();
    };

    const ChatItem = ({ chat }) => {
        return (
            <div className={` flex items-end gap-2 ${chat.isUser ? 'justify-end' : 'justify-start'}`}>

                <div className="flex flex-col  max-w-[75%]">
                    <div className={`px-4 py-2 rounded-xl text-sm ${chat.isUser
                        ? 'bg-[var(--orange)] text-white rounded-br-none'
                        : 'bg-[var(--light-gray)] text-black rounded-bl-none'}`}>
                        {
                            Array.isArray(chat.content) ? (<>
                            <div className="font-bold">Đây là một số khóa học phù hợp với yêu cầu của bạn: </div>
                            <ul className="list-disc ml-2">
                            {chat.content.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ul>
                            </>
                                
                            ) : (
                                <p>{chat.content}</p>
                            )
                        }
                    </div>
                    <span className={`text-[10px] text-gray-400 mt-1 ${chat.isUser ? 'text-right' : 'text-left'}`}>
                        {chat.createdAt}
                    </span>
                </div>
            </div>
        )
    }
    return (
        <div className=" bg-white shadow-[0_3px_10px_rgb(0,0,0,0.3)] rounded-md w-full flex flex-col gap-2">
            <div className="min-h-[60vh] max-h-[60vh] overflow-y-auto p-5">
                {chats.map((chat) => (
                    <ChatItem key={chat.id} chat={chat} />
                ))}
            </div>


            <form onSubmit={(e) => handleSubmit(e)} action="">
                <div className="flex gap-2 px-5 pb-5 text-sm">
                    <input type="text" value={content} onChange={(e) => setContent(e.target.value)} className="outline-none bg-[var(--light-gray)] rounded-md px-2 w-full " />
                    <button type="submit" className="cursor-pointer hover:bg-[var(--orange)] hover:text-white transition-all duration-300 px-2 py-1 rounded-md"><IoIosSend size={20} /></button>
                </div>
            </form>
        </div>
    );

}

export default ChatBoxComponent;