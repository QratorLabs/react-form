import * as React from 'react';
import * as faker from 'faker';
import { mount } from 'enzyme';
import TestInput from './utils/TestInput';


describe('InputControl tests', () => {

  let controlWrapper, control, input;
  beforeEach(() => {
    controlWrapper = mount(<TestInput name={faker.lorem.word()}/>);
    control = controlWrapper.childAt(0);
    input = control.find('input');
  });

  test('Check preventEnter', () => {
    controlWrapper.setProps({preventEnter: true}, () => {
      let preventDefault = jest.fn();
      input.simulate('focus');      
      input.simulate('keydown', { keyCode: 13, preventDefault});
      expect(preventDefault).toHaveBeenCalled();

      controlWrapper.setProps({preventEnter: false}, () => {
        preventDefault.mockClear();     
        input.simulate('keydown', { keyCode: 13, preventDefault});
        expect(preventDefault).not.toHaveBeenCalled();
      });

    });
  });
});