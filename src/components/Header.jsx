import logoWeb from "../assets/logoWeb.png";
import SearchComponent from "./searchComponent";
import { IoIosHeartEmpty } from "react-icons/io";
import { GoHistory } from "react-icons/go";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import PATH from "../routes/path";
function Header(){
    return <>
    <div className="text-white bg-[var(--orange)] w-full px-[var(--padding-x)] py-2 flex justify-between items-center font-light text-xs">
        <div>
          <a href="/">Trở thành người dạy</a>
        </div>
        <div className="flex gap-4 ">
          <a href="/">Hỗ trợ</a>
          <div className="w-[0.5px] bg-white">&nbsp;</div>
          <a href="/">Đăng ký</a>
          <div className="w-[0.5px] bg-white">&nbsp;</div>
          <a href="/">Đăng nhập</a>
        </div>
      </div>
      <header className="shadow-[0_3px_10px_rgb(0,0,0,0.5)] sticky top-0 z-10 w-full">
    <div className="px-[var(--padding-x)] py-4 bg-white w-full ">
      <div className="grid grid-cols-[20%_50%_15%] justify-between items-center h-10 ">
        <Link className=" flex gap-2 text-[var(--orange)] items-center w-full h-full" to={PATH.HOME}>
          <img src={logoWeb} alt="Antoree Logo" className="h-10 w-auto " />
          <div className="text-2xl">Antoree</div>
        </Link>
        <SearchComponent />
        <div className="flex gap-5 w-full h-full justify-end items-center">
          <Link className="cursor-pointer" to={PATH.FAVORITES}>
            <IoIosHeartEmpty className="w-6 h-auto" />
          </Link>
          <Link className="cursor-pointer" to={PATH.CART}>
            <MdOutlineShoppingCart className="w-6 h-auto" />
          </Link>
          <Link className="cursor-pointer" to={PATH.HISTORIES}>
            <GoHistory className="w-6 h-auto" />
          </Link>
        </div>
      </div>
    </div>
  </header>
    </>
}

export default Header;