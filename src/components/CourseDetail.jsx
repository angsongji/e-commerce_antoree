import { FaStar, FaHeart, FaRegClock, FaBook, FaTags } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import {addToCart} from "../services/cartService";
import {toggleFavorite, isFavorite} from "../services/favoriteService";
import SectionCourseReview from "./SectionCourseReview";
import { Link, useSearchParams } from "react-router-dom";
function CourseDetail({ course }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFav, setIsFav] = useState(isFavorite(course.id));
  // const CourseReviewItem = ({course}) => {
  //   return (
  //     <div className="bg-white  rounded-md p-5 shadow-md flex flex-col gap-5 ">
  //       {/* Header đánh giá */}
  //       <div className="flex items-center gap-2 text-[var(--orange)] text-2xl font-semibold mb-2 ">
  //         <FaStar />
  //         <span>{course.rating} / 5</span>
  //         <span className="text-lg font-normal">({course.votes} đánh giá)</span>
  //       </div>
  //       <div>
  //         {course.comments.map((comment, index) => (
  //           <CommentItem
  //             key={index}
  //             comment={comment}
  //           />
  //         ))}
  //       </div>
  //       <button
  //         className=" font-semibold hover:underline cursor-pointer text-xs w-fit text-[var(--orange)]"
  //       >
  //         Xem thêm bình luận....
  //       </button>

  //     </div>
  //   );
  // };

  const InforCourseItem = ({ type, string }) => {
    const stringSplit = string.split("\n");
    let title = "";
    switch (type) {
      case "lessonContent":
        title = "Nội dung khóa học";
        break;
      case "requires":
        title = "Yêu cầu khóa học";
        break;
      case "description":
        title = "Mô tả khóa học";
        break;
    }
    return <div className="bg-white  rounded-md p-5 shadow-md">
        <h3 className="font-bold mb-2 text-[var(--dark-gray)] ">{title}</h3>
        {
          stringSplit.length > 1 ? <ul className="text-sm list-disc ml-4 space-y-1 leading-relaxed">
          {stringSplit.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul> : <div className="text-sm leading-relaxed">{string}</div>
        }
        
      </div>
  }

  return (

    <div
      className="fixed inset-0 bg-[var(--medium-gray)]/50 backdrop-blur-sm z-30 flex flex-col items-center justify-center"
    >
      <div className=" w-6/7 flex justify-end"><span onClick={() => setSearchParams({})} className="cursor-pointer translate-x-[100%] text-[var(--light-gray)] text-3xl"><IoClose /></span></div>
      <div className="flex flex-col lg:flex-row text-[var(--light-gray)] w-6/7 max-h-[90vh] bg-[var(--light-gray)] overflow-auto">
        {/* === Nội dung bên trái === */}
        <div className="flex-1 ">
          
          <div className="space-y-4 bg-black px-[var(--padding-x)] py-10 ">
          <h1 className=" bg-black text-2xl font-bold leading-tight">
            {course.title}
          </h1>
            <p className="text-sm ">
              {course.shortDescription}
            </p>

            {/* Rating, học viên, giảng viên */}
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center gap-1 text-[var(--orange)]">
                <FaStar />
                <span >{course.rating}</span>
                <span>/ 5</span>
                <span className="text-[var(--medium-gray)]">({course.votes} đánh giá)</span>
              </div>
            </div>

            <div className="text-sm text-[var(--medium-gray)] flex gap-3 items-center">
              <span className="flex gap-1 items-center">
                <span className="bg-[var(--light-gray)] rounded-full"><img src={course.author.avatar} className="w-7 h-7 rounded-full" /></span>
                <span className="text-[var(--light-gray)] underline font-medium">{course.author.name}</span>
              </span>
              <hr className="text-[var(--medium-gray)] w-1" />
              <span>Cập nhật lần cuối: {course.lastUpdate}</span>
            </div>
          </div>

          <div className="bg-[var(--light-gray)] p-[var(--padding-x)] text-[var(--medium-gray)] flex flex-col gap-5">
            {/* Thong tin ve khoa hoc */}
            <div className="flex flex-col gap-5">
            <InforCourseItem type="lessonContent" string={course.lessonContent}/>
            <InforCourseItem type="requires" string={course.requires}/>
            <InforCourseItem type="description" string={course.description}/>
            </div>
            {/* Bình luận */}
            <SectionCourseReview course={course}/>

          </div>

        </div>

        {/* === Thẻ bên phải === */}
        <div className="sticky top-0  w-full h-full lg:w-[300px] shrink-0 bg-white text-[var(--dark-gray)] shadow-md">
          <img
            src={course.image}
            alt="Ảnh khoá học"
            className="w-full h-40 object-cover"
          />

          <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span onClick={() => {
                toggleFavorite(course.id);
                setIsFav(!isFav);
              }} className="cursor-pointer text-2xl">{isFav ? <IoIosHeart className="text-[var(--orange)]" /> : <IoIosHeartEmpty  />}</span>
              <p className="text-xl font-bold text-right text-black">{course.price.toLocaleString()} đ</p>
            </div>

            <div className="flex gap-2">
              <button onClick={() => addToCart(course.id)} className="cursor-pointer flex-1 py-2 text-xs rounded bg-white border border-orange-500 text-orange-500 font-semibold hover:bg-orange-50">
                Thêm vào giỏ hàng
              </button>
              <button className="cursor-pointer flex-1 py-2 text-xs rounded bg-gradient-to-r from-[#D19988] to-[var(--orange)] text-white font-semibold">
                Mua ngay
              </button>
            </div>
            <div className="my-5">
              <hr className="text-[var(--medium-gray)]/50" />
            </div>

            <div className="text-sm flex flex-col gap-5 my-5">
              <div className="flex justify-between">
                <span className="font-semibold flex gap-1 items-center"><FaRegClock />THỜI LƯỢNG</span>
                <span>{course.duration}h</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold flex gap-1 items-center"><FaBook />BÀI HỌC</span>
                <span>{course.lessons} bài học</span>
              </div>
              <div className=" justify-between">
                <div className="font-semibold flex gap-1 items-center"><FaTags />CHỦ ĐỀ</div>
                <div className="flex gap-2 flex-wrap mt-2">
                  {
                    course.categories.map((category, index) => (
                      <Link to={`/all-courses/${category.id}`} key={index} className="text-xs text-white bg-[var(--medium-gray)] py-1 px-2 rounded-full">{category.name}</Link>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
}

export default CourseDetail;
