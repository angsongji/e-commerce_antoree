import { useState, useEffect } from "react";
import SectionForYou from "../../components/SectionForYou";
import useScrollToTop from "../../hooks/useScrollToTop";
import { fetchCourses } from "../../services/courseService";
function ForYouPage() {
    const [courses, setCourses] = useState([]);
    const {scrollToTop } = useScrollToTop();
    useEffect(() => {
      scrollToTop();
    }, []);
    
    useEffect(() => {
      const fetchInitialData = async () => {
        try {
          const coursesData = await fetchCourses();
          setCourses(coursesData.data);
        } catch (error) {
          console.error("Lỗi khi tải course", error);
        }
      };
  
      fetchInitialData();
    }, []);
    return (<>
    {courses.length > 0 ? (
        <div className="bg-white py-10">
            <SectionForYou courses={courses} isShorten={false}/>
        </div>
    ) : (
        <div className="text-[var(--orange)] py-5">
            <p className="text-center">Không có khóa học nào</p>
        </div>
    )}
    </>)
}

export default ForYouPage;