import axiosClient from "./axiosClient"; // đường dẫn tùy dự án

const fetchCourses = () => axiosClient.get("/data/courses.json");

export { fetchCourses };
