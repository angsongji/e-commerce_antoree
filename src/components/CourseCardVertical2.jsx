import { FaStar } from "react-icons/fa";
import {useSearchParams } from "react-router-dom";
import { addToHistory } from "../services/historyService";
const CourseCardVertical2 = ({ course }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <div className="bg-white rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.3)] overflow-hidden w-full">
            {/* Ảnh */}
            <img src={course?.image} alt={course?.title} className="w-full h-48 object-cover" />

            {/* Nội dung */}
            <div className="p-4 space-y-2">
                {/* Tên & rating */}
                <div className="flex items-center justify-between gap-1">
                    <h3 className="font-bold text-base md:text-lg text-[var(--dark-gray)] line-clamp-1">{course?.title}</h3>
                    <div className="flex items-center gap-1 text-xs md:text-sm text-[var(--orange)]">
                        <FaStar />
                        <span className="font-semibold">{course?.rating}</span>
                        <span className="text-xs text-[var(--medium-gray)]">({course?.votes})</span>
                    </div>
                </div>

                {/* Giá */}
                <div className="text-[var(--orange)] font-semibold  md:text-base text-sm">
                    {course?.price.toLocaleString()} đ
                </div>
                    
                <p className="text-xs md:text-sm text-gray-600 line-clamp-2 min-h-[2rem] overflow-hidden">
                            {course?.shortDescription}
                        </p>

                {/* Nút CTA */}
                <button 
                onClick={() => {
                    setSearchParams({ courseId: course.id });
                    addToHistory(course.id);
                }}
                className="cursor-pointer mt-2 px-4 py-2 bg-gradient-to-r from-[#D19988] to-[var(--orange)] text-white text-xs rounded-full hover:shadow-[0_3px_10px_rgb(0,0,0,0.3)] tracking-wider transition duration-200 ease">
                    Xem chi tiết
                </button>
            </div>
        </div>
    );
};

export default CourseCardVertical2;
