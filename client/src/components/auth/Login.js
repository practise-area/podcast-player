import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

import { Input, Form, Button, Message } from 'semantic-ui-react';

import '../../styles/Login.css';

class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/')
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }


  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    }
    this.props.loginUser(userData);
  }

  render() {
    const { errors } = this.state;

    let errorMessage = ''

    if (Object.keys(errors).length > 0) {
      errorMessage =
      <Message warning>
        <Message.Header>Whoops! We found a problem or two...</Message.Header>
        <p>{errors.name}</p>
        <p>{errors.email}</p>
        <p>{errors.password}</p>
        <p>{errors.password2}</p>
      </Message>
    } else {
      errorMessage = '';
    }

    return(
      <div className="login">
        <div className="login-header">
          <h1>Login</h1>
          <h4>Sign into your PodCast.le account</h4>
        </div>

        {errorMessage}

        <Form onSubmit={this.onSubmit}>
          <Form.Field>
            <input
              name="email"
              type="email"
              placeholder='Email Address'
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
            />
          </Form.Field>
          <Form.Field>
            <input
              name="password"
              type="password"
              placeholder='Password'
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
            />
          </Form.Field>

          <Button className="submit-button" color="olive">Submit</Button>
        </Form>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});


export default connect(mapStateToProps, { loginUser })(Login);
