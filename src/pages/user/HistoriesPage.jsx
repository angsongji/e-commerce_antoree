import { Modal, message } from 'antd';
import CourseCardVertical1 from "../../components/CourseCardVertical1";
import SectionHeader from "../../components/SectionHeader";
import { TiDelete } from "react-icons/ti";
import { getHistory, clearHistory, removeHistory } from "../../services/historyService";
import { fetchCourses } from "../../services/courseService";
import { useEffect, useState } from "react";
import useScrollToTop  from "../../hooks/useScrollToTop";
function HistoriesPage() {
    const {scrollToTop} = useScrollToTop();
    const [results, setResults] = useState([]);
    useEffect(() => {
        scrollToTop();
        const histories = getHistory();
        const fetchCoursesCall = async () => {
            try {
                const response = await fetchCourses();
                const filteredCourses = histories
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

    const clearHistoryAction = () => {
        Modal.confirm({
            title: 'Xác nhận?',
            content: 'Bạn chắc chắn muốn xóa tất cả lịch sử đã xem',
            okText: 'Đồng ý',
            cancelText: 'Quay về',
            okType: 'danger',
            onOk() {
                clearHistory();
        setResults([]);
                message.success('Đã xóa tất cả lịch sử!', 2);
            },
          });
        
    };
    const removeHistoryAction = (courseId) => {
        Modal.confirm({
            title: 'Xác nhận?',
            content: 'Bạn chắc chắn muốn xóa lịch sử này',
            okText: 'Đồng ý',
            cancelText: 'Quay về',
            okType: 'danger',
            onOk() {
                removeHistory(courseId);
               setResults(results.filter((r) => r.id !== courseId));
                message.success('Đã xóa lịch sử chọn!', 2);
            },
          });
    };
    return <div className="bg-white py-10">
        <SectionHeader
            title="Lịch sử đã xem"
            subtitle="Hiển thị 15 khóa học đã xem gần đây nhất"
            decsAction={results.length > 0 ? "Xóa lịch sử" : ""}
            onAction={results.length > 0 ? clearHistoryAction : undefined}
        />
        {
            results.length > 0 ? (
                <div className="px-[var(--padding-x)] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 xl:grid-cols-6 gap-5">
                    {results.map((r) => (
                        <div className="relative" key={r.id}>
                            <CourseCardVertical1 key={r.id} course={r} isShorten={true} />
                            <button onClick={() => removeHistoryAction(r.id)} className="text-2xl absolute top-0 right-0 cursor-pointer bg-[var(--light-gray)] rounded-md p-1">
                                <TiDelete className="text-[var(--orange)] " />
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-5 text-[var(--orange)]">
                    <p className="text-center">Không có khóa học nào</p>
                </div>
            )
        }

    </div>
}

export default HistoriesPage;