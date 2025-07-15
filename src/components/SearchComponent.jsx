import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { FaLightbulb } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function SearchComponent() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  return (
    <div className="text-sm text-[var(--medium-gray)] bg-[var(--light-gray)] w-full h-full rounded-full grid grid-cols-[10%_75%_13%] justify-between items-center">
      <div className=" w-full h-full flex items-center justify-center ">
        <IoIosSearch className="w-5 h-auto" />
      </div>
      <div className="w-full h-full flex items-center justify-center   ">
        <form
          className="w-full h-full"
          onSubmit={(e) => {
            e.preventDefault();
            navigate(`/search/${inputValue}`);
          }}
        >
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            type="text"
            placeholder="Tìm kiếm khóa học theo tên..."
            className="w-full h-full bg-[var(--light-gray)] outline-none"
          />
        </form>

        {inputValue != "" && (
          <div className="cursor-pointer " onClick={() => setInputValue("")}>
            <IoMdClose className="w-5 h-auto" />
          </div>
        )}
      </div>
      <div className=" w-full h-full flex items-center justify-evenly gap-2">
        <div className="bg-[var(--medium-gray)]/50 w-0.5">&nbsp;</div>
        <div className="cursor-pointer">
          <FaLightbulb className="w-5 h-auto" />
        </div>
      </div>
    </div>
  );
}
export default SearchComponent;
