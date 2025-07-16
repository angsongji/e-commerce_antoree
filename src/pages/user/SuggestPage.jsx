

import SectionHeader from "../../components/SectionHeader";
import CourseCardVertical1 from "../../components/CourseCardVertical1";
import useScrollToTop from "../../hooks/useScrollToTop";
import { fetchSuggestions } from "../../services/aiService";
import { useState, useEffect } from "react";

function SuggestPage() {
    const { scrollToTop } = useScrollToTop();
    const [suggestCourses, setSuggestCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        scrollToTop();
    }, []);
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const suggestCoursesData = await fetchSuggestions();
                setSuggestCourses(suggestCoursesData);
            } catch (error) {
                console.error("Lỗi khi tải", error);
            } finally {
                const handleAction = async () => {
                    await new Promise(resolve => setTimeout(resolve, 1000)); //delay 1s để load skeleton giả
                    setLoading(false);
                  };
                  handleAction();
            }
        };

        fetchInitialData();
    }, []);
    return (<>
    {
        !loading ? <div className="bg-white py-10 ">
        <div className=" ">
            <SectionHeader
                title={`Gợi ý khóa học (${suggestCourses.length})`}
                subtitle={`Các khóa học gợi ý cho bạn dựa vào yêu thích và lịch sử đã xem`}
            />
            <div className="justify-center px-[var(--padding-x)] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {suggestCourses.map((r) => (
                    <CourseCardVertical1 key={r.id} course={r} isShorten={true} />
                ))}
            </div>
        </div>
    </div> : <div className="bg-white w-full min-h-[50vh] flex items-center justify-center"><span className="loader"></span></div>
    }
    </>
        
    );
}

export default SuggestPage;