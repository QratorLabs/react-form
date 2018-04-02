var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import * as React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

/**
 * Form component
 * @class
 */

var Form = function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Form);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Form.__proto__ || Object.getPrototypeOf(Form)).call.apply(_ref, [this].concat(args))), _this), _this._value = {}, _this._controls = {}, _this._buttons = {}, _this._errors = {}, _this._initialValueApplied = false, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Form, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          initialValue = _props.initialValue,
          value = _props.value;

      if (value) {
        this._value = value;
      } else if (initialValue && Object.keys(initialValue).length) {
        this._initialValueApplied = true;
        this._value = this.props.initialValue;
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(nextProps) {
        var initialValue, value;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                initialValue = nextProps.initialValue, value = nextProps.value;

                if (value) {
                  this._value = value;
                  this.updateControls();
                  this.updateButtons();
                } else if (!this._initialValueApplied && initialValue && Object.keys(initialValue).length) {
                  this._value = initialValue;
                  this.updateControls();
                  this.updateButtons();
                }

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentWillReceiveProps(_x) {
        return _ref2.apply(this, arguments);
      }

      return componentWillReceiveProps;
    }()
  }, {
    key: 'updateControls',
    value: function updateControls() {
      var promises = [];
      Object.entries(this._controls).forEach(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            id = _ref4[0],
            c = _ref4[1];

        promises.push(c.updateControl());
      });
      return Promise.all(promises);
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        onControlMount: this.handleControlMount.bind(this),
        onControlUnmount: this.handleControlUnmount.bind(this),
        onControlChange: this.handleControlChange.bind(this),
        onErrorMount: this.handleErrorMount.bind(this),
        onErrorUnmount: this.handleErrorUnmount.bind(this),
        onButtonMount: this.handleButtonMount.bind(this),
        onButtonUnmount: this.handleButtonUnmount.bind(this)
      };
    }
  }, {
    key: 'updateButtons',
    value: function updateButtons() {
      var isValid = this.isValid();
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.entries(this._buttons)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ref5 = _step.value;

          var _ref6 = _slicedToArray(_ref5, 2);

          var id = _ref6[0];
          var btn = _ref6[1];

          btn.setValidated(isValid);
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
    }
  }, {
    key: 'setErrors',
    value: function setErrors(errs) {
      var _this2 = this;

      var _loop = function _loop(fName, errors) {
        var controls = Object.values(_this2._controls).filter(function (c) {
          return c.name == fName;
        });
        controls.forEach(function (c) {
          return c.setError(errors[0]);
        });
      };

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Object.entries(errs)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _ref7 = _step2.value;

          var _ref8 = _slicedToArray(_ref7, 2);

          var fName = _ref8[0];
          var errors = _ref8[1];

          _loop(fName, errors);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }, {
    key: 'handleControlMount',
    value: function handleControlMount(control, id, controlValue, controlInitialValue) {
      var formValue = this.props.value;

      this._controls[id] = control;
      control.setForm(this);
      var name = control.name;
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
  }, {
    key: 'getControlValue',
    value: function getControlValue(name) {
      return this._value[name];
    }
  }, {
    key: 'handleControlChange',
    value: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id, val) {
        var change = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
        var silent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        var control, name, changes;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.props.value) {
                  change = false;
                }
                control = this._controls[id];
                name = control.name;
                changes = _defineProperty({}, name, val);

                if (change) {
                  this._value[name] = val;
                }
                if (this.props.onChange && !silent) {
                  this.props.onChange(changes, _extends({}, this.getValue(), changes));
                }
                _context2.next = 8;
                return this.updateControls();

              case 8:
                this.updateButtons();

              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function handleControlChange(_x2, _x3) {
        return _ref9.apply(this, arguments);
      }

      return handleControlChange;
    }()
  }, {
    key: 'handleControlUnmount',
    value: function handleControlUnmount(id) {
      var name = this._controls[id].name;
      delete this._controls[id];
      if (Object.values(this._controls).filter(function (c) {
        return c.name == name;
      }).length == 0) {
        delete this._value[name];
      }
      this.updateButtons();
    }
  }, {
    key: 'handleErrorMount',
    value: function handleErrorMount(id, component) {
      this._errors[id] = component;
    }
  }, {
    key: 'handleErrorUnmount',
    value: function handleErrorUnmount(id) {
      delete this._errors[id];
    }
  }, {
    key: 'handleButtonMount',
    value: function handleButtonMount(id, button) {
      this._buttons[id] = button;
      this.updateButtons();
    }
  }, {
    key: 'handleButtonUnmount',
    value: function handleButtonUnmount(id, component) {
      delete this._buttons[id];
    }
    /**
     * Method for checking if [Form]{@link Form} is valid
     * @returns {bool}
     */

  }, {
    key: 'isValid',
    value: function isValid() {
      var valid = true;
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = Object.entries(this._controls)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var _ref10 = _step3.value;

          var _ref11 = _slicedToArray(_ref10, 2);

          var id = _ref11[0];
          var control = _ref11[1];

          if (control.getErrors().length) {
            valid = false;
            break;
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      return valid;
    }

    /**
     * Make all errors visible for {@link Form} controls
     */

  }, {
    key: 'showErrors',
    value: function showErrors() {
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = Object.entries(this._controls)[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _ref12 = _step4.value;

          var _ref13 = _slicedToArray(_ref12, 2);

          var id = _ref13[0];
          var control = _ref13[1];

          control.showErrors();
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      if (this.props.preventSubmit) {
        e.preventDefault();
      }
      var err = !this.isValid();
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

  }, {
    key: 'getValue',
    value: function getValue() {
      return this._value;
    }

    /**
     * Set Form value externally
     * @param {Object} value New value for {@link Form}
     */

  }, {
    key: 'setValue',
    value: function () {
      var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(value) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this._value = value;
                _context3.next = 3;
                return this.updateControls();

              case 3:
                this.updateButtons();

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function setValue(_x6) {
        return _ref14.apply(this, arguments);
      }

      return setValue;
    }()

    /**
     * Resets [controlState]{@link Base#controlState} of {@link Form} controls and updates its values to initial
     * @param {Object} value New value for {@link Form}
     */

  }, {
    key: 'reset',
    value: function reset() {
      var restoreInitial = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = Object.entries(this._controls)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _ref15 = _step5.value;

          var _ref16 = _slicedToArray(_ref15, 2);

          var id = _ref16[0];
          var control = _ref16[1];

          control.reset();
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      if (restoreInitial) {
        this.setValue(this.props.initialValue);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var props = _extends({}, this.props, {
        onSubmit: this.handleSubmit.bind(this),
        className: classnames(['q-form', this.props.className])
      });
      delete props['initialValue'];
      delete props['onChange'];
      delete props['preventSubmit'];
      return React.createElement(
        'form',
        props,
        this.props.children
      );
    }
  }]);

  return Form;
}(React.Component);

Form.propTypes = {
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func,
  onChange: PropTypes.func,
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.array])
};
Form.defaultProps = {
  className: null,
  preventSubmit: true
};
Form.childContextTypes = {
  onControlMount: PropTypes.func,
  onControlUnmount: PropTypes.func,
  onControlChange: PropTypes.func,

  onErrorMount: PropTypes.func,
  onErrorUnmount: PropTypes.func,

  onButtonMount: PropTypes.func,
  onButtonUnmount: PropTypes.func
};


export default Form;