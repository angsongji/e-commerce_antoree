import {useSearchParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import { addToHistory } from "../services/historyService";
import { toggleFavorite } from "../services/favoriteService";
const CourseCardVertical1 = ({ course, isShorten }) => {
    const [hover, setHover] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <div
            onMouseEnter={isShorten ? () => setHover(true) : undefined}
            onMouseLeave={isShorten ? () => setHover(false) : undefined}
            className="rounded-xl bg-white overflow-hidden max-w-xs relative">
            <img src={course?.image} alt={course?.title} className="w-full h-40 object-cover mb-4" />

            <div className="">
                <h2 className="text-lg font-bold line-clamp-1">{course?.title}</h2>

                <div className="text-[var(--orange)] font-bold my-1">
                    {course?.price.toLocaleString()} đ
                </div>

                <div className="flex items-center gap-1 text-sm text-[var(--orange)] mb-2">
                    <FaStar />
                    <span className="font-semibold">{course?.rating}</span>
                    <span className="text-xs text-[var(--medium-gray)]">({course?.votes})</span>
                </div>

                {
                    !isShorten && (
                        <p className="text-sm text-[var(--medium-gray)] line-clamp-1 ">{course?.shortDescription}</p>
                    )
                }
                {
                    !isShorten && (
                        <button
                        className="mt-2 w-fit px-4 py-2 rounded-full text-white text-xs
                                   bg-gradient-to-r from-[#D19988] to-[var(--orange)] hover:opacity-90 
                                   transition-all duration-300 cursor-pointer  tracking-wider"
                                   onClick={() => {
                                    setSearchParams({ courseId: course.id });
                                    addToHistory(course.id);
                                   }}
                      >
                            Xem chi tiết
                        </button>
                    )
                }
                {
                    isShorten && hover && (
                        <div className="text-white text-lg flex items-center justify-center bg-[var(--light-gray)]/30  absolute top-0 w-full h-full">
                            <button 
                            onClick={() => {
                                setSearchParams({ courseId: course.id });
                                addToHistory(course.id);
                            }}
                            className="cursor-pointer my-4 px-4 py-2  cursor-pointer
                            text-[var(--medium-gray)] text-sm rounded-md tracking-wider border-[var(--medium-gray)]/50 border">Xem chi tiết</button>
                        </div>

                    )
                }

            </div>
        </div>
    );
};

export default CourseCardVertical1;

