import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import FlexiListGroupItem from "../common/FlexListGroupItem";
import { connect } from "react-redux";
import { getLatestHeadLines } from "../../actions/stockAction";

class NewsWidget extends React.Component {
  componentDidMount() {
    this.props.getLatestHeadLines();
  }

  renderNews = () => {
    const { headlines } = this.props;
    let count = 0;
    return headlines.map(headline => {
        const { title, url, urlToImage, publishedAt, description } = headline;
   
      return (
        <FlexiListGroupItem key={count++}
          title={title}
          url={url}
          urlToImage={urlToImage}
          publishedAt={publishedAt}
          description={description}
        />
      );
    });
  };

  render() {
    if (this.props.headlines) {
      return (
        <div className="news-articles-widget">
          <Card bg="light" className="news-article-card">
            <Card.Header className="news-articles-widget-header">
              Latest Headlines
            </Card.Header>
            <Card.Body className="news-card-body">
              <ListGroup variant="flush" className="news-list-group">
                {this.renderNews()}
              </ListGroup>
            </Card.Body>
          </Card>
        </div>
      );
    } else {
      return <div>Loading..</div>;
    }
  }
}

const mapStateToProps = state => {
  return {
    headlines: state.stock.news
  };
};

export default connect(
  mapStateToProps,
  { getLatestHeadLines }
)(NewsWidget); 
