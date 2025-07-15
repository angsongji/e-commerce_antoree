
import CourseCardVertical1 from "./CourseCardVertical1.jsx"
import SectionHeader from "./SectionHeader.jsx"
import { useNavigate } from "react-router-dom";
import PATH from "../routes/path";
const SectionForYou = ({ courses, isShorten }) => {
    const navigate = useNavigate();
    courses.sort((a, b) => b.rating - a.rating);
    courses = courses.filter((course) => course.rating >= 4);
    return (
        <div>
            <SectionHeader
                title="Dành cho bạn"
                subtitle="Các khóa học có thể phù hợp với bạn"
                decsAction={isShorten ? "Xem tất cả" : ""}
                onAction={() => navigate(PATH.FOR_YOU)}  // hoặc dùng Link nếu muốn
            />
            <div className=" grid grid-cols-4 gap-5 px-[var(--padding-x)] pt-5 pb-10">
                {courses.slice(0, isShorten ? 4 : courses.length).map((course) => (
                    <CourseCardVertical1
                        key={course.id}
                        course={course}
                        isShorten={false}
                    />
                ))}
            </div>
        </div>

    )
}
export default SectionForYou;
