import { useState } from "react";
import { fetchCategories } from "../services/categoryService";
import { useEffect } from "react";
const FilterSidebar = () => {
  const [categories, setCategories] = useState([]);
  const prices = [
    "Miễn phí",
    "< 500.000đ",
    "500.000đ đến 1.000.000đ",
    "> 1.000.000đ",
  ];

  const [selectedTopics, setSelectedTopics] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);

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

  const handleTopicChange = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
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
                checked={selectedTopics.includes(category.name)}
                onChange={() => handleTopicChange(category.name)}
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
          {prices.map((price, index) => (
            <li key={index} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={`price-${index}`}
                className="accent-[var(--medium-gray)] cursor-pointer"
                checked={selectedPrices.includes(price)}
                onChange={() => handlePriceChange(price)}
              />
              <label htmlFor={`price-${index}`} className="cursor-pointer ">
                {price}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterSidebar;
