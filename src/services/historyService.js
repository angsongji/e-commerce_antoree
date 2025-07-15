const HISTORY_KEY = "antoree-history";
const MAX_HISTORY_DAY = 10;

export const getHistory = () => {
  const data = localStorage.getItem(HISTORY_KEY);
  return data ? JSON.parse(data) : [];
  // Xoá bản cũ nếu đã tồn tại
  // current = current.filter(c => c.id !== course.id);
};

export const addToHistory = (courseId) => {
  let current = getHistory(); // current là mảng ID
  // Xoá nếu đã tồn tại
  current = current.filter(id => id !== courseId);
  // Thêm vào đầu
  const updated = [courseId, ...current];
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
};

export const clearHistory = () => {
  localStorage.removeItem(HISTORY_KEY);
};

export const removeHistory = (courseId) => {
  let current = getHistory();   
  const exists = current.includes(courseId);
  if (exists) {
    current = current.filter(c => c !== courseId);
  }
  const updated = [...current];

  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
}