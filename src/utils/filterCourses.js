
export const matchKeyword = (course, keyword) => {
    if (!keyword) return true;
    return course.title.toLowerCase().includes(keyword.toLowerCase());
};

export const matchPrice = (course, priceRanges = []) => {
    if (priceRanges.length === 0) return true;
    return priceRanges.some(priceRange => {
        if(priceRange === "free") return course.price === 0;
        const [minPart, maxPart] = priceRange.split("-");

        const minPrice = minPart ? Number(minPart) : undefined;
        const maxPrice = maxPart ? Number(maxPart) : undefined;

        const greaterThanMin = minPrice === undefined || course.price >= minPrice;
        const lessThanMax = maxPrice === undefined || course.price <= maxPrice;

        return greaterThanMin && lessThanMax;
    });
};


export const matchCategories = (course, categoryIds = []) => {
    if (categoryIds.length === 0) return true;
    return course.categories.some(cat => categoryIds.includes(cat.id));
};

export const getRandomCourse = (courses) => {
    if (!courses || courses.length === 0) return null;
    const index = Math.floor(Math.random() * courses.length);
    return courses[index];
  };
  
export const matchNameByCategory = (name, courses = []) => {
    if (name.length === 0) return true;
    return courses.filter(course => course.categories.some(cat =>  cat.name.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(cat.name.toLowerCase())));
};