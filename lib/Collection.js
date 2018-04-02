var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import * as React from 'react';
import uuid from 'uuid';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import BaseControl from './Control/Base';

var Collection = function (_BaseControl) {
  _inherits(Collection, _BaseControl);

  function Collection() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Collection);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Collection.__proto__ || Object.getPrototypeOf(Collection)).call.apply(_ref, [this].concat(args))), _this), _this.inited = false, _this._ids = {}, _this._controls = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Collection, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        onControlMount: this.handleControlMount.bind(this),
        onControlUnmount: this.handleControlUnmount.bind(this),
        onControlChange: this.handleControlChange.bind(this),
        onControlChangeID: this.handleControlChangeID.bind(this)
      };
    }
  }, {
    key: 'handleControlMount',
    value: function handleControlMount(control, index, controlValue) {
      this._controls[index] = control;
      control.setForm(this);
      if (controlValue) {
        var value = [].concat(_toConsumableArray(this.value));
        value[index] = controlValue;
        this.context.onControlChange(this._id, value, true, true);
      }
    }
  }, {
    key: 'handleControlUnmount',
    value: function handleControlUnmount(index) {
      delete this._controls[index];
    }
  }, {
    key: 'handleControlChangeID',
    value: function handleControlChangeID(index, control) {
      this._controls[index] = control;
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.context.onControlUnmount(this._id, this);
    }
  }, {
    key: 'addValue',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var first = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var value, change;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                value = [].concat(_toConsumableArray(this.value), [val]);

                this._ids = [].concat(_toConsumableArray(this._ids), [uuid.v4()]);
                if (first) {
                  value = [val].concat(_toConsumableArray(this.value));
                  this._ids = [uuid.v4()].concat(_toConsumableArray(this._ids));
                }
                change = true;

                if (this.props.value) {
                  change = false;
                }
                _context.next = 7;
                return this.context.onControlChange(this._id, value, change);

              case 7:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function addValue() {
        return _ref2.apply(this, arguments);
      }

      return addValue;
    }()
  }, {
    key: 'deleteByIndex',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(index) {
        var change, changes, value;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                change = true;

                if (this.props.value) {
                  change = false;
                }
                changes = { index: undefined };
                value = this.value.filter(function (_, i) {
                  return i != index;
                });

                this._ids = this._ids.filter(function (_, i) {
                  return i != index;
                });
                if (this.props.onChange) {
                  this.props.onChange(changes, value);
                }
                _context2.next = 8;
                return this.context.onControlChange(this.id, value, change);

              case 8:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function deleteByIndex(_x3) {
        return _ref3.apply(this, arguments);
      }

      return deleteByIndex;
    }()
  }, {
    key: 'getIndexById',
    value: function getIndexById(id) {
      return this._ids.findIndex(function (v) {
        return v == id;
      });
    }
  }, {
    key: 'handleControlChange',
    value: function handleControlChange(index, val, change, silent) {
      if (this.props.value) {
        change = false;
      }
      var control = this._controls[index];
      var name = this.name;
      var newValue = [].concat(_toConsumableArray(this.value));
      newValue[index] = val;
      var changes = _defineProperty({}, index, val);
      if (this.props.onChange && !silent) {
        this.props.onChange(changes, newValue);
      }
      this.context.onControlChange(this.id, newValue, change, silent);
    }
  }, {
    key: 'updateSelf',
    value: function updateSelf() {
      var _this2 = this;

      return new Promise(function (resolve) {
        _this2.forceUpdate(resolve);
      });
    }
  }, {
    key: 'updateControl',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        var controls;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.updateSelf();

              case 2:
                controls = Object.values(this._controls);
                return _context3.abrupt('return', Promise.all(controls.filter(function (c) {
                  return c._mounted;
                }).map(function (c) {
                  return c.updateControl();
                })));

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function updateControl() {
        return _ref4.apply(this, arguments);
      }

      return updateControl;
    }()
  }, {
    key: 'setErrors',
    value: function setErrors(errors) {
      Object.entries(this._controls).forEach(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            i = _ref6[0],
            control = _ref6[1];

        var controlErr = errors[i] || [];
        if (controlErr.length > 0) {
          control.setError(controlErr);
        }
      });
    }
  }, {
    key: 'getControlValue',
    value: function getControlValue(name, index) {
      return this.value[index];
    }
  }, {
    key: 'getErrors',
    value: function getErrors() {
      var errors = Object.entries(this._controls).map(function (_ref7) {
        var _ref8 = _slicedToArray(_ref7, 2),
            index = _ref8[0],
            c = _ref8[1];

        var errs = c.getErrors();
        if (errs.length) {
          return { index: index, errors: errs };
        }
        return null;
      }).filter(Boolean);
      return [].concat(_toConsumableArray(this.getValidatorsErrors()), _toConsumableArray(errors));
    }
  }, {
    key: 'showErrors',
    value: function showErrors() {
      Object.entries(this._controls).forEach(function (c) {
        return c[1].showErrors();
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      if (!this.inited) {
        return null;
      }
      var props = _extends({}, this.props);
      var children = props.children;

      delete props['children'];
      delete props['name'];
      delete props['initialValue'];

      switch (this._ids.length - this.value.length) {
        case 1:
          this._ids = this._ids.filter(function (v, i) {
            return i !== _this3._ids.length - 1;
          });
          break;
        case -1:
          this._ids = [uuid.v4()].concat(_toConsumableArray(this._ids));
          break;
        case 0:
          break;
        default:
          this._ids = this.value.map(function (_) {
            return uuid.v4();
          });
      }

      props = _extends({}, props, {
        ids: this._ids,
        addValue: this.addValue.bind(this),
        deleteByIndex: this.deleteByIndex.bind(this),
        value: this.value
      });

      switch (typeof children === 'undefined' ? 'undefined' : _typeof(children)) {
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
  }]);

  return Collection;
}(BaseControl);

Collection.propTypes = {
  name: PropTypes.string.isRequired
};
Collection.defaultProps = {
  initialValue: [],
  isEmpty: function isEmpty(val) {
    return !val || val.length == 0;
  },
  validators: []
};
Collection.contextTypes = {
  onControlMount: PropTypes.func,
  onControlUnmount: PropTypes.func,
  onControlChange: PropTypes.func
};
Collection.childContextTypes = {
  onControlMount: PropTypes.func,
  onControlUnmount: PropTypes.func,
  onControlChange: PropTypes.func,
  onControlChangeID: PropTypes.func
};


export default Collection;