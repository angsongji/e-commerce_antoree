const FAVORITE_KEY = "antoree-favorites";

export const getFavorites = () => {
  const data = localStorage.getItem(FAVORITE_KEY);
  return data ? JSON.parse(data) : [];
};

export const toggleFavorite = (courseId) => {
  const current = getFavorites();
  const updated = current.includes(courseId)
    ? current.filter(id => id !== courseId)
    : [...current, courseId];
  localStorage.setItem(FAVORITE_KEY, JSON.stringify(updated));
};

export const isFavorite = (courseId) => {
  const current = getFavorites();
  return current.includes(courseId);
};
