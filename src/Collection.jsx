import * as React from 'react';
import uuid from 'uuid';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import BaseControl from './Control/Base';

class Collection extends BaseControl {

  inited = false;
  _ids = {};

  static propTypes = {
    name: PropTypes.string.isRequired
  }
  static defaultProps = {
    initialValue: [],
    isEmpty: val => !val || val.length == 0,
    validators: []
  }
  _controls = {}

  static contextTypes = {
    onControlMount: PropTypes.func,
    onControlUnmount: PropTypes.func,
    onControlChange: PropTypes.func,
  }
  static childContextTypes = {
    onControlMount: PropTypes.func,
    onControlUnmount: PropTypes.func,
    onControlChange: PropTypes.func,
    onControlChangeID: PropTypes.func,
  }

  getChildContext() {
    return {
      onControlMount: ::this.handleControlMount,
      onControlUnmount: ::this.handleControlUnmount,
      onControlChange: ::this.handleControlChange,
      onControlChangeID: ::this.handleControlChangeID
    };
  }
  handleControlMount(control, index, controlValue) {
    this._controls[index] = control;
    control.setForm(this);
    if (controlValue) {
      let value = [...this.value];
      value[index] = controlValue;
      this.context.onControlChange(this._id, value, true, true);
    }
  }
  handleControlUnmount(index) {
    delete this._controls[index];
  }

  handleControlChangeID(index, control) {
    this._controls[index] = control;
  }

  componentWillUnmount() {
    this.context.onControlUnmount(this._id, this);
  }

  async addValue(val='', first=false) {
    let value = [...this.value, val];
    this._ids = [...this._ids, uuid.v4()];
    if (first) {
      value = [val, ...this.value];
      this._ids = [uuid.v4(), ...this._ids];
    }
    let change = true;
    if (this.props.value) {
      change = false;
    }
    await this.context.onControlChange(this._id, value, change);
  }

  async deleteByIndex(index) {
    let change = true;
    if (this.props.value) {
      change = false;
    }
    let changes = {index: undefined};
    let value = this.value.filter((_, i) => i != index);
    this._ids = this._ids.filter((_, i) => i != index);
    if (this.props.onChange) {
      this.props.onChange(changes, value);
    }
    await this.context.onControlChange(this.id, value, change);
  }
  getIndexById(id) {
    return this._ids.findIndex(v => v == id)
  }
  handleControlChange(index, val, change, silent) {
    if (this.props.value) {
      change = false;
    }
    let control = this._controls[index];
    let name = this.name;
    let newValue = [...this.value];
    newValue[index] = val;
    let changes = {[index]: val};
    if (this.props.onChange && !silent) {
      this.props.onChange(changes, newValue);
    }
    this.context.onControlChange(this.id, newValue, change, silent);
  }
  updateSelf() {
    return new Promise(resolve => {
      this.forceUpdate(resolve);
    });
  }
  async updateControl() {
    await this.updateSelf();
    let controls = Object.values(this._controls);
    return Promise.all(
      controls.filter(c => c._mounted).map(c => c.updateControl())
    );
  }
  setErrors(errors) {
    Object.entries(this._controls).forEach(([i, control]) => {
      let controlErr = errors[i] || [];
      if (controlErr.length > 0) {
        control.setError(controlErr);
      }
    });
  }
  getControlValue(name, index) {
    return this.value[index];
  }
  getErrors() {
    let errors = Object.entries(this._controls).map(([index, c]) => {
      let errs = c.getErrors();
      if (errs.length) {
        return { index, errors: errs };
      }
      return null;
    }).filter(Boolean);
    return [...this.getValidatorsErrors(), ...errors];
  }
  showErrors() {
    Object.entries(this._controls).forEach(c => c[1].showErrors());
  }

  render() {
    if (!this.inited) {
      return null;
    }
    let props = { ...this.props };
    let children = props.children;

    delete props['children'];
    delete props['name'];
    delete props['initialValue'];

    switch (this._ids.length - this.value.length) {
      case 1:
        this._ids = this._ids.filter((v, i) => i !== this._ids.length - 1);
        break;
      case -1:
        this._ids = [uuid.v4(), ...this._ids];
        break;
      case 0:
        break;
      default:
        this._ids = this.value.map(_ => uuid.v4());
    }

    props = {
      ...props,
      ids: this._ids,
      addValue: ::this.addValue,
      deleteByIndex: ::this.deleteByIndex,
      value: this.value,
    }

    switch (typeof children) {
      case 'object': 
        if (!Array.isArray(props.children)) {
          if (React.isValidElement(children)) {
            children = React.cloneElement(children, props);
          }
        }
        break;
      case 'function':
        children = children(props);
        break;
      default:
        break;
    }
    return children;
  }
}

export default Collection;
