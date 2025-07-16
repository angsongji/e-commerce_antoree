import SectionHeader2 from "./SectionHeader2";
import CourseCardVertical2 from "./CourseCardVertical2";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {matchCategories} from "../utils/filterCourses";
function SectionAllCourses ({courses, categories,category,  isShorten}) {
    const navigate = useNavigate();
    const [filterCourses, setFilterCourses] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(category);
    useEffect(() => {
        const filteredCourses = courses.filter((course) => {
            return matchCategories(course, [selectedCategory]);
            });
        setFilterCourses(filteredCourses);
    }, [selectedCategory]);
    return (
        <div className="bg-transparent">
            <SectionHeader2
            title="Tất cả khóa học"
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
            style="bg-[var(--light-gray)] "
          />
            <div className=" pt-5 pb-10 grid grid-cols-4 gap-5 px-[var(--padding-x)]">
            {filterCourses.slice(0, isShorten ? 8 : filterCourses.length).map((course) => (
              <CourseCardVertical2
                key={course.id}
                course={course}
              />
            ))}
          </div>
          {
            isShorten && filterCourses.length > 8 && (
              <div className="px-[var(--padding-x)] pb-10">
                <button onClick={() => navigate(`/all-courses/${selectedCategory}`)} className="cursor-pointer text-sm font-semibold text-[var(--orange)] border border-[var(--orange)] px-4 py-2 rounded-md hover:bg-[var(--orange)] hover:text-white transition ">
                  Tất cả khoá học chủ đề {categories.find((category) => category.id === selectedCategory).name}
                </button>
              </div>
            )
          }
        </div>

    )
}
export default SectionAllCourses;
