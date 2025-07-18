import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaSquareInstagram } from "react-icons/fa6";
import logoWeb from "../assets/logoWeb.png";
import visa from "../assets/visa.png";
import zalopay from "../assets/zalopay.png";
import cod from "../assets/cod.png";
import paypal from "../assets/paypal.png";
import PATH from "../routes/path";
import { useState, useEffect } from "react";
import { fetchCategories } from "../services/categoryService";
const paymentMethod = [
  {
    id: 1,
    logo: visa
  },
  {
    id: 2,
    logo: paypal
  },
  {
    id: 3,
    logo: zalopay
  },
  {
    id: 4,
    logo: cod
  },
];
const informationAntoreee = [
  {
    id: 1,
    content: "Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành phố Hà Nội, Việt Nam."
  },
  {
    id: 2,
    content: "abc123@Antoree.com"
  },
  {
    id: 3,
    content: "Hotline: 0129120121"
  }
]
function Footer() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategoriesCall = async () => {
      try {
        const response = await fetchCategories();
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategoriesCall();
  }, []);
  return <footer className="w-full m-0 bg-white ">
    <div className="px-[var(--padding-x)]">
      {
        categories.length > 0 && (
          <div className="pt-5 pb-10 md:py-15">
            <p className="font-bold mb-3">Danh mục</p>
            <div className="flex gap-x-3 gap-y-2 flex-wrap text-[var(--medium-gray)] text-sm">
              {categories.map((category) => (
                <Link key={category.id} to={`/all-courses/${category.id}`}>{category.name}</Link>
              ))}
            </div>
          </div>
        )
      }

      <div className="py-10 grid md:grid-cols-[13%_15%_12%_40%_20%] grid-cols-[48%_48%] gap-2">
        <div >
          <p className="font-bold mb-3">Liên kết nhanh</p>
          <div className="flex flex-col text-sm  text-[var(--medium-gray)] gap-4">
            <Link to={PATH.HOME}>Trang chủ</Link>
            <Link to="/about">Về Antoree</Link>
            <Link to="/contact">Liên hệ</Link>
            <Link className="md:hidden block" to={PATH.HOME}>Trở thành người bán</Link>
            <Link className="md:hidden block" to={PATH.HOME}>Hỗ trợ</Link>
          </div>
        </div>
        <div >
          <p className="font-bold mb-3">Thanh toán</p>
          <div className="flex flex-col text-sm  text-[var(--medium-gray)]">
            <div className="flex flex-wrap gap-4">
              {
                paymentMethod.map((method) => (
                  <div key={method.id} className="bg-[var(--light-gray)] p-1 rounded-sm flex items-center justify-center">
                    <img src={method.logo} className="w-12 h-auto" />
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        <div >
          <p className="font-bold mb-3">Mạng xã hội</p>
          <div className="flex flex-col text-sm  text-[var(--medium-gray)] gap-4">
            <Link className="flex gap-1 items-center" target="_blank" to="https://www.facebook.com/"><FaFacebook /> Facebook</Link>
            <Link className="flex gap-1 items-center" target="_blank" to="https://www.linkedin.com/"><IoLogoLinkedin /> LinkedIn</Link>
            <Link className="flex gap-1 items-center" target="_blank" to="https://www.instagram.com/"><FaSquareInstagram /> Instagram</Link>
          </div>
        </div>
        <div >
          <p className="font-bold mb-3">Thông tin</p>
          <div className="flex flex-col gap-4">
            {
              informationAntoreee.map((infor) => (
                <div key={infor.id} className="text-sm  text-[var(--medium-gray)]">
                  {infor.content}
                </div>
              ))
            }
          </div>
        </div>
        <div className="hidden md:flex flex-col gap-2 items-center w-full">
          <img src={logoWeb} className="w-[50%] h-auto" />
          <div className="text-2xl md:text-4xl text-[var(--orange)]">Antoree</div>
        </div>
      </div>
    </div>

    <div className=" bg-[var(--medium-gray)] md:bg-[var(--orange)] text-center text-sm text-white md:py-5 py-2 flex justify-between md:justify-center px-[var(--padding-x)] items-center">
      <div>© 2025 Antoree</div>
      <div className="md:hidden flex gap-2 items-center w-1/2  justify-end">
        <span className="w-[15%] h-auto "><img src={logoWeb} /></span>
        <span className="text-lg text-white ">Antoree</span>
      </div>
    </div>
  </footer>
}

export default Footer;