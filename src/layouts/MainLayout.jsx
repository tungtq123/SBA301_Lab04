import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Header />

      <Navbar />

      <main className="flex-fill container py-3">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
