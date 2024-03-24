import { Container, Row, Col } from 'react-bootstrap';
import Image from "next/image";

interface Field {
  label: string;
  value: string;
  imageSrc: string;
}

interface CardProps {
  title: string;
  imageSrc?: string;
  name?: string; 
  subName?: string; 
  fields: Field[];
}

const Card: React.FC<CardProps> = ({ title, imageSrc, name, subName, fields }) => {
  return (
    <Container fluid className="px-0 ">
      <Row className='mb-3'>
        <strong style={{ textTransform: 'uppercase', fontSize: '14px', color: '#9D9C9C' }}>{title}</strong>
      </Row>
      <Row className='mb-3 px-2 align-items-center'>
        <Col xs="auto" className="px-1">
          {imageSrc && 
            <div style={{ width: 52, height: 52, borderRadius: '50%', overflow: 'hidden' }}>
              <Image alt="Main Image" src={imageSrc} width={52} height={52} />
            </div>
          }
        </Col>
        <Col className="px-3">
          {name && <strong style={{ fontSize: 16 }}>{name}</strong>}
          {subName && <p style={{ fontSize: 16, color: '#9D9C9C' }}>{subName}</p>}
        </Col>
      </Row>
      <Row>
        <Col>
          {fields.map((field, index) => (
            <Row key={index} className='mb-2'>
              <Col xs={4} className="d-flex gap-2 align-items-top">
                <div className='mt-1'>
                  <Image alt="Field Image" src={field.imageSrc} width={20} height={20} />
                </div>
                
                <p>{field.label}</p>
              </Col>
              <Col className="px-0">
                <div className='d-flex align-items-top'>
                  {field.value}
                </div>
              </Col>
            </Row>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default Card;
