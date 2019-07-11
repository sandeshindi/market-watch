import React from "react";
import { Container, Alert, Row, Col, Card } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { signUpUser } from "../../actions/authAction";

class SignUp extends React.Component {
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
    const { firstName, lastName, email, password } = formValues;

    this.props.signUpUser({ firstName, lastName, email, password });
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
                name="firstName"
                id = "firstName"
                label="First Name"
                component={this.renderInput}
              />
              <Field
                name="lastName"
                id="LastName"
                label="Last Name"
                component={this.renderInput}
              />
              <Field
                name="email"
                id="email"
                label="Email"
                component={this.renderInput}
                
              />
              <Field
                name="password"
                id="password"
                type="password"
                label="Password"
                component={this.renderInput}
              />
              <Field
                name="confirmPassword"
                id="confirmPassword"
                type="password"
                label="Confirm Password"
                component={this.renderInput}
              />
              <div className="form-group">
                <button type="submit" className="btn btn-primary float-right">
                  Register
                </button>
              </div>
              
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
    if (!formValues.firstName) {
      error.firstName = "Enter First Name";
    }
    if (!formValues.lastName) {
      error.lastName = "Enter Last Name";
    }
  
    if (!formValues.email) {
      error.email = "Enter Email";
    }
    if (!formValues.password) {
      error.password = "Enter Password";
    }
    if (!formValues.confirmPassword) {
      error.confirmPassword = "Re-Enter Password";
    }
    if (formValues.password && formValues.password.length < 6) {
      error.password = "Password must be atleast 6 characters";
    }
    if (
      formValues.password &&
      formValues.confirmPassword &&
      formValues.password !== formValues.confirmPassword
    ) {
      error.confirmPassword = "Re-Enter Passwords do not match";
    }
  
    return error;
  };
const SignUpForm = reduxForm({
  form: "signUp",
  validate
})(SignUp);

const mapStatetoProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  };
};

export default connect(
  mapStatetoProps,
  { signUpUser }
)(SignUpForm);
