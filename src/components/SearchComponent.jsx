import { message } from 'antd';
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { IoIosSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { IoSparklesSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FiMinimize2 } from "react-icons/fi";
import PATH from '../routes/path';

// Sub component for the input + icon
function SearchItem({ value, setValue, onSubmit, onClear, onSuggest }) {
  return (
    <div className="rounded-full text-xs md:text-sm text-[var(--medium-gray)] bg-[var(--light-gray)] w-full h-full grid md:grid-cols-[10%_75%_13%] grid-cols-[10%_70%_18%] justify-between items-center">
      <div className=" w-full h-full flex items-center justify-center">
        <IoIosSearch className="w-5 md:w-6 h-auto" />
      </div>
      <div className="flex-1 h-full flex items-center justify-between">
        <form className="w-full h-full" onSubmit={onSubmit}>
          <input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Tìm kiếm khóa học theo tên..."
            className="w-full h-full bg-[var(--light-gray)] outline-none"
          />
        </form>
        {value !== "" && (
          <div className="cursor-pointer" onClick={onClear}>
            <IoMdClose className="w-5 md:w-6 h-auto" />
          </div>
        )}
      </div>
      <div className=" w-full h-full flex items-center justify-evenly gap-2">
        <div className="bg-[var(--medium-gray)]/50 w-0.5">&nbsp;</div>
        <div
          onClick={onSuggest}
          className="hover:text-[var(--orange)] hover:scale-110 cursor-pointer"
        >
          <IoSparklesSharp className="w-4 md:w-5  h-auto" />
        </div>
      </div>
    </div>
  );
}

// Fullscreen mobile overlay search rendered via Portal
function MobileSearchOverlay({ inputValue, setInputValue, onClose, onSubmit, onSuggest }) {
  return createPortal(
    <div className="transition-all duration-300 ease-in-out fixed inset-0 z-50 bg-white flex flex-col gap-5 items-center justify-center shadow-md">
      <div className="h-[7vh] w-[90%]">
        <SearchItem
          value={inputValue}
          setValue={setInputValue}
          onSubmit={onSubmit}
          onClear={() => setInputValue("")}
          onSuggest={onSuggest}
        />
      </div>
      <span onClick={onClose} className="text-[var(--orange)] underline text-sm">
        Thoát
      </span>
    </div>,
    document.body
  );
}

// Main Search component
function SearchComponent() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [showOverlay, setShowOverlay] = useState(false); // vẫn cần state để trigger mount

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      message.error("Nhập nội dung tìm kiếm!", 2);
    } else {
      navigate(`/search/${inputValue}`);
      setShowOverlay(false);
    }
  };

  return (
    <>
      {/* Mobile (collapsed) input */}
      <div className="block md:hidden gap-1 text-xs md:text-sm text-[var(--medium-gray)] bg-[var(--light-gray)] w-full px-2 h-full flex items-center rounded-full justify-center">
        <div className="w-fit h-full flex items-center justify-between">
          <IoIosSearch className="w-5 md:w-6 lg:w-8 h-auto" />
        </div>
        <form className="w-full h-full">
          <input
            value={inputValue}
            onClick={() => setShowOverlay(true)}
            type="text"
            placeholder="Tìm kiếm..."
            className="w-full h-full bg-[var(--light-gray)] outline-none rounded-full"
            readOnly // không cho nhập ở đây
          />
        </form>
      </div>

      {/* Mobile full screen search overlay */}
      {showOverlay && (
        <MobileSearchOverlay
          inputValue={inputValue}
          setInputValue={setInputValue}
          onClose={() => setShowOverlay(false)}
          onSubmit={handleSubmit}
          onSuggest={() => {
            navigate(PATH.SUGGEST_COURSES);
            setShowOverlay(false);
          }}
        />
      )}

      {/* Desktop search */}
      <div className="hidden md:block h-full w-full">
        <SearchItem
          value={inputValue}
          setValue={setInputValue}
          onSubmit={handleSubmit}
          onClear={() => setInputValue("")}
          onSuggest={() => navigate(PATH.SUGGEST_COURSES)}
        />
      </div>
    </>
  );
}

export default SearchComponent;
