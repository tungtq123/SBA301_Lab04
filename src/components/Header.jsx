import { Container, Row, Col, Button, Nav } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import axiosClient from "../api/axiosClient";
import axios from "axios";

function Header() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const [username, setUsername] = useState('');

  const url = import.meta.env.VITE_API_USER;

  const token = localStorage.getItem("token");

  async function fetchUser() {
    const res = axios.get(`${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsername((await res).data.username);

  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div style={{ borderBottom: "1px solid #dee2e6", padding: "10px 0" }}>
      <Container fluid>
        <Row className="align-items-center">
          <Col xs={2}>
            <div
              style={{
                border: "1px solid #ccc",
                padding: "20px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            ></div>
          </Col>

          <Col xs={7} className="text-center">
            <h4 style={{ margin: 0 }}>Quản Lý Khách Hàng</h4>
          </Col>

          <Col xs={3}>
            <div
              style={{
                display: "flex flex-col",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: "20px",
              }}
            >
              <div>Chào {username}</div>

              <div>Ngày: {new Date().toLocaleDateString("vi-VN")}</div>

              <Nav.Link onClick={handleLogout}>đăng xuất</Nav.Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Header;
