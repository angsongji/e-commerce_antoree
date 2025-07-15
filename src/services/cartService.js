const CART_KEY = "antoree-cart";

export const getCart = () => {
  const data = localStorage.getItem(CART_KEY);
  return data ? JSON.parse(data) : [];
};

export const addToCart = (courseId) => {
  const current = getCart();
  const exists = current.some(c => c === courseId);
  if (!exists) {
    const updated = [courseId,...current];
    localStorage.setItem(CART_KEY, JSON.stringify(updated));
    return updated;
  }
  return current;
};

export const removeFromCart = (courseId) => {
  const current = getCart();
  const updated = current.filter(c => c !== courseId);
  localStorage.setItem(CART_KEY, JSON.stringify(updated));
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};
