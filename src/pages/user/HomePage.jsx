import { useState, useEffect } from "react";
import HeroSlider from "../../components/Slider.jsx";
import CourseCardVertical1 from "../../components/CourseCardVertical1.jsx"
import SectionHeader2 from "../../components/SectionHeader2.jsx";
import SectionHeader from "../../components/SectionHeader.jsx";
import { useNavigate } from "react-router-dom";
import PATH from "../../routes/path.js"
import CourseCardVertical2 from "../../components/CourseCardVertical2.jsx"
import useScrollToTop from "../../hooks/useScrollToTop";
import { fetchCourses } from "../../services/courseService";
import { fetchCategories } from "../../services/categoryService";
import SectionWellRated from "../../components/SectionWellRated";
import SectionForYou from "../../components/SectionForYou";
import SectionAllCourses from "../../components/SectionAllCourses";
function HomePage() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading]  = useState(true);
  const { scrollToTop } = useScrollToTop();
  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const [coursesData, categoriesData] = await Promise.all([fetchCourses(), fetchCategories()]);
        setCourses(coursesData.data);
        setCategories(categoriesData.data);
      } catch (error) {
        console.error("Lỗi khi tải course", error);
      }finally{
        const handleAction = async () => {
          await new Promise(resolve => setTimeout(resolve, 1000)); //delay 1s để load skeleton giả
          setLoading(false);
        };
        handleAction();
      }
    };

    fetchInitialData();
  }, []);

  return <>
    {
      !loading ? <div className="w-full bg-white">
        <div className="w-full h-[70vh] ">
          <HeroSlider />
        </div>
        <div id="well-rated">
        <SectionWellRated courses={courses} isShorten={true} />
        </div>
        
        <div id="all-courses" className="bg-[var(--light-gray)]">
        <SectionAllCourses courses={courses} categories={categories} category={categories[0].id} isShorten={true} />

        </div>
        
        <SectionForYou courses={courses} isShorten={true} />
        
      </div> : <div className="bg-white w-full min-h-[50vh] flex items-center justify-center"><span className="loader"></span></div>
    }
  </>
}

export default HomePage;