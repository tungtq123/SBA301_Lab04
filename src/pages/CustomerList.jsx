import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Row, Col, Form, Table, Button } from "react-bootstrap";
import axiosClient from "../api/axiosClient";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [pageNo, setPageNo] = useState(0); // backend page bắt đầu từ 0
  const [totalPages, setTotalPages] = useState(0);
  const [searchEmail, setSearchEmail] = useState("");
  const [searchName, setSearchName] = useState("");

  const pageSize = 5;
  const navigate = useNavigate();

  const fetchCustomers = async () => {
    try {
      const res = await axiosClient.get("/v1/customers/search", {
        params: {
          page: pageNo,
          size: pageSize,
          email: searchEmail || null,
          name: searchName || null,
        },
      });

      setCustomers(res.data.content);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  // load khi pageNo thay đổi
  useEffect(() => {
    fetchCustomers();
  }, [pageNo]);

  // =====================
  // SEARCH
  // =====================
  const handleSearch = (e) => {
    e.preventDefault();
    setPageNo(0); // reset về page đầu
    fetchCustomers();
  };

  // =====================
  // PAGINATION
  // =====================
  const handlePrev = () => {
    if (pageNo > 0) setPageNo(pageNo - 1);
  };

  const handleNext = () => {
    if (pageNo < totalPages - 1) setPageNo(pageNo + 1);
  };

  return (
    <Container className="py-4">
      <h2>DANH SÁCH KHÁCH HÀNG</h2>

      {/* ===== SEARCH FORM ===== */}
      <Form onSubmit={handleSearch}>
        <div className="border p-3 mb-4">
          <Row className="mb-3">
            <Col md={4}>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="text"
                value={searchEmail}
                onChange={(e) => setSearchEmail(e.target.value)}
              />
            </Col>

            <Col md={4}>
              <Form.Label>Tên:</Form.Label>
              <Form.Control
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </Col>

            <Col md={4} className="d-flex align-items-end gap-2">
              <Button type="submit" variant="secondary">
                Tìm
              </Button>

              <Button
                variant="secondary"
                onClick={() => navigate("/add")}
              >
                Thêm Mới
              </Button>
            </Col>
          </Row>
        </div>
      </Form>

      {/* ===== PAGINATION BUTTON ===== */}
      <Row className="mb-2">
        <Col className="text-end">
          <Button
            variant="secondary"
            size="sm"
            className="me-2"
            onClick={handlePrev}
            disabled={pageNo === 0}
          >
            Previous
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleNext}
            disabled={pageNo >= totalPages - 1}
          >
            Next
          </Button>
        </Col>
      </Row>

      {/* ===== TABLE ===== */}
      <Table bordered className="mt-3">
        <thead className="table-dark">
          <tr>
            <th>STT</th>
            <th>Email</th>
            <th>Tên</th>
            <th>Địa Chỉ</th>
            <th>Điện thoại</th>
            <th>Doanh thu</th>
            <th></th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {customers.length > 0 ? (
            customers.map((s, index) => (
              <tr key={s.customerId}>
                <td>{pageNo * pageSize + index + 1}</td>
                <td>{s.email}</td>
                <td>{s.name}</td>
                <td>{s.address}</td>
                <td>{s.mobileNo}</td>
                <td>{s.revenue}</td>

                <td>
                  <Button
                    variant="link"
                    className="p-0"
                    onClick={() => navigate(`/customer/${s.customerId}`)}
                  >
                    Xem Chi Tiết
                  </Button>
                </td>

                <td>
                  <Button
                    variant="link"
                    className="p-0"
                    onClick={() => navigate(`/edit/${s.customerId}`)}
                  >
                    Chỉnh Sửa
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <div className="text-end">
        Trang {pageNo + 1} / {totalPages}
      </div>
    </Container>
  );
};

export default CustomerList;