import * as React from 'react';
import * as faker from 'faker';
import { mount } from 'enzyme';
import TestError from './utils/TestError';

import Error from '../Error';

describe('Error tests', () => {
  let errorWrapper, error, input;

  beforeEach(() => {
    errorWrapper = mount(<TestError/>);
    error = errorWrapper.find(Error);
    input = errorWrapper.find('input');
  });

  test('Check error visibility', () => {
    errorWrapper.setProps({validator: data => data.login.length >= 6}, () => {
      expect(error.html()).toBeNull();
      input.simulate('change', {target: {value: 'qwe'}});
      error.instance().setState({}, () => {
        expect(error.html()).not.toBeNull();
      })
    });
  });

  test('hideOnChange prop', () => {
    error.instance().show();
    expect(error.html()).not.toBeNull();
    input.simulate('change', {target: {value: faker.lorem.word()}});
    expect(error.html()).toBeNull();
  });
});
