import { useState, useEffect } from "react";
import SectionForYou from "../../components/SectionForYou";
import useScrollToTop from "../../utils/useScrollToTop";
import { fetchCourses } from "../../services/courseService";
function ForYouPage() {
    const [courses, setCourses] = useState([]);
    const {scrollToTop } = useScrollToTop();
    useEffect(() => {
      scrollToTop();
    }, []);
    
    useEffect(() => {
      const fetchInitialData = async () => {
        // setLoading(true);
        try {
          const coursesData = await fetchCourses();
          setCourses(coursesData.data);
        } catch (error) {
          console.error("Lỗi khi tải course", error);
        }
      };
  
      fetchInitialData();
    }, []);
    return (
        <div className="bg-white py-10">
            <SectionForYou courses={courses} isShorten={false}/>
        </div>
    )
}

export default ForYouPage;