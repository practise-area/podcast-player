import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authActions';

import { Form, Button, Message } from 'semantic-ui-react';
import '../../styles/Register.css';

class Register extends Component {
  constructor(props){
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
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
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
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

    return (
      <div className="register">
        <div className="register-header">
          <h1>Register</h1>
          <h4>Register for your PodCast.le account</h4>
        </div>

        {errorMessage}

        <Form error onSubmit={this.onSubmit}>
          <Form.Field>
            <input
              name="name"
              type="text"
              placeholder='Username'
              value={this.state.name}
              onChange={this.onChange}
              error={errors.name}
            />
          </Form.Field>
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
          <Form.Field>
            <input
              name="password2"
              type="password"
              placeholder='Confirm Password'
              value={this.state.password2}
              onChange={this.onChange}
              error={errors.password2}
            />
          </Form.Field>

          <Button className="submit-button" color="olive">Submit</Button>
        </Form>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});


export default connect(mapStateToProps, { registerUser })(withRouter(Register));
