import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const url = import.meta.env.VITE_API_URL_LOGIN;
  const fontStyle = { fontFamily: "'Segoe UI', sans-serif" };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Vui lòng nhập đầy đủ");
      return;
    }

    try {
      const res = await axios.post(`${url}`, {
        email: email,
        password: password,
      });

      const { token, expireIn } = res.data;

      // 🔥 Lưu token
      localStorage.setItem("token", token);

      // Optional: lưu expire time
      localStorage.setItem("expireIn", expireIn);

      login(email); // giữ lại context user

      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <Container>
      <div
        style={{
          maxWidth: "500px",
          margin: "100px auto",
          padding: "40px",
          border: "1px solid #dee2e6",
          borderRadius: "5px",
        }}
      >
        <h3 className="text-center mb-4">Đăng Nhập</h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Tài khoản:</Form.Label>
            <Form.Control
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập tài khoản"
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Mật khẩu:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
            />
          </Form.Group>

          <div className="text-center">
            <Button type="submit">Đăng Nhập</Button>
          </div>
        </Form>
        {/* Link đăng nhập */}
        <div className="text-center">
          <span style={{ ...fontStyle, fontSize: "14px", color: "#444" }}>
            Bạn chưa có tài khoản?{" "}
            <a
              href="/register"
              style={{
                color: "#2563eb",
                fontWeight: "600",
                textDecoration: "underline",
                ...fontStyle,
                fontSize: "14px",
              }}
            >
              Đăng ký
            </a>
          </span>
        </div>
      </div>
    </Container>
  );
}

export default Login;
