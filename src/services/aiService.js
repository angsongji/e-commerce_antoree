import { getFavorites } from "./favoriteService";
import { getHistory } from "./historyService";
import { fetchCourses } from "./courseService";
import { matchNameByCategory } from "../utils/filterCourses";

// Gợi ý AI : giả lập GET API /api/suggestions?userId=xxx
//tìm các course có ít nhất một thể loại trùng nhau với những khóa học yêu thích/lịch sử.
export const fetchSuggestions = async (userId = 0) => {
  const [favorites, histories, courses] = await Promise.all([
    getFavorites(),   // danh sách các khóa học đã thích
    getHistory(),     // danh sách các khóa học đã xem
    fetchCourses()    // tất cả các khóa học có thể gợi ý
  ]);

  const combineIds = [...new Set([...favorites, ...histories])];

  // Lấy ra danh sách thể loại (category) từ các khóa học trong combineIds
  const targetCategories = courses.data
    .filter(course => combineIds.includes(course.id))
    .flatMap(course => course.categories);

  //Lọc các categories trùng
  const uniqueCategories = [...new Set(targetCategories)];
  
  // Gợi ý các khóa học có cùng thể loại
  const suggested = courses.data.filter(course =>
    course.categories.some(cat => uniqueCategories.includes(cat))
  );

  return suggested;
};


// ChatBot trả lời 
export const getAIReply = async (message = "") => {
  const courses = await fetchCourses();
  const msg = message.toLowerCase();

  const matchedCourses = matchNameByCategory(msg, courses.data);
  if (matchedCourses.length > 0) {
    let reply = ``;
    matchedCourses.forEach(course => {
      reply += `${course.title}\n`;
    });
    return reply 
  }

  return "";
};