import { Container, Row, Col } from "react-bootstrap"

export const Footer = () => {
    const currentYear = new Date().getFullYear()
    
  return (
    <footer className="footer-overlay">
            <Row>
                <Col className="text-center py-3">
                    <p>Hotelul Pisicos &copy; {currentYear}</p>
                </Col>
            </Row>
    </footer>
  )
}
