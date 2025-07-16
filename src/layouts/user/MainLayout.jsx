import { useEffect, useState } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import CourseDetail from "../../components/CourseDetail.jsx";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import useScrollToTop from "../../hooks/useScrollToTop";
import { FaArrowUp } from "react-icons/fa";
import { fetchCourses } from "../../services/courseService";
function MainLayout() {
  const { showScrollBtn, scrollToTop } = useScrollToTop();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCourse, setSelectedCourse] = useState({});
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchCoursesCall = async () => {
      try {
        const response = await fetchCourses();
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCoursesCall();
  }, []);
  useEffect(() => {
    const courseId = searchParams.get("courseId");
    console.log(courseId);
    setSelectedCourse(courses.find(course => course.id === Number(courseId)));
  }, [searchParams]);
  return (
    <div className="w-full min-w-0 relative">
      <Header />
      <div>
        <Outlet />
      </div>
      <div className="bg-white px-[var(--padding-x)] text-[var(--medium-gray)] py-20">
        <hr />
      </div>
      <Footer />

      {showScrollBtn && (
        <button
          onClick={scrollToTop}
          className="text-sm flex gap-1 items-center z-20 fixed bottom-6 right-6 bg-white text-[var(--orange)] p-5 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:scale-105 transition cursor-pointer"
        >
          <FaArrowUp />
        </button>
      )}

      {
        selectedCourse?.id && <CourseDetail course={selectedCourse} /> 
      }
      
    </div>
  );
}

export default MainLayout;
