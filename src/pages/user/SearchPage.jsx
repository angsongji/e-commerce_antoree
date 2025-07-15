
import { useParams } from "react-router-dom";
import SectionHeader from "../../components/SectionHeader";
import CourseCardVertical1 from "../../components/CourseCardVertical1";
import FilterSidebar from "../../components/FilterSidebar ";
import useScrollToTop from "../../utils/useScrollToTop";
import { fetchCourses } from "../../services/courseService";
import { useState, useEffect } from "react";
const results = [
  {
    id: 4,
    image: "https://www.shapedivider.app/img/preview_tablet_x2.b0ab64e4.png",
    title: "Tên khoá học java",
    price: 2000000,
    rating: 4.9,
    votes: 1990,
    description: "Mô tả ngắn của khoá học hiện ở đây. Mô tả có thể dài nhưng sẽ bị giới hạn dòng hiển thị abc absbah bdsajdbak b kdjahda"
  },
  {
    id: 5,
    image: "https://www.shapedivider.app/img/preview_tablet_x2.b0ab64e4.png",
    title: "Tên khoá học python",
    price: 2000000,
    rating: 4.9,
    votes: 1990,
    description: "Mô tả ngắn của khoá học hiện ở đây. Mô tả có thể dài nhưng sẽ bị giới hạn dòng hiển thị abc absbah bdsajdbak b kdjahda"
  },
];
function SearchPage() {
  const { value } = useParams();
  const [showFilter, setShowFilter] = useState(false);
  const {scrollToTop } = useScrollToTop();
  const [courses, setCourses] = useState([]);
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
            <FilterSidebar />
          </div>
        )}
      </div>

      {/* ==== NỘI DUNG CHÍNH ==== */}
      <div className=" ">
        <SectionHeader
          title={`Kết quả phù hợp (${courses.length})`}
          subtitle={`Các khóa học phù hợp với từ khóa: ${value}`}
          decsAction={showFilter ? "Ẩn lọc" : "Hiện lọc"}
          onAction={() => setShowFilter(!showFilter)}
        />

        <div className="justify-center px-[var(--padding-x)] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {courses.map((r) => (
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