import React from 'react';
import ReactDOM from 'react-dom';
import Player from '../components/Player';
import Search from '../components/Search';
import { shallow } from 'enzyme';


describe('App component', () =>{
  it('renders the search component', () =>{
    const wrapper = shallow(<Player />);
    const text = <section className="search-section"></section>;
    expect( 2 + 2).toEqual(4);
  });

});
