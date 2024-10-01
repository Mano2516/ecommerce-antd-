import { Routes, Route } from "react-router-dom";
import Category from "../Pages/category/Index";
import Home from "../Pages/home/Index";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Category />} />
      <Route path="/:categoryId" element={<Category />} />
    </Routes>
  );
}
