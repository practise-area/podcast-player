import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import Player from '../components/Player';
import Menu from '../components/Menu';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Renders Sections', () =>{
  it('renders an instance of menu', () =>{
    const wrapper = shallow(<App />);
    const text = <section className="menu-container"><Menu /></section>;
    expect(wrapper.contains(text)).toEqual(true);
  });

  it('renders an instance of player', () =>{
    const wrapper = shallow(<App />);
    const text = <section className="player-container"><Player /></section>;
    expect(wrapper.contains(text)).toEqual(true);
  });
});
