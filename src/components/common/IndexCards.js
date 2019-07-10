import React from "react";
import { Card, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { getIndexData } from "../../actions/stockAction";

class IndexCards extends React.Component {
  constructor(props) {
    super(props);
    this.state = { intervalVar: null };
  }

  componentDidMount() {
    this.props.getIndexData(this.props.index, this.props.isGlobal);
    var intervalVar = setInterval(() => {
      this.props.getIndexData(this.props.index, this.props.isGlobal);
    }, 900000);
    this.setState({ intervalVar });
  }

  componentWillUnmount() {
      clearInterval(this.state.intervalVar);
  }


  render() {
    if (this.props.indexData) {
      const {
        pricecurrent,
        CHANGE,
        PERCCHANGE,
        company
      } = this.props.indexData;

      return (
        <Card bg="light" className="index-cards">
          <Card.Header className="index-card-header">
            <Row>
              <Col>{pricecurrent}</Col>
              <Col>
                {CHANGE < 0 ? (
                  <img src="/images/down.png" alt="" />
                ) : (
                  <img src="/images/up.png" alt="" />
                )}
              </Col>
              <Col>
                {CHANGE} ({PERCCHANGE}%)
              </Col>
            </Row>
          </Card.Header>
          <Card.Body
            className="index-card-body"
            style={{ backgroundColor: CHANGE < 0 ? "#dc3545" : "#28a745" }}
          >
            <Card.Text className="index-card-text">{company}</Card.Text>
          </Card.Body>
        </Card>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

const mapStatetoProps = (state, ownProps) => {
  return {
    indexData: state.stock[ownProps.index.replace("%3B", ";")]
  };
};

export default connect(
  mapStatetoProps,
  { getIndexData }
)(IndexCards);
