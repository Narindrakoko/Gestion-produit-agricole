import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import Sidebar from './Side';

function Home() {
  return (
    <Container>
      <Row>
        <Col xs={12} sm={12} md={4} lg={3}>
          <Sidebar />
        </Col>
        <Col xs={12} sm={12} md={8} lg={9}>
          <h1 className="text-center">Home Page</h1>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;