import React from 'react';
import "../styles.css";
import {API} from "../backend"
import Base from './Base';
import {Card, Row, Container} from "react-bootstrap";

export default function Home() {
    console.log("API IS", API);
    return (
        <Base title="Home Page" description="Welcome to the ASPATAL">
        <Container>
        <Row>
            <Card style={{ width: '18rem'}}>
  <Card.Img variant="top" src="holder.js/100px180" />
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
  </Card.Body>
  <button className="btn btn-success btn-block">Appointment</button>
</Card>

<Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src="h1" />
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
  </Card.Body>
  <button className="btn btn-success btn-block">Appointment</button>
</Card>

<Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src="holder.js/100px180" />
  <Card.Body>
    <Card.Title>Card Title</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
  </Card.Body>
  <button className="btn btn-success btn-block">Appointment</button>
</Card>
</Row>
</Container>

            
        </Base>
    );
}
