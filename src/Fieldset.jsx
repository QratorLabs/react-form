import * as React from 'react';
import PropTypes from 'prop-types';

import BaseControl from './Control/Base';

class Fieldset extends BaseControl {

  _controls = {};

  static contextTypes = {
    onControlMount: PropTypes.func,
    onControlUnmount: PropTypes.func,
    onControlChange: PropTypes.func,
  }
  static childContextTypes = {
    onControlMount: PropTypes.func,
    onControlUnmount: PropTypes.func,
    onControlChange: PropTypes.func,
  }
  getChildContext() {
    return {
      onControlMount: ::this.handleControlMount,
      onControlUnmount: ::this.handleControlUnmount,
      onControlChange: ::this.handleControlChange,
    };
  }

  componentWillUnmount() {
    this.context.onControlUnmount(this._id, this);
  }

  handleControlMount(control, id, controlValue) {
    this._controls[id] = control;
    control.setForm(this);
    if (controlValue) {
      let value = {...this.value};
      value[control.name] = controlValue;
      this.context.onControlChange(this._id, value, true, true);
    }
  }
  handleControlUnmount(id) {
    delete this._controls[id];
  }
  handleControlChange(id, val, change, silent) {
    if (this.props.value) {
      change = false;
    }
    let control = this._controls[id];
    let name = control.name;
    let newValue = {...this.value};
    newValue[name] = val;
    let changes = {[name]: val};
    if (this.props.onChange && !silent) {
      this.props.onChange(changes, newValue);
    }
    this.context.onControlChange(this.id, newValue, change, silent);
  }
  getControlValue(name, id) {
    return this.value[name];
  }

  getErrors() {
    let errors = Object.entries(this._controls).map(([id, c]) => {
      let errs = c.getErrors();
      if (errs.length) {
        return { [id]: errs };
      }
      return null;
    }).filter(Boolean);
    return [...this.getValidatorsErrors(), ...errors];
  }

  render() {
    return this.props.children;
  }
}

export default Fieldset;
