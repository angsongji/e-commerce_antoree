
import CourseCardVertical1 from "./CourseCardVertical1.jsx"
import SectionHeader from "./SectionHeader.jsx"
import { useNavigate } from "react-router-dom";
import PATH from "../routes/path";
import { fetchCourses } from "../services/courseService";
import { getCart } from "../services/cartService";
import { useEffect, useState } from "react";
import { getRandomCourse, matchCategories } from "../utils/filterCourses";
const SectionForYou = ({ courses, isShorten }) => {
    //Gợi ý các khóa học tương tự chủ đề với các khóa học trong giỏ hàng
    const navigate = useNavigate();
    const [filterCourses, setFilterCourses] = useState([]);
    useEffect(() => {
        const cart = getCart();
        const fetchCoursesCall = async () => {
            try {
                const response = await fetchCourses();
                const filteredCourses = cart
                    .map(id => response.data.find(course => course.id === id))
                    .filter(Boolean);
                    handleFilterCourses(filteredCourses);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        fetchCoursesCall();
    }, []);
    const handleFilterCourses = (filterCourses) => {
        if(filterCourses.length === 0){
            const randomCourses = [];
            for(let i = 0; i < 8; i++){
                const course = getRandomCourse(courses);
                if(randomCourses.some(c => c.id == course)) i--;
                else randomCourses.push(course);
            }
            setFilterCourses(randomCourses);
        }else{
            const uniqueCategoryIds = [...new Set(
                filterCourses.flatMap(c => c.categories.map(cat => cat.id))
              )];
              const results = courses.filter(c => matchCategories(c, uniqueCategoryIds));
            setFilterCourses(results);
        }
    }
    return (
        <div>
            <SectionHeader
                title="Dành cho bạn"
                subtitle="Các khóa học tương tự chủ đề với các khóa học trong giỏ hàng hoặc ngẫu nhiên nếu giỏ hàng trống"
                decsAction={isShorten && filterCourses.length > 4 ? "Xem tất cả" : ""}
                onAction={() => navigate(PATH.FOR_YOU)}  // hoặc dùng Link nếu muốn
            />
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-5 px-[var(--padding-x)] pt-5 pb-10">
                {filterCourses.slice(0, isShorten ? 4 : filterCourses.length).map((course) => (
                    <CourseCardVertical1
                        key={course.id}
                        course={course}
                        isShorten={isShorten}
                    />
                ))}
            </div>
        </div>

    )
}
export default SectionForYou;
