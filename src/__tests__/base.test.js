import React from 'react';
import { mount } from 'enzyme';
import uuid from 'uuid';
import * as faker from 'faker';
import TestControl, { TestComponent } from './utils/TestBase';
import { BaseControl } from '../Control';

describe('BaseControl test', () => {

  let controlWrapper, control, component, name = faker.lorem.word();
  beforeEach(() => {
    controlWrapper = mount(<TestControl name={name}/>, {context: {}});
    control = controlWrapper.find(BaseControl);
    component = controlWrapper.find(TestComponent);
  });

  test('Base test', () => {
    expect(control.instance().name).toEqual(name);
  });

  test('Check focus/blur state', () => {
    component.instance().focus();
    expect(control.instance().getControlState())
      .toMatchObject({focus: true, blur: false})

    component.instance().blur();
    expect(control.instance().getControlState())
      .toMatchObject({focus: false, blur: true});
  });

  test('Check dirty/prisitne state', () => {
    expect(control.instance().getControlState())
      .toMatchObject({dirty: false, pristine: true});

    component.instance().change(faker.lorem.word());
    expect(control.instance().getControlState())
      .toMatchObject({dirty: true, pristine: false});    
  });

  test('Check touched/untouched state', () => {
    let state = {touched: false, untouched: true}
    expect(control.instance().getControlState())
      .toMatchObject(state);

    component.instance().focus();

    expect(control.instance().getControlState())
      .toMatchObject(state);

    component.instance().change(faker.lorem.word());

    expect(control.instance().getControlState())
      .toMatchObject(state);

    component.instance().blur();
    expect(control.instance().getControlState())
      .toMatchObject({touched: true, untouched: false});
  });

  test('Validation', () => {
    let valid = () => true,
        invalid = () => false;

    controlWrapper.setProps({validators: [{
      msg: 'error', name: 'invalid', f: valid
    }]}, () => {
      expect(control.instance().validate().length).toEqual(0);
    });

    controlWrapper.setProps({validators: [{
      msg: val => 'error ' + val, name: 'invalid', f: invalid
    }]}, () => {
      expect(control.instance().validate().length).toEqual(1);
      expect(control.instance().getVisibleErrors().length).toEqual(0);

      component.instance().focus();
      component.instance().blur();

      expect(control.instance().getVisibleErrors().length).toEqual(1);
    });
  });

  test('Event handlers', () => {
    let onFocus = jest.fn(),
        onBlur = jest.fn(),
        onChange = jest.fn();
    controlWrapper.setProps({onFocus, onChange, onBlur}, () => {
      component.instance().focus();
      component.instance().blur();
      component.instance().change(faker.lorem.word());

      expect(onFocus).toHaveBeenCalled();
      expect(onBlur).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalled();
    });
  });

  test('reset method', () => {
    component.instance().focus();
    component.instance().blur();
    component.instance().change(faker.lorem.word());

    expect(control.instance().getControlState()).not.toMatchObject(control.instance().initialControlState);
    control.instance().reset();
    expect(control.instance().getControlState()).toMatchObject(control.instance().initialControlState);

  });

  test('handle control id changing', () => {
    let onControlChangeIDContext = jest.fn();
    let cid = uuid.v4();
    controlWrapper.setProps({cid, onControlChangeIDContext}, () => {
      expect(onControlChangeIDContext).toHaveBeenCalledTimes(1);
    });
  });

  test('setError method', () => {
    expect(control.instance().getVisibleErrors()).toHaveLength(0);
    control.instance().setError('some error');
    expect(control.instance().getVisibleErrors()).toHaveLength(1);
  });

});
