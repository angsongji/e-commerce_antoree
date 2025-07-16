import { getFavorites } from "./favoriteService";
import { getHistory } from "./historyService";
import { fetchCourses } from "./courseService";
import { matchNameByCategory } from "../utils/filterCourses";

// Gợi ý AI : giả lập GET API /api/suggestions?userId=xxx
export const fetchSuggestions = async (userId = 0) => {
  const [favorites, histories, courses] = await Promise.all([
    getFavorites(),
    getHistory(),
    fetchCourses()
  ]);

  const combineIds = [...new Set([...favorites, ...histories])];
  const suggested = courses.data.filter(course => combineIds.includes(course.id));
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