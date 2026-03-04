import { useState } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";

const fontStyle = { fontFamily: "'Segoe UI', sans-serif" };

const inputStyle = {
  backgroundColor: "#eef1f8",
  border: "1px solid #e0e4ef",
  borderRadius: "8px",
  fontSize: "15px",
  padding: "12px 14px",
  boxShadow: "none",
  ...fontStyle,
};

const labelStyle = {
  fontSize: "15px",
  color: "#1a1a1a",
  marginBottom: "6px",
  ...fontStyle,
};

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/api/auth/signup", {
        email,
        password,
        role: role.toUpperCase(),
      });

      // login ngay sau khi đăng ký
      const loginRes = await axios.post(
        "http://localhost:8080/api/auth/signin",
        {
          email,
          password,
        },
      );

      const token = loginRes.data.token;

      const userData = {
        email,
        token,
      };

      login(userData, null);

      navigate("/home");
    } catch (err) {
      alert("Đăng ký thất bại!");
    }
  };

  // return (
  //   <div
  //     style={{
  //       minHeight: "100vh",
  //       backgroundColor: "#f5f6fa",
  //       display: "flex",
  //       alignItems: "center",
  //       justifyContent: "center",
  //       padding: "20px",
  //     }}
  //   >
  //     <Container>
  //       <Row className="justify-content-center">
  //         <Col xs={12} sm={10} md={8} lg={6}>
  //           <Card
  //             style={{
  //               backgroundColor: "#ffffff",
  //               border: "1px solid #e0e4ef",
  //               borderRadius: "14px",
  //               boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
  //             }}
  //           >
  //             <Card.Body className="p-5">
  //               <h4
  //                 className="text-center fw-bold mb-4"
  //                 style={{ ...fontStyle, fontSize: "28px", color: "#1a1a1a" }}
  //               >
  //                 Đăng Ký
  //               </h4>

  //               <Form onSubmit={handleSubmit}>
  //                 {/* Email */}
  //                 <Form.Group className="mb-3" controlId="formEmail">
  //                   <Form.Label style={labelStyle}>Tài khoản:</Form.Label>
  //                   <Form.Control
  //                     type="email"
  //                     placeholder="example@gmail.com"
  //                     value={email}
  //                     onChange={(e) => setEmail(e.target.value)}
  //                     required
  //                     style={inputStyle}
  //                   />
  //                 </Form.Group>

  //                 {/* Mật khẩu */}
  //                 <Form.Group className="mb-3" controlId="formMatKhau">
  //                   <Form.Label style={labelStyle}>Mật khẩu:</Form.Label>
  //                   <Form.Control
  //                     type="password"
  //                     placeholder="••••••"
  //                     value={password}
  //                     onChange={(e) => setPassword(e.target.value)}
  //                     required
  //                     style={inputStyle}
  //                   />
  //                 </Form.Group>

  //                 {/* Vai trò */}
  //                 <Form.Group className="mb-4" controlId="formVaiTro">
  //                   <Form.Label style={labelStyle}>
  //                     Vai trò: <span style={{ color: "#888", fontSize: "13px" }}>(admin/users)</span>
  //                   </Form.Label>
  //                   <Form.Select
  //                     value={role}
  //                     onChange={(e) => setRole(e.target.value)}
  //                     required
  //                     style={inputStyle}
  //                   >
  //                     <option value="">-- Chọn vai trò --</option>
  //                     <option value="admin">admin</option>
  //                     <option value="users">user</option>
  //                   </Form.Select>
  //                 </Form.Group>

  //                 {/* Nút Đăng Ký */}
  //                 <div className="text-center mb-3">
  //                   <Button
  //                     type="submit"
  //                     style={{
  //                       backgroundColor: "#2563eb",
  //                       border: "none",
  //                       borderRadius: "8px",
  //                       color: "#ffffff",
  //                       fontSize: "15px",
  //                       fontWeight: "600",
  //                       padding: "10px 36px",
  //                       ...fontStyle,
  //                     }}
  //                   >
  //                     Đăng Ký
  //                   </Button>
  //                 </div>

  //                 {/* Link đăng nhập */}
  //                 <div className="text-center">
  //                   <span style={{ ...fontStyle, fontSize: "14px", color: "#444" }}>
  //                     Bạn đã có tài khoản?{" "}
  //                     <a
  //                       href="/login"
  //                       style={{
  //                         color: "#2563eb",
  //                         fontWeight: "600",
  //                         textDecoration: "underline",
  //                         ...fontStyle,
  //                         fontSize: "14px",
  //                       }}
  //                     >
  //                       Đăng nhập
  //                     </a>
  //                   </span>
  //                 </div>
  //               </Form>
  //             </Card.Body>
  //           </Card>
  //         </Col>
  //       </Row>
  //     </Container>
  //   </div>
  // );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f6fa",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} sm={10} md={8} lg={6}>
            <Card
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e0e4ef",
                borderRadius: "14px",
                boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
              }}
            >
              <Card.Body className="p-5">
                <h4
                  className="text-center fw-bold mb-4"
                  style={{ ...fontStyle, fontSize: "28px", color: "#1a1a1a" }}
                >
                  Đăng Ký
                </h4>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label style={labelStyle}>Tài khoản:</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="example@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={inputStyle}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label style={labelStyle}>Mật khẩu:</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={inputStyle}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label style={labelStyle}>Vai trò:</Form.Label>
                    <Form.Select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      required
                      style={inputStyle}
                    >
                      <option value="">-- Chọn vai trò --</option>
                      <option value="admin">admin</option>
                      <option value="user">user</option>
                    </Form.Select>
                  </Form.Group>

                  <div className="text-center mb-3">
                    <Button
                      type="submit"
                      style={{
                        backgroundColor: "#2563eb",
                        border: "none",
                        borderRadius: "8px",
                        fontSize: "15px",
                        fontWeight: "600",
                        padding: "10px 36px",
                        ...fontStyle,
                      }}
                    >
                      Đăng Ký
                    </Button>
                  </div>

                  <div className="text-center">
                    Bạn đã có tài khoản?{" "}
                    <a
                      href="/login"
                      style={{
                        color: "#2563eb",
                        fontWeight: "600",
                      }}
                    >
                      Đăng nhập
                    </a>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
