import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


/**
 * Form component
 * @class
 */
class Form extends React.Component {
  _value = {};
  _controls = {};
  _buttons = {};
  _errors = {};
  _initialValueApplied = false;
  static propTypes = {
    onSubmit: PropTypes.func,
    onSubmitFailed: PropTypes.func,
    onChange: PropTypes.func,
    className: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.array
    ])
  }
  static defaultProps = {
    className: null,
    preventSubmit: true
  }
  static childContextTypes = {
    onControlMount: PropTypes.func,
    onControlUnmount: PropTypes.func,
    onControlChange: PropTypes.func,

    onErrorMount: PropTypes.func,
    onErrorUnmount: PropTypes.func,

    onButtonMount: PropTypes.func,
    onButtonUnmount: PropTypes.func,
  }
  componentWillMount() {
    let { initialValue, value } = this.props;
    if (value) {
      this._value = value;
    } else if (initialValue && Object.keys(initialValue).length) {
      this._initialValueApplied = true;
      this._value = this.props.initialValue;
    }
  }
  async componentWillReceiveProps(nextProps) {
    let { initialValue, value } = nextProps;
    if (value) {
      this._value = value;
      this.updateControls();
      this.updateButtons();
    } else if (!this._initialValueApplied && initialValue && Object.keys(initialValue).length) {
      this._value = initialValue;
      this.updateControls();
      this.updateButtons();
    }
  }
  updateControls() {
    let promises = [];
    Object.entries(this._controls)
      .forEach(([id, c]) => {
        promises.push(c.updateControl());
      });
    return Promise.all(promises);
  }
  getChildContext() {
    return {
      onControlMount: ::this.handleControlMount,
      onControlUnmount: ::this.handleControlUnmount,
      onControlChange: ::this.handleControlChange,
      onErrorMount: ::this.handleErrorMount,
      onErrorUnmount: ::this.handleErrorUnmount,
      onButtonMount: ::this.handleButtonMount,
      onButtonUnmount: ::this.handleButtonUnmount,
    };
  }
  updateButtons() {
    let isValid = this.isValid();
    for (let [id, btn] of Object.entries(this._buttons)) {
      btn.setValidated(isValid);
    }
  }
  setErrors(errs) {
    for (let [fName, errors] of Object.entries(errs)) {
      let controls = Object.values(this._controls).filter(c => c.name == fName);
      controls.forEach(c => c.setError(errors[0]));
    }
  }
  
  handleControlMount(control, id, controlValue, controlInitialValue) {
    let { value: formValue } = this.props;
    this._controls[id] = control;
    control.setForm(this);
    let name = control.name;
    if (controlValue === undefined) {
      if (this._value.hasOwnProperty(name)) {
        controlValue = this._value[name];
      } else {
        controlValue = controlInitialValue;
      }
    }
    this._value[name] = controlValue;
    this.updateButtons();
  }
  getControlValue(name) {
    return this._value[name];
  }
  async handleControlChange(id, val, change=true, silent=false) {
    if (this.props.value) {
      change = false;
    }
    let control = this._controls[id];
    let name = control.name;
    let changes = {[name]: val};
    if (change) {
      this._value[name] = val;
    }
    if (this.props.onChange && !silent) {
      this.props.onChange(changes, {...this.getValue(), ...changes});
    }
    await this.updateControls();
    this.updateButtons();
  }
  handleControlUnmount(id) {
    let name = this._controls[id].name;
    delete this._controls[id];
    if (Object.values(this._controls).filter(c => c.name == name).length == 0) {
      delete this._value[name];
    }
    this.updateButtons();
  }
  handleErrorMount(id, component) {
    this._errors[id] = component;
  }
  handleErrorUnmount(id) {
    delete this._errors[id];
  }
  handleButtonMount(id, button) {
    this._buttons[id] = button;
    this.updateButtons();
  }
  handleButtonUnmount(id, component) {
    delete this._buttons[id];
  }
  /**
   * Method for checking if [Form]{@link Form} is valid
   * @returns {bool}
   */
  isValid() {
    let valid = true;
    for (let [id, control] of Object.entries(this._controls)) {
      if (control.getErrors().length) {
        valid = false;
        break;
      }
    }
    return valid;
  }

  /**
   * Make all errors visible for {@link Form} controls
   */
  showErrors() {
    for (let [id, control] of Object.entries(this._controls)) {
      control.showErrors();
    }
  }
  handleSubmit(e) {
    if (this.props.preventSubmit) {
      e.preventDefault();
    }
    let err = !this.isValid();
    this.showErrors();
    if (!err) {
      if (this.props.onSubmit) {
        this.props.onSubmit(this.getValue(), e);
      }
    } else {
      if (this.props.onSubmitFailed) {
        this.props.onSubmitFailed(this.getValue(), e);
      }
    }
  }

  /**
   * Get {@link Form} value
   * @returns {Object}
   */
  getValue() {
    return this._value;
  }

  /**
   * Set Form value externally
   * @param {Object} value New value for {@link Form}
   */
  async setValue(value) {
    this._value = value;
    await this.updateControls()
    this.updateButtons();
  }

  /**
   * Resets [controlState]{@link Base#controlState} of {@link Form} controls and updates its values to initial
   * @param {Object} value New value for {@link Form}
   */
  reset(restoreInitial=true) {
    for (let [id, control] of Object.entries(this._controls)) {
      control.reset();
    }
    if (restoreInitial) {
      this.setValue(this.props.initialValue);
    }
  }
  render() {
    let props = {
      ...this.props,
      onSubmit: ::this.handleSubmit,
      className: classnames(['q-form', this.props.className]),
    };
    delete props['initialValue'];
    delete props['onChange'];
    delete props['preventSubmit'];
    return (
      <form {...props}>
        {this.props.children}
      </form>
    );
  }
}

export default Form;
