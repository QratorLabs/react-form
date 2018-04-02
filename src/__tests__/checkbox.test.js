import * as React from 'react';
import * as faker from 'faker';
import { mount } from 'enzyme';
import TestCheckbox from './utils/TestCheckbox';

import { BaseControl } from '../Control';

describe('CheckboxControl tests', () => {

  let controlWrapper, form, control, checkbox;
  beforeEach(() => {
    controlWrapper = mount(<TestCheckbox name={faker.lorem.word()}/>);
    form = controlWrapper.childAt(0);
    control = form.find(BaseControl);
    checkbox = control.find('input[type="checkbox"]');
  });

  test('Check set value', () => {
    expect(control.instance().value).toBe(false);
    checkbox.simulate('click');
    expect(control.instance().value).toBe(false);
  });

  test('onChange prop', () => {
    let onChange = jest.fn();
    controlWrapper.setProps({onChange}, () => {
      checkbox.simulate('change', {target: {checked: true}});
      expect(control.instance().value).toBe(true);

      checkbox.simulate('change', {target: {checked: false}});
      expect(control.instance().value).toBe(false);
    });
  });

});
