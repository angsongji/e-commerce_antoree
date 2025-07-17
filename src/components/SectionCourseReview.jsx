import { useState } from "react";
import { FaStar } from "react-icons/fa";
import CommentItem from "./CommentItem";

const SectionCourseReview = ({ course }) => {
  const [visibleCount, setVisibleCount] = useState(4); // Hiện 4 bình luận ban đầu

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  const isMore = visibleCount < course.comments.length;

  return (
    <div className="bg-white rounded-md p-5 shadow-md flex flex-col gap-5">
      {/* Header đánh giá */}
      <div className="flex items-center gap-2 text-[var(--orange)] text-lg md:text-2xl font-semibold mb-2">
        <FaStar />
        <span>{course.rating} / 5</span>
        <span className="text-sm md:text-lg font-normal">({course.votes} đánh giá)</span>
      </div>

      {/* Danh sách bình luận */}
      <div>
        {course.comments.slice(0, visibleCount).map((comment, index) => (
          <CommentItem key={index} comment={comment} user={comment.user} />
        ))}
      </div>

      {/* Nút Xem thêm */}
      {isMore && (
        <button
          onClick={handleLoadMore}
          className="font-semibold hover:underline cursor-pointer text-xs w-fit text-[var(--orange)]"
        >
          Xem thêm bình luận...
        </button>
      )}
    </div>
  );
};

export default SectionCourseReview;
