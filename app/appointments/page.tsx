import { Container, Row, Col } from 'react-bootstrap';
import CalendarSection from "@/app/appointments/components/CalendarSection"
import AppointmentSection from "@/app/appointments/components/AppointmentSection"

export default function Appointments() {
  return (
    <Container fluid className="px-0">
      <Row>
        <Col className="px-0">
          <CalendarSection />
        </Col>
        <Col xs="auto" className="px-0">
          <AppointmentSection />
        </Col>
      </Row>
    </Container>
  );
}

