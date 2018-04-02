import React from 'react';
import { shallow, mount } from 'enzyme';

import Form from '../../Form';
import { InputControl } from '../../Control';

import TestForm from './utils/TestForm';

export function getLoginForm(onSubmit) {
  let props = {};
  if (onSubmit) {
    props = { onSubmit }
  }
  let form = mount(
    
  );
  let findInputControl = name => form.findWhere(
    c => c.prop('name') == name && c.instance() instanceof InputControl
  );
  let emailControl = findInputControl('email'),
      passwordControl = findInputControl('password');

  return { form, emailControl, passwordControl }
}