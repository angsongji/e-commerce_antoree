
import { Modal, message } from 'antd';
import SectionHeader from "../../components/SectionHeader";
import CourseCardVertical1 from "../../components/CourseCardVertical1";
import { IoIosHeart } from "react-icons/io";
import useScrollToTop from "../../hooks/useScrollToTop";
import { useEffect, useState } from "react";
import { getFavorites } from "../../services/favoriteService";
import { fetchCourses } from "../../services/courseService";
import { toggleFavorite } from "../../services/favoriteService";
function FavoritesPage() {
  const { scrollToTop } = useScrollToTop();
  const [results, setResults] = useState([]);
  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    const favorites = getFavorites();
    const fetchCoursesCall = async () => {
      try {
        const response = await fetchCourses();
        const filteredCourses = favorites
          .map(id => response.data.find(course => course.id === id))
          .filter(Boolean);
        console.log(filteredCourses);
        setResults(filteredCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCoursesCall();
  }, []);

  const ToggleFavoriteAction = (courseId) => {
    Modal.confirm({
      title: 'Xác nhận?',
      content: 'Bạn chắc chắn muốn hủy yêu thích khóa học này',
      okText: 'Đồng ý',
      cancelText: 'Quay về',
      okType: 'danger',
      onOk() {
        toggleFavorite(courseId);
        const updatedResults = results.filter((r) => r.id !== courseId);
        setResults(updatedResults);
        message.success('Đã bỏ yêu thích khóa học!', 2);
      },
    });

  };
  return <div className="bg-white py-10 ">
    <div className=" ">
      <SectionHeader
        title={`Yêu thích (${results.length})`}
        subtitle={"Các khóa học được yêu thích bởi bạn"}
      />
      {results.length > 0 ? (
        <div className="justify-center px-[var(--padding-x)] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {results.map((r) => (
            <div className="relative w-auto" key={r.id} >
              <CourseCardVertical1 course={r} isShorten={true} />
              <button onClick={() => ToggleFavoriteAction(r.id)} className="text-lg absolute top-0 right-0 cursor-pointer bg-[var(--light-gray)] rounded-md p-2">
                <IoIosHeart className="text-[var(--orange)] " />
              </button>
            </div>

          ))}
        </div>
      ) : (
        <div className="text-[var(--orange)] py-5">
          <p className="text-center">Không có khóa học nào</p>
        </div>
      )}

    </div>
  </div>
}

export default FavoritesPage;