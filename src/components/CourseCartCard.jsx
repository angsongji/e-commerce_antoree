
import {useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { addToHistory } from "../services/historyService";

const CourseCartCard = ({ course }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <>
    <img
        src={course?.image}
        alt={course?.title}
       className="block md:hidden w-full aspect-[2/1] object-cover rounded-md mb-2"
      />
      <div className="  w-full h-fit grid grid-cols-[70%_30%] md:grid-cols-[20%_60%_15%] items-center justify-between  ">
      {/* Ảnh */}
      <img
        src={course?.image}
        alt={course?.title}
       className="hidden md:block w-full aspect-[4/3] object-cover rounded-md"
      />

      {/* Nội dung chính */}
      <div className=" h-full ">
        <h2 className="font-semibold text-base md:text-lg cursor-pointer"  onClick={() => {
          setSearchParams({ courseId: course.id });
          addToHistory(course.id);
        }}>{course?.title}</h2>
        <p className=" text-[var(--medium-gray)] text-sm md:text-base">
          Khóa học của: <Link to="/" className="text-[var(--orange)] underline">{course?.author?.name}</Link>
        </p>
        <div className="flex items-center text-xs md:text-sm text-[var(--medium-gray)] gap-2 mt-1">
          <div className="flex items-center text-[var(--orange)] gap-1">
            <FaStar />
            <span>{course?.rating}</span>
          </div>
          <span>({course?.votes})</span>
          <span>•</span>
          <span>{course?.duration}h - {course?.lessons} bài học</span>
        </div>
      </div>

      {/* Giá */}
      <div className="grid justify-end  h-full">
        <h2 className="text-base md:text-lg text-[var(--orange)] font-semibold">
          {course?.price.toLocaleString()} đ
        </h2>
      </div>
    </div>
    </>
    
  );
};

export default CourseCartCard;
