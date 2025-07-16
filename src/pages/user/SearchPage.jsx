
import { useParams } from "react-router-dom";
import SectionHeader from "../../components/SectionHeader";
import CourseCardVertical1 from "../../components/CourseCardVertical1";
import FilterSidebar from "../../components/FilterSidebar ";
import useScrollToTop from "../../hooks/useScrollToTop";
import { fetchCourses } from "../../services/courseService";
import { useState, useEffect } from "react";

function SearchPage() {
  const { value } = useParams();
  const [showFilter, setShowFilter] = useState(false);
  const {scrollToTop } = useScrollToTop();
  const [courses, setCourses] = useState([]);
  const [filterCourses, setFilterCourses] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  useEffect(() => {
    scrollToTop();
  }, []);
  useEffect(() => {
    console.log(value);
    const fetchInitialData = async () => {
      // setLoading(true);
      try {
        const coursesData = await fetchCourses();
        const filteredCourses = coursesData.data.filter((course) => course.title.toLowerCase().includes(value.toLowerCase()));
        setCourses(filteredCourses);
        setFilterCourses(filteredCourses);
      } catch (error) {
        console.error("Lỗi khi tải course", error);
      }
    };

    fetchInitialData();
  }, [value]);
  return (
    <div className="bg-white py-10 ">
      {/* ==== SIDEBAR ==== */}
      <div
  className={`
   fixed z-35 w-fit top-0
    transition-all duration-500
    ${showFilter ? "translate-x-0" : "translate-x-[-100%]"}
  `}
      >
        {showFilter && (
          <div className="bg-white shadow-md lg:shadow-none h-[100vh] pr-10">
            <SectionHeader title=" Bộ lọc" subtitle="Lọc khóa học" />
            <FilterSidebar courses={courses} filterCourses={filterCourses} setFilterCourses={setFilterCourses} selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} selectedPrices={selectedPrices} setSelectedPrices={setSelectedPrices}/>
          </div>
        )}
      </div>

      {/* ==== NỘI DUNG CHÍNH ==== */}
      <div className=" ">
        <SectionHeader
          title={`Kết quả phù hợp (${filterCourses.length})`}
          subtitle={`Các khóa học phù hợp với từ khóa: ${value}`}
          decsAction={filterCourses.length == 0 ? "" : `Hiện lọc (${selectedCategories.length + selectedPrices.length})`}
          onAction={() => setShowFilter(!showFilter)}
        />
        <div className="justify-center px-[var(--padding-x)] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {filterCourses.map((r) => (
            <CourseCardVertical1 key={r.id} course={r} isShorten={true} />
          ))}
        </div>
      </div>

      {/* ==== OVERLAY MOBILE (tắt lọc) ==== */}
      {showFilter && (
        <div
          className="fixed inset-0 bg-[var(--medium-gray)]/50 backdrop-blur-sm z-30"
          onClick={() => setShowFilter(false)}
        />
      )}
    </div>
  );
}

export default SearchPage;