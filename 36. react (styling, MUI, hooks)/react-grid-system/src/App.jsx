import Button from "./components/Button";
import Col from "./components/Col";
import Container from "./components/Container";
import Row from "./components/Row";

function App() {
  return (
    <>
      <Container fluid={false}>
        <Row>
          <Col size={100}>
            <h2>test column</h2>
            <Button />
          </Col>
          <Col size={100}>
            <h2>test column</h2>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
