import React from "react";
import { Navbar, Nav, Image, Button } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import history from "../../history";
import { Field, reduxForm } from "redux-form";
import { signOut } from "../../actions/authAction";
import {
  searchSymbol,
  setCurrentStockSearched
} from "../../actions/stockAction";
import AutoSuggestInput from "../common/AutoSuggestInput";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: null, activePage: "home" };
  }
  componentDidMount() {
    const color =
      "#" +
      Math.random()
        .toString(16)
        .slice(2, 8);
    this.setState({ color: color });
  }
  renderInput = ({ input, type, placeholder }) => {
    return (
      <input
        {...input}
        type={type}
        placeholder={placeholder}
        onChange={this.onSearchStocks}
      />
    );
  };

  onSearchStocks = formValues => {
    this.props.searchSymbol(formValues.searchStocks);
  };

  getStockQuotes = (event, { symbol }) => {
    this.props.setCurrentStockSearched(symbol);
  };

  render() {
    const activePage = this.state.activePage;
    const { auth, profile } = this.props;
    const { color } = this.state;
    return (
      <Navbar bg="dark" expand="lg" variant="dark">
        <Navbar.Brand>
          <Link to="/" onClick={() => this.setState({ activePage: "home" })}>
            <Image
              src="images/logo.png"
              roundedCircle
              style={{ width: "35px", height: "35px" }}
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link
              to="/"
              className={activePage === "home" ? "nav-link active" : "nav-link"}
              onClick={() => this.setState({ activePage: "home" })}
            >
              Home
            </Link>
            {auth.uid ? (
              <Link
                to="/watchlist"
                className={
                  activePage === "watchlist" ? "nav-link active" : "nav-link"
                }
                onClick={() => this.setState({ activePage: "watchlist" })}
              >
                Watch List
              </Link>
            ) : (
              <Redirect to="/" />
            )}
            <Nav.Link>
              {activePage === "home" ? (
                <form
                  className="form-inline my-2 my-lg-0"
                  onSubmit={event => event.preventDefault()}
                >
                  <Field
                    className=" mr-sm-2 form-control"
                    name="searchStocks"
                    type="text"
                    placeholder="Search"
                    component={AutoSuggestInput}
                    suggestions={this.props.searchResult}
                    handleFetch={this.onSearchStocks}
                  />
                </form>
              ) : (
                ""
              )}
            </Nav.Link>
          </Nav>
          <Nav>
            {auth.uid ? (
              <React.Fragment>
                <Button
                  className="btn-circle btn-xl"
                  style={{ backgroundColor: color, borderColor: color }}
                >
                  {profile.initials}
                </Button>
                <Nav.Link href="#" onClick={() => this.props.signOut()}>
                  Log out
                </Nav.Link>
              </React.Fragment>
            ) : (
              <Button variant="info" onClick={() => history.push("/login")}>
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    searchResult: state.stock.searchResult,
    currentSearchSymbol: state.stock.currentSearchedSymbol
  };
};

const stockSearchFrom = reduxForm({
  form: "stockSearch"
})(Header);

export default connect(
  mapStateToProps,
  { signOut, searchSymbol, setCurrentStockSearched }
)(stockSearchFrom);
