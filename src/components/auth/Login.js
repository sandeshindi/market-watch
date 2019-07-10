import React from "react";
import { Container, Alert, Row, Col, Card } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { signIn } from "../../actions/authAction";

class Login extends React.Component {
  renderInput = ({ input, label, meta, type, id }) => {
    const classNameError = `form-text text-muted ${
      meta.touched && meta.error ? "error" : ""
    }`;
    const classNameFormControl = `form-control ${
      meta.touched && meta.error ? "error" : ""
    }`;
    return (
      <div className="field form-group">
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          {...input}
          type={type}
          className={classNameFormControl}
          required
        />
        {meta.touched && meta.error ? (
          <small id="emailHelp" className={classNameError}>
            {meta.error}
          </small>
        ) : (
          ""
        )}
      </div>
    );
  };

  onSubmit = formValues => {
     this.props.signIn(formValues.email, formValues.password);
  };

  render() {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <Container className= "auth-container">
        <Row className="justify-content-md-center">
          <Col md={6}>
          <Card><Card.Body>
            {authError ? <Alert variant="danger">{authError}</Alert> : ""}
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} noValidate>
              <Field
                name="email"
                id="email"
                label="Email"
                component={this.renderInput}
                className="form-group"
              />
              <Field
                name="password"
                id="password"
                type="password"
                label="Password"
                component={this.renderInput}
              />
              <div className="form-group">
                <button type="submit" className="btn btn-primary float-right">
                  Submit
                </button>
              </div>
              <h6>
                Not Registerd ?{" "}
                <Link to="/signup" className="teallink">
                  Sign Up
                </Link>
              </h6>
            </form>
            </Card.Body></Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const validate = formValues => {
  const error = {};

  if (!formValues.email) {
    error.email = "Enter Email";
  }
  if (!formValues.password) {
    error.password = "Enter Password";
  }

  return error;
};

const SignInForm = reduxForm({
  form: "signIn",
  validate
})(Login);

const mapStatetoProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  };
};

export default connect(
  mapStatetoProps,
  { signIn }
)(SignInForm);
