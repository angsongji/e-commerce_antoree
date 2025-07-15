import CourseCardVertical1 from "../../components/CourseCardVertical1";
import SectionHeader from "../../components/SectionHeader";
import { TiDelete } from "react-icons/ti";
import { getHistory, clearHistory, removeHistory } from "../../services/historyService";
import { fetchCourses } from "../../services/courseService";
import { useEffect, useState } from "react";
function HistoriesPage() {
    const [results, setResults] = useState([]);
    useEffect(() => {
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
        clearHistory();
        setResults([]);
    };
    const removeHistoryAction = (courseId) => {
        removeHistory(courseId);
        setResults(results.filter((r) => r.id !== courseId));
    };
    return <div className="bg-white py-10">
        <SectionHeader
            title="Lịch sử đã xem"
            subtitle="Các khóa học đã xem trong vòng 10 ngày qua"
            decsAction={results.length > 0 ? "Xóa lịch sử" : ""}
            onAction={results.length > 0 ? clearHistoryAction : undefined}
        />
        {
            results.length > 0 ? (
                <div className="px-[var(--padding-x)] grid grid-cols-6 gap-5">
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