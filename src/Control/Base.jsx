import * as React from 'react';
import * as PropTypes from 'prop-types';
import classnames from 'classnames';
import uuid from 'uuid';

let opositeProperty = function(obj, key, targetKey) {
  Object.defineProperty(obj, key, {
    get: () => !obj[targetKey],
    set: val => obj[targetKey] = !val,
    enumerable: true
  });
}

/**
 * Base form control component
 * @class
 */
class Base extends React.Component {

  /**
   * @static
   * @property {*} component - Component to render as a control
   * @property {Function} isEmpty - Check if value is empty
   * @property {Array} validators - List of validators
   * @property {Array} showErrorOn - List of [controlState]{@link Base#controlState} keys. Display error only if all of values of specified keys are `true`
   * @property {bool} multipleError - If `true` shows all errors
   * @property {*} initialValue - Initial value for control
   * @property {Object.<string, Function>} mapProps - Add new props to component
   * @property {Function} getValue - Accepts event after control changed and returns value
   * @property {String} controlClassName - `className` prop passes to control
   */
  static propTypes = {
    component: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.instanceOf(React.Component)
    ]),
    isEmpty: PropTypes.func,
    validators: PropTypes.array,
    showErrorOn: PropTypes.array.isRequired,
    multipleErrors: PropTypes.bool.isRequired,
    initialValue: PropTypes.any,
    mapProps: PropTypes.object,
    getValue: PropTypes.func.isRequired,
    controlClassName: PropTypes.string,
  }

  static defaultProps = {
    isEmpty: v => v === undefined,
    validators: [],
    showErrorOn: ['touched', 'dirty'],
    multipleErrors: false,
    initialValue: undefined,
    mapProps: {},
    getValue: e => e,
    renderErrors: true,
    controlClassName: '',
  }

  /**
   * @constructor
   * @param {Object} props @see Allowed [propTypes]{@link Base#propTypes}
   */
  constructor(props) {
    super(props);

    this.initialControlState = {
      focus: false,
      touched: false,
      dirty: false,
      invalid: false,
      pending: false,
      empty: true,
    }

    
    this.controlState = {...this.initialControlState};

    opositeProperty(this.controlState, 'blur', 'focus');
    opositeProperty(this.controlState, 'untouched', 'touched');
    opositeProperty(this.controlState, 'pristine', 'dirty');
    opositeProperty(this.controlState, 'valid', 'invalid');
    opositeProperty(this.controlState, 'with-value', 'empty');

    this._value = props.hasOwnProperty('value') ? props.value : props.initialValue;
  }

  /**
   * The current UI-state of control
   * @private
   * @property {bool} focus - Is the control in focus
   * @property {bool} blur - Opposite to `focus`
   * @property {bool} touched - The control has been visited
   * @property {bool} untouched - Opposite to `touched`
   * @property {bool} valid - The control's value is valid
   * @property {bool} invalid - The control's value is invalid
   * @property {bool} empty - The control's value is empty
   * @property {bool} with-value - The control's value is not empty
   */
  controlState = {}

  /**
   * Control errors
   * @type {Array}
   * @private
   */
  _errors = [];

  inited = false;

  /**
   * Storing external errors set by method [setError]{@link Base#setError}
   * @type {Array}
   * @private
   */
  _externalErrors = [];

  defaultMapProps = {}

  static contextTypes = {
    onControlMount: PropTypes.func.isRequired,
    onControlUnmount: PropTypes.func.isRequired,
    onControlChangeID: PropTypes.func,
    onControlChange: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this._mounted = true;
    if (this.props.getRef) {
      this.props.getRef(this);
    }
    this._id = this.props.id ? this.props.id : uuid.v4();
    let value = undefined;
    if (this.props.hasOwnProperty('value')) {
      value = this.props.value;
    }
    this.context.onControlMount(this, this.id, value, this.props.initialValue);
    this.inited = true;
    this.forceUpdate();
  }
  componentWillUnmount() {
    this._mounted = false;
    this.context.onControlUnmount(this.id, this);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.index != this.props.index) {
      if (this.context.onControlChangeID) {
        this.context.onControlChangeID(this.props.index, this);
      }
    }
  }
  get id() {
    return this.props.hasOwnProperty('index') ? this.props.index : this._id;
  }

  /**
   * Current value of control
   */
  get value() {
    if (this.props.hasOwnProperty('value')) {
      return this.props.value;
    }
    if (!this.inited) {
      return this.props.initialValue;
    }
    let val = this._form.getControlValue(this.name, this.id)
    return val !== undefined ? val : this.props.initialValue;
  }

  /**
   * Set control value
   * @param val {*} Value to set
   */
  setValue(val) {
    this.context.onControlChange(this.id, val, true);
  }

  /**
   * Get control value
   * @return Current control value
   */
  get name() {
    return this.props.name;
  }

  setForm(f) {
    this._form = f;
  }

  /**
   * Resets [value]{@link Base#value} and [controlState]{@link Base#controlState} of control
   * @type {Function}
   */
  reset() {
    this.controlState = {
      ...this.controlState,
      ...this.initialControlState
    };
    this._showErrors = false;
    this.setValue(this.props.initialValue);
  }

  getControlState() {
    return this.controlState;
  }
  handleFocus(e) {
    this.controlState.focus = true;
    this.forceUpdate();
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  }
  handleBlur(e) {
    this.controlState.focus = false;
    this.controlState.touched = true;
    this.forceUpdate();
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  }
  handleChange(e) {
    let newValue = this.props.getValue(e);
    this._externalErrors = [];
    let changeFormValue = true;
    if (this.props.hasOwnProperty('value')) {
      changeFormValue = false;
    }
    this.context.onControlChange(this.id, newValue, changeFormValue);
    if (this.props.onChange) {
      this.props.onChange(e, newValue);
    }
    this.controlState.dirty = true;
    this.forceUpdate();
  }
  showErrors() {
    this._showErrors = true;
    this.forceUpdate();
  }

  /**
   * Set [externalErrors]{@link Base#_externalErrors} to controls
   * @param {*} errs Accepts array, object or string
   */
  setError(errs) {
    if (!Array.isArray(errs)) {
      errs = [errs];
    }
    this._externalErrors = errs;
    this.forceUpdate();
  }
  getValidatorsErrors() {
    if (!this._form) {
      return [];
    }
    let data = this.getFormValue();
    this._errors = this.props.validators.filter(v => !v.f(this.value, data));
    return this._errors;
  }
  getExternalErrors() {
    let { errorMessages } = this.props;
    return this._externalErrors.map(e => {
      let msg = e;
      if (typeof e == 'string') {
        msg = { msg: errorMessages[e] || e };
      }
      return msg;
    });
  }
  /**
   * Get all errors for current value
   * @returns {Array}
   */
  getErrors() {
    return this.getValidatorsErrors().concat(this.getExternalErrors());
  }
  updateControl() {
    return new Promise(resolve => {
      this.forceUpdate(resolve);
    });
  }
  getVisibleErrors() {
    let errors = [...this.getErrors()];
    if (!this._showErrors) {
      if (this.props.showErrorOn.find(s => !this.controlState[s])) {
        return [];
      }
    }
    return errors;
  }
  getFormValue() {
    if (this._form.getValue) {
      return this._form.getValue();
    } else {
      return this._form.getFormValue();
    }
  }
  render() {
    let props = {...this.props};
    let visibleErrors = this.getVisibleErrors();

    let errorMessages = visibleErrors.filter(e => e.hasOwnProperty('msg'));
    if (!props.multipleErrors) {
      errorMessages = errorMessages.slice(0, 1);
    }
    let errElement = null;
    
    errorMessages = errorMessages.map((e, i) => {
      let msg = e.msg;
      if (typeof msg == 'function') {
        msg = msg(this.value, this.getFormValue());
      }
      return msg;
    });

    if (errorMessages.length && props.renderErrors) {
      errElement = (
        <div className='q-form-group__errors'>
          {errorMessages.map((m, i) => (
            <div className='q-form-group-error' key={i}>{m}</div>
          ))}
        </div>
      );
    }

    this.controlState.invalid = this.getErrors().length > 0;
    this.controlState.empty = this.props.isEmpty(this.value);

    let controlState = {
      ...this.controlState,
      error: this.getVisibleErrors().length > 0,
    };

    let modifiers = [
      ...Object.entries(controlState).filter(v => v[1]).map(v => v[0]),
    ];

    let baseCls = 'q-form-group';
    let classes = classnames(['q-form-group', this.props.controlClassName, ...modifiers]);

    let { mapProps } = props;
    mapProps = {
      ...this.defaultMapProps,
      ...mapProps
    };

    props = {
      ...props,
      errors: errorMessages,
      value: this.value,
      onChange: ::this.handleChange,
      onBlur: ::this.handleBlur,
      onFocus: ::this.handleFocus,
      controlState
    };

    let updatedProps = {};
    for (let [key, f] of Object.entries(mapProps)) {
      updatedProps[key] = f(props);
    }

    delete props['validators'];
    delete props['component'];
    delete props['showErrorOn'];
    delete props['errorMessages'];
    delete props['isEmpty'];
    delete props['multipleErrors'];
    delete props['initialValue'];
    delete props['getRef'];
    delete props['mapProps'];
    delete props['getValue'];
    delete props['controlClassName'];
    delete props['cid'];
    delete props['controlState'];
    delete props['renderErrors'];

    props = { ...props, ...updatedProps };

    let component = null;
    if (this.props.component.prototype && this.props.component.prototype.isReactComponent) {
      component = React.createElement(this.props.component, props, props.children);
    } else {
      component = this.props.component(props);
    }
    return (
      <div className={classes}>
        {component}
        {errElement}
      </div>
    );
  }
}

export default Base;
