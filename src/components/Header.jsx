import logoWeb from "../assets/logoWeb.png";
import SearchComponent from "./SearchComponent";
import { IoIosHeartEmpty } from "react-icons/io";
import { GoHistory } from "react-icons/go";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import PATH from "../routes/path";

function Header() {
  return <>
    {/* Hiện cái này khi Tablet trở lên */}
    <div className="text-white bg-[var(--orange)] w-full px-[var(--padding-x)] py-1 md:py-2 flex justify-end md:justify-between items-center font-light text-xs">
      <div className="hidden md:block">
        <a href="/">Trở thành người dạy</a>
      </div>
      <div className="flex gap-4 ">
        <a className="hidden md:block" href="/">Hỗ trợ</a>
        <div className="w-[0.5px] bg-white hidden md:block">&nbsp;</div>
        <a href="/">Đăng ký</a>
        <div className="w-[0.5px] bg-white ">&nbsp;</div>
        <a href="/">Đăng nhập</a>
      </div>
    </div>

    <header className="shadow-[0_3px_10px_rgb(0,0,0,0.5)] sticky top-0 z-10 w-full">
      <div className="px-[var(--padding-x)] py-3 md:py-4 bg-white w-full ">
        <div className="grid md:grid-cols-[15%_60%_15%] grid-cols-[13%_40%_35%] justify-between items-center h-10 ">
          <Link className=" flex md:gap-2 gap-1 text-[var(--orange)] items-center w-full h-full" to={PATH.HOME}>
            <img src={logoWeb} alt="Antoree Logo" className="h-8 md:h-10 w-auto " />
            <div className="hidden md:block xl:text-3xl md:text-2xl ">Antoree</div>
          </Link>
          <SearchComponent />
          <div className="flex gap-3 md:gap-5 w-full h-full justify-end items-center h-1/2 ">
            <Link className="cursor-pointer" to={PATH.FAVORITES}>
              <IoIosHeartEmpty className="w-6  h-auto" />
            </Link>
            <Link className="cursor-pointer" to={PATH.CART}>
              <MdOutlineShoppingCart className="w-5 md:w-6 h-auto" />
            </Link>
            <Link className="cursor-pointer" to={PATH.HISTORIES}>
              <GoHistory className="w-5 md:w-6 h-auto" />
            </Link>


          </div>
        </div>
      </div>
    </header>
  </>
}

export default Header;