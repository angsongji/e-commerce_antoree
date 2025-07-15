import axiosClient from "./axiosClient"; // đường dẫn tùy dự án

const fetchCategories = () => axiosClient.get("/data/categories.json");

export { fetchCategories };