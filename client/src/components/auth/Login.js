import React, { Component } from 'react';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

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
    console.log(userData);
  }

  render() {
    const { errors } = this.state;
    return(
      <div className="l">
        <div className="c">
          <div className="">
            <div className="">
              <h1 className="">Log In</h1>
              <p className="">Sign in to your account</p>
              <form onSubmit={this.onSubmit} >
                <TextFieldGroup
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                />

                <TextFieldGroup
                  placeholder="Password"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
                <input type="submit" className="" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}




export default Login;
