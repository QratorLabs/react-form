import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as faker from 'faker';

import TestForm from './utils/TestForm';
import { BaseControl } from '../Control';


describe('Form tests', () => {
  
  let genFormData = (empty) => ({
    email: empty ? '' : faker.internet.email(),
    password: empty ? '' : faker.internet.password()
  });

  let formWrapper, onSubmit, form, emailControl, emailInputEl, passwordControl, passwordInputEl;
  beforeEach(() => {
    onSubmit = jest.fn();
    formWrapper = mount(<TestForm onSubmit={onSubmit}/>);
    form = formWrapper.childAt(0);
    emailControl = form.findWhere(c => c.instance() instanceof BaseControl && c.prop('name') == 'email');
    passwordControl = form.findWhere(c => c.instance() instanceof BaseControl && c.prop('name') == 'password');
    emailInputEl = formWrapper.find('input[name="email"]');
    passwordInputEl = formWrapper.find('input[name="password"]');
  });

  test('Check Form controls mounting', () => {
    let checkMountedCount = () => {
      expect(Object.keys(form.instance()._controls).length)
        .toBe(formWrapper.prop('visible').length);
    }
    checkMountedCount();
    formWrapper.setProps({visible: formWrapper.prop('visible').slice(0, 1)});
    checkMountedCount();
    formWrapper.unmount();
  });

  describe('Form.value setter/getter', () => {
    test('Simulate controls change and checking value', () => {
      let newValue = genFormData(),
          emptyValue = genFormData(true);
      expect(form.instance().value).toEqual(emptyValue);
      emailInputEl.simulate('change', { target: { value: newValue.email }});
      passwordInputEl.simulate('change', { target: { value: newValue.password }});
      expect(form.instance().value).toEqual(newValue);
    });
  
    test('Set form value and checking controls value', () => {
      let newValue = genFormData();
      form.instance().setValue(newValue);
      expect({
        email: emailInputEl.instance().value,
        password: passwordInputEl.instance().value,
      }).toEqual(newValue);
    });
  });

  test('onSubmit prop', async () => {
    onSubmit.mockClear();
    let newValue = {...genFormData()};
    form.instance().setValue({...newValue, key: 12});
    formWrapper.find('button[type="submit"]').instance().click();
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual(newValue);

    formWrapper.setProps({onSubmit: null}, () => {
      formWrapper.find('button[type="submit"]').instance().click();
    });
  });

  test('onSubmitFailed prop', () => {
    onSubmit.mockClear();
    let onSubmitFailed = jest.fn();
    formWrapper.setProps({
      onSubmitFailed, onSubmit,
      validators: {
        email: [{name: 'email', msg: 'invalid email', f: val => val === 'mail@mail.com'}]
      }
    }, () => {
      formWrapper.find('button[type="submit"]').instance().click();
      expect(onSubmitFailed).toHaveBeenCalledTimes(1);
      expect(onSubmit).toHaveBeenCalledTimes(0);
    });
  })

  test('Check reset method', async () => {
    let newValue = {...genFormData()};
    form.instance().setValue({...newValue});
    form.instance().reset();

    let initialState = emailControl.instance().initialControlState;
    expect(emailControl.instance().getControlState()).toMatchObject(initialState);
    expect(passwordControl.instance().getControlState()).toMatchObject(initialState);
  });

  test('onChange prop', async () => {
    let onChange = jest.fn();
    formWrapper.setProps({onChange}, () => {
      let emailVal = faker.internet.email(),
          passwordVal = faker.internet.password();
      emailInputEl.simulate('change', {target: {value: emailVal}});
      passwordInputEl.simulate('change', {target: {value: passwordVal}});

      expect(onChange).toHaveBeenCalledTimes(2);
      expect(onChange.mock.calls[0][0]).toEqual({email: emailVal})
      expect(onChange.mock.calls[1][0]).toEqual({password: passwordVal})
    });
  });

});
