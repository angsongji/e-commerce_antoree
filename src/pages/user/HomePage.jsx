import { useState, useEffect } from "react";
import HeroSlider from "../../components/Slider.jsx";
import CourseCardVertical1 from "../../components/CourseCardVertical1.jsx"
import SectionHeader2 from "../../components/SectionHeader2.jsx";
import SectionHeader from "../../components/SectionHeader.jsx";
import { useNavigate } from "react-router-dom";
import PATH from "../../routes/path.js"
import CourseCardVertical2 from "../../components/CourseCardVertical2.jsx"
import useScrollToTop from "../../utils/useScrollToTop";
import { fetchCourses } from "../../services/courseService";
import { fetchCategories } from "../../services/categoryService";
import SectionWellRated from "../../components/SectionWellRated";
import SectionForYou from "../../components/SectionForYou";
function HomePage() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { scrollToTop } = useScrollToTop();
  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    const fetchInitialData = async () => {
      // setLoading(true);
      try {
        const [coursesData, categoriesData] = await Promise.all([fetchCourses(), fetchCategories()]);
        setCourses(coursesData.data);
        setCategories(categoriesData.data);
        setSelectedCategory(categoriesData.data[0].id);
      } catch (error) {
        console.error("Lỗi khi tải course", error);
      }
    };

    fetchInitialData();
  }, []);

  return <>
    {
      courses.length > 0 && categories.length > 0 ? <div className="w-full bg-white">
        <div className="w-full h-[70vh] ">
          <HeroSlider />
        </div>

        <SectionWellRated courses={courses} isShorten={true} />

        <div className="bg-[var(--light-gray)]" >
          <SectionHeader2
            title="Tất cả khóa học"
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
            style="bg-[var(--light-gray)] "
          />
          <div className=" pt-5 pb-10 grid grid-cols-4 gap-5 px-[var(--padding-x)]">
            {courses.map((course) => (
              <CourseCardVertical2
                key={course.id}
                course={course}
              />
            ))}
          </div>
          <div className="px-[var(--padding-x)] pb-10">
            <button className="cursor-pointer text-sm font-semibold text-[var(--orange)] border border-[var(--orange)] px-4 py-2 rounded-md hover:bg-[var(--orange)] hover:text-white transition ">
              Tất cả khoá học {categories.find((category) => category.id === selectedCategory).name}
            </button>
          </div>

        </div>

        <SectionForYou courses={courses} isShorten={true} />

      </div> : <div className="w-full h-screen flex items-center justify-center">
        <p className="text-2xl font-bold text-[var(--orange)]">Đang tải...</p>
      </div>
    }
  </>
}

export default HomePage;