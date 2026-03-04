import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const EditCustomer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [revenue, setRevenue] = useState("");
  const url = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();

  async function fetchCustomer() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Chưa đăng nhập");
        return;
      }
      const res = await axios.get(`${url}/v1/customers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data;

      setName(data.name);
      setEmail(data.email);
      setAddress(data.address);
      setMobileNo(data.mobileNo);
      setRevenue(data.revenue);
    } catch (error) {
      console.error(error);
      alert("Không tìm thấy khách hàng!");
    }
  }

  useEffect(() => {
    fetchCustomer();
  }, []);

  const handleSave = async (e) => {
  e.preventDefault();

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

  await axios.put(`${url}/v1/customers/${id}`, newCustomer, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  alert("Cập nhật thành công!");
};


  return (
    <Container fluid className="staff-container">
      <Row className="form-wrapper">
        <Col md={6}>
          <h5 className="form-title">Sửa Thông Tin Khách Hàng</h5>

          <Form onSubmit={handleSave}>
            <Form.Group className="mb-3">
              <Form.Label>Tên:</Form.Label>
              <Form.Control
                value={name}
                placeholder="<Tên Khách Hàng>"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                value={email}
                placeholder="<Email của KH>"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Địa chỉ:</Form.Label>
              <Form.Control
                value={address}
                placeholder="<Địa chỉ của KH>"
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Điện thoại:</Form.Label>
              <Form.Control
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Doanh thu (VND):</Form.Label>
              <Form.Control
                type="number"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
              />
            </Form.Group>

            <div className="button-group">
              <Button variant="secondary" type="submit" onClick={handleSave}>
                Save
              </Button>
              <Button variant="outline-secondary" onClick={() => navigate(-1)}>
                Quay Lại
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditCustomer;
