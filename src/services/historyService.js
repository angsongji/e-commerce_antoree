const HISTORY_KEY = "antoree-history";
const MAX_HISTORY = 15; //Hiển thị 15 lịch sử gần đây nhất

export const getHistory = () => {
  const data = localStorage.getItem(HISTORY_KEY);
  return data ? JSON.parse(data) : [];
};

export const addToHistory = (courseId) => {
  let current = getHistory(); // current là mảng ID

  current = current.filter(id => id !== courseId);
  
  const updated = [courseId, ...current];

  if(updated.length > MAX_HISTORY){
    updated.splice(MAX_HISTORY);
  }
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