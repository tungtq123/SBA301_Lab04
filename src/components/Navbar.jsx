import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink
              to="/"
              className="nav-link d-flex align-items-center gap-2"
            >
              Trang Chủ
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/customers"
              className="nav-link d-flex align-items-center gap-2"
            >
              Danh Sách Khách Hàng
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
