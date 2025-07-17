import { Modal, message } from 'antd';
import SectionHeader from "../../components/SectionHeader";
import CourseCartCard from "../../components/CourseCartCard";
import { useState, useEffect } from "react";
import useScrollToTop from "../../hooks/useScrollToTop";
import { getCart } from "../../services/cartService";
import { fetchCourses } from "../../services/courseService";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { removeFromCart } from "../../services/cartService";
import { clearCart } from "../../services/cartService";
function CartPage() {
    const [results, setResults] = useState([]);
    const [total, setTotal] = useState(2000000);
    const {scrollToTop } = useScrollToTop();
    useEffect(() => {
        scrollToTop();
    }, []);
    useEffect(() => {
        const total = results.reduce((acc, r) => acc + r.price, 0);
        setTotal(total);
    }, [results]);

     useEffect(() => {
              const cart = getCart();
              const fetchCoursesCall = async () => {
                  try {
                      const response = await fetchCourses();
                      const filteredCourses = cart
                      .map(id => response.data.find(course => course.id === id))
                      .filter(Boolean);
                      setResults(filteredCourses);
                  } catch (error) {
                      console.error("Error fetching courses:", error);
                  }
              };
              fetchCoursesCall();
          }, []);
    const removeFromCartAction = (courseId) => {
        
        Modal.confirm({
            title: 'Xác nhận?',
            content: 'Bạn chắc chắn muốn xóa khóa học này khỏi giỏ hàng',
            okText: 'Đồng ý',
            cancelText: 'Quay về',
            okType: 'danger',
            onOk() {
                removeFromCart(courseId);
               setResults(results.filter(r => r.id !== courseId));
                message.success('Đã xóa khóa học khỏi giỏ hàng!', 2);
            },
          });
    }
    const removeAllCartAction = () => {
        Modal.confirm({
            title: 'Xác nhận?',
            content: 'Bạn chắc chắn muốn xóa tất cả trong giỏ hàng',
            okText: 'Đồng ý',
            cancelText: 'Quay về',
            okType: 'danger',
            onOk() {
                clearCart();
                setResults([]);
                message.success('Đã xóa tất cả khỏi giỏ hàng!', 2);
            },
          });
        
    }
    const CartSummaryCard = ({ onCheckout }) => {
        return (
          <div className=" block md:sticky top-0 z-10 md:shadow-[0_3px_10px_rgb(0,0,0,0.2)] md:rounded-md py-2 md:p-5 bg-white  h-fit w-full border-t border-[var(--medium-gray)] md:border-0">
            <div className='flex md:block gap-1 justify-between items-center'>
            <p className="text-sm text-[var(--medium-gray)] font-semibold md:mb-2">Tổng cộng:</p>
            <p className="text-xl md:text-3xl font-bold text-[var(--dark-gray)]  md:mb-5">
              {total.toLocaleString("vi-VN")} đ
            </p>
            </div>
            
      
            <button
              onClick={onCheckout}
              className="md:text-base text-xs w-full py-1 py-2 md:px-4 md:py-3 rounded-md text-white  mt-3 md:mt-5
                         bg-gradient-to-r from-[#D19988] to-[var(--orange)] hover:opacity-90 
                         transition-all duration-300 cursor-pointer  tracking-wider"
            >
              Thanh toán ngay
            </button>
          </div>
        );
      };
    return <div className="bg-white py-10">
        <SectionHeader
            title={`Giỏ hàng (${results.length})`}
            subtitle={results.length > 0 ? "Bạn đã thêm các khóa học này vào giỏ hàng" : "Không có khóa học nào"}
            decsAction={results.length > 0 ? "Xóa tất cả" : ""}
            onAction={results.length > 0 ? () => removeAllCartAction() : undefined}
        />
        {
            results.length == 0 && (
                <div className="text-[var(--orange)] py-5">
                    <p className="text-center">Hãy khám phá khóa học và thêm các khóa học bạn thích vào giỏ hàng!</p>
                </div>
            )
        }

        {
            results.length > 0 && (
                <div className="grid md:grid-cols-[70%_30%] px-[var(--padding-x)] relative ">
                    <div className='block md:hidden'>
                    <CartSummaryCard total={total} onCheckout={() => message.info("Chưa có tính năng này!", 2)} />
                        </div>
                        <div className='block md:hidden my-5 text-xs text-[var(--medium-gray)]'>Danh sách sản phẩm</div>
                    <div className=" grid gap-5 pr-0 md:pr-10">
                        {results.map((r) => (
                            <div key={r.id} className="relative h-fit" >
                                <CourseCartCard course={r} />
                                <button onClick={() => removeFromCartAction(r.id)} className="cursor-pointer absolute bottom-0 right-0 text-[var(--medium-gray)] hover:text-[var(--dark-gray)] transition">
                                    <RiDeleteBin2Fill className="text-2xl"/>
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className='hidden md:block'>
                    <CartSummaryCard total={total} onCheckout={() => message.info("Chưa có tính năng này!", 2)} />
                        </div>
                    
                </div>
            )
        }
    </div>

}

export default CartPage;