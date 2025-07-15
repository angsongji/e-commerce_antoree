import { useState } from "react";
const minDisplay = 7;
const SectionHeader2 = ({ title, categories = [], selected, onSelect, style }) => {
  const [showAll, setShowAll] = useState(false);

  const displayCategories =
    categories.length <= minDisplay || showAll
      ? categories
      : categories.slice(0, minDisplay);

  return (
    <div className={` px-[var(--padding-x)] py-5 sticky top-0 z-10 ${style}`}>
      <h2 className="text-2xl font-bold mb-3">{title}</h2>
      <div className="flex flex-wrap gap-2 ">
        {displayCategories.map((c, index) => (
          <button
            key={index}
            onClick={() => onSelect && onSelect(c.id)}
            className={`px-3 py-1 text-sm rounded-full cursor-pointer transition-all duration-300 ease-in-out
              ${
                selected === c.id
                  ? "bg-[var(--medium-gray)] text-white "
                  : "bg-white text-[var(--dark-gray)] hover:bg-gray-200"
              }`}
          >
            {c.name}
          </button>
        ))}

        {categories.length > minDisplay && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="cursor-pointer px-3 py-1 text-sm rounded-full bg-white hover:bg-gray-200"
          >
            {showAll ? "Ẩn bớt" : "Thêm"}
          </button>
        )}
      </div>
    </div>
  );
};

export default SectionHeader2;
