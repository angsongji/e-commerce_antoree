import { message } from 'antd';
import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { IoSparklesSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import PATH from '../routes/path';
function SearchComponent() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if(inputValue == "") message.error("Nhập nội dung tìm kiếm!",2);
    else navigate(`/search/${inputValue}`);
  }
  return (
    <div className="text-sm text-[var(--medium-gray)] bg-[var(--light-gray)] w-full h-full rounded-full grid grid-cols-[10%_75%_13%] justify-between items-center">
      <div className=" w-full h-full flex items-center justify-center ">
        <IoIosSearch className="w-5 h-auto" />
      </div>
      <div className="w-full h-full flex items-center justify-center   ">
        <form
          className="w-full h-full"
          onSubmit={(e) => handleFormSubmit(e)}
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
        <div onClick={() => navigate(PATH.SUGGEST_COURSES)} className="hover:text-[var(--orange)] hover:scale-110 cursor-pointer">
         <IoSparklesSharp className="w-5 h-auto" />  
        </div>
      </div>
    </div>
  );
}
export default SearchComponent;
