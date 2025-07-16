
import useScrollToTop from "../../hooks/useScrollToTop";
import { useEffect, useState } from "react";
import { fetchCourses } from "../../services/courseService";
import { fetchCategories } from "../../services/categoryService";
import { useParams } from "react-router-dom";
import SectionAllCourses from "../../components/SectionAllCourses";
function AllCoursesPage() {
    const { category } = useParams();
    const { scrollToTop } = useScrollToTop();
    const [courses, setCourses] = useState([]);
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        scrollToTop();
    }, []);

    useEffect(() => {
        const fetchCall = async () => {
            try {
                const [coursesData, categoriesData] = await Promise.all([fetchCourses(), fetchCategories()]);
                setCourses(coursesData.data);
                setCategories(categoriesData.data);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };
        fetchCall();
    }, []);

    return <>
    {
        courses.length > 0 && categories.length > 0 ? (
            <div className="bg-transparent py-10 ">
                <SectionAllCourses courses={courses} categories={categories} category={Number(category) ? Number(category) : error} isShorten={false}/>
            </div>
        ) : (
            <div className="text-[var(--orange)] py-5">
                <p className="text-center">Không có khóa học nào</p>
            </div>
        )
    }
    </>
}

export default AllCoursesPage;