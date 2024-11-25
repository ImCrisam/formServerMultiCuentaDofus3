import { Col, Container, Row } from "react-grid-system";
import { GoogleFormEmbed } from "./GoogleFormEmbed";
import { GoogleSheetGraph } from "./GoogleSheetGraph";

const forms = [
  {
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSdOyLNUSmkoZrtlVJhccYo8-jnsZuFHIegGbvZQJVhspQ_WdQ/viewform?embedded=true",
  },
];
function App() {
  return (
    <Container fluid style={{ height: "100vh", marginTop: "20px" }}>
      <Row style={{ height: "100vh" }}>
        <Col sm={12} md={8}>
          {forms.map((form, index) => (
            <Col key={index} sm={12} style={{ height: "100vh" }}>
              <GoogleFormEmbed formUrl={form.formUrl} />
            </Col>
          ))}
        </Col>
        <Col sm={12} md={4}>
          <GoogleSheetGraph />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
