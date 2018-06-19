import React from 'react';
import ReactDOM from 'react-dom';
import Menu from '../components/Menu';
import { shallow } from 'enzyme';


describe('App component', () =>{
  it('renders the menu text', () =>{
    const wrapper = shallow(<Menu />);
    const text = <div className="menu-title">Podcast Player</div>;
    expect(wrapper.contains(text)).toEqual(true);
  });

  it('renders the menu logo', () => {
    const wrapper = shallow(<Menu />);
    const text = <div className="menu-logo">
                   <i className="fab fa-fort-awesome-alt"></i>
                 </div>;
    expect(wrapper.contains(text)).toEqual(true);
  })

  it('renders the login and sign out links', () => {
    const wrapper = shallow(<Menu />);
    const text = <div className="nav-login">
                   Log In - Sign Up
                 </div>;
    expect(wrapper.contains(text)).toEqual(true);
  })
});
