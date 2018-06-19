import React from 'react';
import ReactDOM from 'react-dom';
import PlayerControls from '../components/PlayerControls';
import { shallow } from 'enzyme';


describe('App component', () =>{
  it('starts playing when play is clicked', () =>{
    const wrapper = shallow(<PlayerControls />);
    const playButton = wrapper.find('input.volume-bar');
    playButton.simulate('click');
    expect(wrapper.prop('isPlaying')).toEqual(true)
  });

});
