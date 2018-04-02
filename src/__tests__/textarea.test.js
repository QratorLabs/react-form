import * as React from 'react';
import * as faker from 'faker';
import { mount } from 'enzyme';
import TestTextarea from './utils/TestTextarea';

import { BaseControl } from '../Control';

describe('TextareaControl tests', () => {

  let controlWrapper, form, control, textarea;
  beforeEach(() => {
    controlWrapper = mount(<TestTextarea name={faker.lorem.word()}/>);
    form = controlWrapper.childAt(0);
    control = form.find(BaseControl);
    textarea = control.find('textarea');
  });

  test('Check set value', () => {
    expect(control.instance().value).toBe('');
    let value = faker.lorem.word();
    textarea.simulate('change', {target: {value} });
    expect(control.instance().value).toBe(value);
  });
});
