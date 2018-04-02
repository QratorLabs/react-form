import * as React from 'react';
import * as faker from 'faker';
import { mount } from 'enzyme';
import TestCollection from './utils/TestCollection';

import { BaseControl } from '../Control';
import Collection from '../Collection';

describe('Collection tests', () => {

  let collectionWrapper, form, collection;
  beforeEach(() => {
    collectionWrapper = mount(<TestCollection/>);
    form = collectionWrapper.childAt(0);
    collection = form.find(Collection);
  });

  test('setValue method', () => {
    let val = ['qwe', 'asd', 'zxc'];
    collection.instance().setValue(val);
    expect(collection.instance().value).toBe(val);
  });

  test('addValue method', () => {
    collection.instance().addValue('qwe');
    expect(collection.instance().value).toEqual(expect.arrayContaining(['qwe']));
  });

  test('check errors', () => {
    collection.instance().setValue(['qwe', 'qweasd', 'qwe']);
    let errors = collection.instance().validate();
    collection.instance().showErrors();
    expect(errors).toHaveLength(2);
  });

  test('onChange prop', () => {
    let onChange = jest.fn();
    collectionWrapper.setProps({onChange}, () => {
      collection.instance().setValue(['qwe', 'qweasd', 'qwe']);
      collection.find('input').first().simulate('change', {target: {value: 'hello'}});
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });

});
