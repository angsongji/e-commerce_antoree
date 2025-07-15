import { Link } from "react-router-dom";
import notFound from "../assets/notFound.svg"; // hãy để một ảnh tên 404.png trong thư mục assets
import PATH from "../routes/path";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-[var(--light-gray)] px-4">
      <img src={notFound} alt="404 Not Found" className="w-1/2 h-auto mb-6" />
      <h1 className="text-4xl font-bold text-[var(--orange)] mb-2">Chúc mừng bạn đã đến được đây</h1>
      <h1 className="text-3xl font-bold text-[var(--dark-gray)] mb-2">404 - Không tìm thấy trang</h1>
      <p className="text-[var(--medium-gray)] text-base mb-6">
        Trang bạn đang tìm không tồn tại hoặc đã bị xóa.
      </p>
      <Link
        to={PATH.HOME}
        className="px-6 py-2 bg-[var(--medium-gray)] text-white rounded hover:bg-[var(--orange)] transition-all"
      >
        Quay về Trang chủ
      </Link>
    </div>
  );
}
