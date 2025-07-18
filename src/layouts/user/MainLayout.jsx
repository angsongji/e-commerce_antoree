import { useEffect, useState } from "react";
import { Outlet, useSearchParams } from "react-router-dom";
import CourseDetail from "../../components/CourseDetail.jsx";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import useScrollToTop from "../../hooks/useScrollToTop";
import { FaArrowUp } from "react-icons/fa";
import { fetchCourses } from "../../services/courseService";
import FloatingChat from "../../components/FloatingChat.jsx"
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
    setSelectedCourse(courses.find(course => course.id === Number(courseId)));
  }, [searchParams]);
  return (
    <div className="w-full relative">
      <Header />
      <div>
        <Outlet />
      </div>
      <div className="bg-white px-[var(--padding-x)] text-[var(--medium-gray)] py-15 md:py-20">
        <hr />
      </div>
      <Footer />

      {showScrollBtn && (
        <button
          onClick={scrollToTop}
          className="z-20 fixed bottom-20 right-6 bg-white text-[var(--orange)] p-3 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] hover:scale-110 transition cursor-pointer"
        >
          <FaArrowUp />
        </button>
      )}
      <FloatingChat />
      {
        selectedCourse?.id && <CourseDetail course={selectedCourse} /> 
      }
      
    </div>
  );
}

export default MainLayout;
