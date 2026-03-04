import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid #dee2e6",
        padding: "16px 0",
        fontSize: "16px",
        // marginTop: "40px",
      }}
    >
      <Container fluid>
        <Row>
          <Col md={6}>
            <div>@2015, Bản Quyền Thuộc Công Ty ABC</div>
            <div>Địa Chỉ: Khu Công Nghệ Cao Hòa Lạc</div>
            <div>Liên Hệ: agent@fpt.edu.vn</div>
          </Col>

          <Col md={6} className="text-start">
            <a href="#" className="text-decoration-none text-dark">
              Giới Thiệu
            </a>
            {" | "}
            <a href="#" className="text-decoration-none text-dark">
              Hỗ Trợ
            </a>
            {" | "}
            <a href="#" className="text-decoration-none text-dark">
              Nghề Nghiệp
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;