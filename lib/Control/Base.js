'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _propTypes = require('prop-types');

var PropTypes = _interopRequireWildcard(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var opositeProperty = function opositeProperty(obj, key, targetKey) {
  Object.defineProperty(obj, key, {
    get: function get() {
      return !obj[targetKey];
    },
    set: function set(val) {
      return obj[targetKey] = !val;
    },
    enumerable: true
  });
};

/**
 * Base form control component
 * @class
 */

var Base = function (_React$Component) {
  _inherits(Base, _React$Component);

  /**
   * @constructor
   * @param {Object} props @see Allowed [propTypes]{@link Base#propTypes}
   */


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
  function Base(props) {
    _classCallCheck(this, Base);

    var _this = _possibleConstructorReturn(this, (Base.__proto__ || Object.getPrototypeOf(Base)).call(this, props));

    _this.controlState = {};
    _this._errors = [];
    _this.inited = false;
    _this._externalErrors = [];
    _this.defaultMapProps = {};


    _this.initialControlState = {
      focus: false,
      touched: false,
      dirty: false,
      invalid: false,
      pending: false,
      empty: true
    };

    _this.controlState = _extends({}, _this.initialControlState);

    opositeProperty(_this.controlState, 'blur', 'focus');
    opositeProperty(_this.controlState, 'untouched', 'touched');
    opositeProperty(_this.controlState, 'pristine', 'dirty');
    opositeProperty(_this.controlState, 'valid', 'invalid');
    opositeProperty(_this.controlState, 'with-value', 'empty');

    _this._value = props.hasOwnProperty('value') ? props.value : props.initialValue;
    return _this;
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


  /**
   * Control errors
   * @type {Array}
   * @private
   */


  /**
   * Storing external errors set by method [setError]{@link Base#setError}
   * @type {Array}
   * @private
   */


  _createClass(Base, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._mounted = true;
      if (this.props.getRef) {
        this.props.getRef(this);
      }
      this._id = this.props.id ? this.props.id : _uuid2.default.v4();
      var value = undefined;
      if (this.props.hasOwnProperty('value')) {
        value = this.props.value;
      }
      this.context.onControlMount(this, this.id, value, this.props.initialValue);
      this.inited = true;
      this.forceUpdate();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._mounted = false;
      this.context.onControlUnmount(this.id, this);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.index != this.props.index) {
        if (this.context.onControlChangeID) {
          this.context.onControlChangeID(this.props.index, this);
        }
      }
    }
  }, {
    key: 'setValue',


    /**
     * Set control value
     * @param val {*} Value to set
     */
    value: function setValue(val) {
      this.context.onControlChange(this.id, val, true);
    }

    /**
     * Get control value
     * @return Current control value
     */

  }, {
    key: 'setForm',
    value: function setForm(f) {
      this._form = f;
    }

    /**
     * Resets [value]{@link Base#value} and [controlState]{@link Base#controlState} of control
     * @type {Function}
     */

  }, {
    key: 'reset',
    value: function reset() {
      this.controlState = _extends({}, this.controlState, this.initialControlState);
      this._showErrors = false;
      this.setValue(this.props.initialValue);
    }
  }, {
    key: 'getControlState',
    value: function getControlState() {
      return this.controlState;
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus(e) {
      this.controlState.focus = true;
      this.forceUpdate();
      if (this.props.onFocus) {
        this.props.onFocus(e);
      }
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur(e) {
      this.controlState.focus = false;
      this.controlState.touched = true;
      this.forceUpdate();
      if (this.props.onBlur) {
        this.props.onBlur(e);
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      var newValue = this.props.getValue(e);
      this._externalErrors = [];
      var changeFormValue = true;
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
  }, {
    key: 'showErrors',
    value: function showErrors() {
      this._showErrors = true;
      this.forceUpdate();
    }

    /**
     * Set [externalErrors]{@link Base#_externalErrors} to controls
     * @param {*} errs Accepts array, object or string
     */

  }, {
    key: 'setError',
    value: function setError(errs) {
      if (!Array.isArray(errs)) {
        errs = [errs];
      }
      this._externalErrors = errs;
      this.forceUpdate();
    }
  }, {
    key: 'getValidatorsErrors',
    value: function getValidatorsErrors() {
      var _this2 = this;

      if (!this._form) {
        return [];
      }
      var data = this.getFormValue();
      this._errors = this.props.validators.filter(function (v) {
        return !v.f(_this2.value, data);
      });
      return this._errors;
    }
  }, {
    key: 'getExternalErrors',
    value: function getExternalErrors() {
      var errorMessages = this.props.errorMessages;

      return this._externalErrors.map(function (e) {
        var msg = e;
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

  }, {
    key: 'getErrors',
    value: function getErrors() {
      return this.getValidatorsErrors().concat(this.getExternalErrors());
    }
  }, {
    key: 'updateControl',
    value: function updateControl() {
      var _this3 = this;

      return new Promise(function (resolve) {
        _this3.forceUpdate(resolve);
      });
    }
  }, {
    key: 'getVisibleErrors',
    value: function getVisibleErrors() {
      var _this4 = this;

      var errors = [].concat(_toConsumableArray(this.getErrors()));
      if (!this._showErrors) {
        if (this.props.showErrorOn.find(function (s) {
          return !_this4.controlState[s];
        })) {
          return [];
        }
      }
      return errors;
    }
  }, {
    key: 'getFormValue',
    value: function getFormValue() {
      if (this._form.getValue) {
        return this._form.getValue();
      } else {
        return this._form.getFormValue();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var props = _extends({}, this.props);
      var visibleErrors = this.getVisibleErrors();

      var errorMessages = visibleErrors.filter(function (e) {
        return e.hasOwnProperty('msg');
      });
      if (!props.multipleErrors) {
        errorMessages = errorMessages.slice(0, 1);
      }
      var errElement = null;

      errorMessages = errorMessages.map(function (e, i) {
        var msg = e.msg;
        if (typeof msg == 'function') {
          msg = msg(_this5.value, _this5.getFormValue());
        }
        return msg;
      });

      if (errorMessages.length && props.renderErrors) {
        errElement = React.createElement(
          'div',
          { className: 'q-form-group__errors' },
          errorMessages.map(function (m, i) {
            return React.createElement(
              'div',
              { className: 'q-form-group-error', key: i },
              m
            );
          })
        );
      }

      this.controlState.invalid = this.getErrors().length > 0;
      this.controlState.empty = this.props.isEmpty(this.value);

      var controlState = _extends({}, this.controlState, {
        error: this.getVisibleErrors().length > 0
      });

      var modifiers = [].concat(_toConsumableArray(Object.entries(controlState).filter(function (v) {
        return v[1];
      }).map(function (v) {
        return v[0];
      })));

      var baseCls = 'q-form-group';
      var classes = (0, _classnames2.default)(['q-form-group', this.props.controlClassName].concat(_toConsumableArray(modifiers)));

      var _props = props,
          mapProps = _props.mapProps;

      mapProps = _extends({}, this.defaultMapProps, mapProps);

      props = _extends({}, props, {
        errors: errorMessages,
        value: this.value,
        onChange: this.handleChange.bind(this),
        onBlur: this.handleBlur.bind(this),
        onFocus: this.handleFocus.bind(this),
        controlState: controlState
      });

      var updatedProps = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.entries(mapProps)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ref = _step.value;

          var _ref2 = _slicedToArray(_ref, 2);

          var key = _ref2[0];
          var f = _ref2[1];

          updatedProps[key] = f(props);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
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

      props = _extends({}, props, updatedProps);

      var component = null;
      if (this.props.component.prototype && this.props.component.prototype.isReactComponent) {
        component = React.createElement(this.props.component, props, props.children);
      } else {
        component = this.props.component(props);
      }
      return React.createElement(
        'div',
        { className: classes },
        component,
        errElement
      );
    }
  }, {
    key: 'id',
    get: function get() {
      return this.props.hasOwnProperty('index') ? this.props.index : this._id;
    }

    /**
     * Current value of control
     */

  }, {
    key: 'value',
    get: function get() {
      if (this.props.hasOwnProperty('value')) {
        return this.props.value;
      }
      if (!this.inited) {
        return this.props.initialValue;
      }
      var val = this._form.getControlValue(this.name, this.id);
      return val !== undefined ? val : this.props.initialValue;
    }
  }, {
    key: 'name',
    get: function get() {
      return this.props.name;
    }
  }]);

  return Base;
}(React.Component);

Base.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.instanceOf(React.Component)]),
  isEmpty: PropTypes.func,
  validators: PropTypes.array,
  showErrorOn: PropTypes.array.isRequired,
  multipleErrors: PropTypes.bool.isRequired,
  initialValue: PropTypes.any,
  mapProps: PropTypes.object,
  getValue: PropTypes.func.isRequired,
  controlClassName: PropTypes.string
};
Base.defaultProps = {
  isEmpty: function isEmpty(v) {
    return v === undefined;
  },
  validators: [],
  showErrorOn: ['touched', 'dirty'],
  multipleErrors: false,
  initialValue: undefined,
  mapProps: {},
  getValue: function getValue(e) {
    return e;
  },
  renderErrors: true,
  controlClassName: '' };
Base.contextTypes = {
  onControlMount: PropTypes.func.isRequired,
  onControlUnmount: PropTypes.func.isRequired,
  onControlChangeID: PropTypes.func,
  onControlChange: PropTypes.func.isRequired
};
exports.default = Base;