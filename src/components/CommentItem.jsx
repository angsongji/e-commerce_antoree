import { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";
import { HiDotsVertical } from "react-icons/hi";
import { FaStar } from "react-icons/fa";
function CommentItem({ comment }) {
    const [expanded, setExpanded] = useState(false);
    const toggleExpanded = () => setExpanded(!expanded);
    function formatDateTimeBySlice(datetimeStr) {
        const [date, time] = datetimeStr.split(" "); // ["2025-06-10", "03:51:03"]
        const [year, month, day] = date.split("-");  // ["2025", "06", "10"]
      
        return `${time} ${day}-${month}-${year}`;
      }
      
    return (
        <div className="text-[var(--medium-gray)] border-t border-[var(--medium-gray)]/50 py-5">
            {/* Người dùng */}
            <div className="flex justify-between items-start gap-4 mb-2 ">
                <div className="flex items-center gap-3">
                    <span className="bg-[var(--light-gray)] rounded-full"><img src={comment.user.avatar} className="w-10 h-10 rounded-full object-cover" /></span>
                    <div className="">
                        <p className="font-semibold text-[var(--dark-gray)]">{comment.user.name}</p>
                        <p className="text-sm text-[var(--orange)] flex gap-1 items-center"><FaStar /> {comment.rating}</p>
                    </div>
                </div>
                <span className="text-sm ">{formatDateTimeBySlice(comment.date)}</span>
            </div>
            
            <p className="text-sm leading-relaxed text-[var(--dark-gray)]">
                {expanded ? comment.content : `${comment.content.slice(0, 300)}`}
            </p>

            {comment.content.length > 300 && (
                <button
                    onClick={toggleExpanded}
                    className=" font-semibold hover:underline cursor-pointer text-xs"
                >
                    {expanded ? "Ẩn bớt" : "... Xem thêm"}
                </button>
            )}

            {/* Like + More options */}
            <div className="flex justify-between items-center mt-2 text-gray-400 text-xs">
                <div className="flex gap-0.5 justify-end items-center">
                    <span>{comment.react}</span>
                    <AiOutlineLike className="text-base" />
                </div>

                <button className="text-xl cursor-pointer">
                    <HiDotsVertical />
                </button>
            </div>
        </div>
    )
}

export default CommentItem;