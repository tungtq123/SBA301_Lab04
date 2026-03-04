import axios from "axios";
import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router";

const AddCustomer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [revenue, setRevenue] = useState("");
  const url = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();

    if (!name || !email || !address || !mobileNo || !revenue) {
      alert("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Chưa đăng nhập");
        return;
      }

      const newCustomer = {
        name,
        email,
        address,
        mobileNo,
        revenue: Number(revenue),
      };

      await axios.post(`${url}/v1/customers`, newCustomer, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Tạo khách hàng thành công!");
    } catch (error) {
      console.error(error);
      alert("Tạo khách hàng thất bại!");
    }
  };

  return (
    <Container fluid className="staff-container">
      <Row className="form-wrapper">
        <Col md={6}>
          <h5 className="form-title">Thêm Mới Khách Hàng</h5>

          <Form onSubmit={handleSave}>
            <Form.Group className="mb-3">
              <Form.Label>Tên:</Form.Label>
              <Form.Control
                placeholder="<Tên Khách Hàng>"
                onChange={(e) => {
                  setName(e.target.value);
                  console.log(name);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                placeholder="<Email của KH>"
                onChange={(e) => {
                  setEmail(e.target.value);
                  console.log(name);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Địa chỉ:</Form.Label>
              <Form.Control
                placeholder="<Địa chỉ của KH>"
                onChange={(e) => {
                  setAddress(e.target.value);
                  console.log(name);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Điện thoại:</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setMobileNo(e.target.value);
                  console.log(name);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Doanh thu (VND):</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setRevenue(e.target.value);
                  console.log(name);
                }}
              />
            </Form.Group>

            <div className="button-group">
              <Button variant="secondary" type="submit" onClick={handleSave}>
                Save
              </Button>
              <Button variant="outline-secondary" onClick={() => navigate(-1)}>Quay Lại</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddCustomer;
