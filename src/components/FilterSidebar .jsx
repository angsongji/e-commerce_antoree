import { useState } from "react";
import { fetchCategories } from "../services/categoryService";
import { useEffect } from "react";
import {matchCategories, matchPrice} from "../utils/filterCourses";
const FilterSidebar = ({courses, setFilterCourses, selectedCategories, setSelectedCategories, selectedPrices, setSelectedPrices}) => {
  const [categories, setCategories] = useState([]);
  const priceRanges = [
    {
      name: "Miễn phí",
      value: "free",
    },
    {
      name: "< 500.000đ",
      value: "0-500000",
    },
    {
      name: "500.000đ đến 1.000.000đ",
      value: "500000-1000000",
    },
    {
      name: "> 1.000.000đ",
      value: "1000000-",
    },
  ];

  

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData.data);
      } catch (error) {
        console.error("Lỗi khi tải category", error);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const filteredCourses = courses.filter((course) => {
      const matchesCategories = matchCategories(course, selectedCategories);
      const matchesPrices = matchPrice(course, selectedPrices);
      return matchesCategories && matchesPrices;
    });
    setFilterCourses(filteredCourses);
  }, [selectedCategories, selectedPrices]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId) ? prev.filter((t) => t !== categoryId) : [...prev, categoryId]
    );
  };

  const handlePriceChange = (price) => {
    setSelectedPrices((prev) =>
      prev.includes(price) ? prev.filter((p) => p !== price) : [...prev, price]
    );
  };

  return (
    <div className="pl-[var(--padding-x)] text-[var(--medium-gray)] text-sm w-full space-y-6">
      {/* Chủ đề */}
      <div>
        <h3 className="font-bold mb-2 text-base text-[var(--dark-gray)]">Chủ đề</h3>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={index} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`topic-${index}`}
                className="accent-[var(--medium-gray)] cursor-pointer"
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCategoryChange(category.id)}
              />
              <label htmlFor={`topic-${index}`} className="cursor-pointer">
                {category.name}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Mức giá */}
      <div>
        <h3 className="font-bold mb-2 text-base text-[var(--dark-gray)]">Mức giá</h3>
        <ul className="space-y-2">
          {priceRanges.map((priceRange, index) => (
            <li key={index} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`price-${index}`}
                className="accent-[var(--medium-gray)] cursor-pointer"
                checked={selectedPrices.includes(priceRange.value)}
                onChange={() => handlePriceChange(priceRange.value)}
              />
              <label htmlFor={`price-${index}`} className="cursor-pointer ">
                {priceRange.name}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterSidebar;
