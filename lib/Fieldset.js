var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import * as React from 'react';
import PropTypes from 'prop-types';

import BaseControl from './Control/Base';

var Fieldset = function (_BaseControl) {
  _inherits(Fieldset, _BaseControl);

  function Fieldset() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Fieldset);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Fieldset.__proto__ || Object.getPrototypeOf(Fieldset)).call.apply(_ref, [this].concat(args))), _this), _this._controls = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Fieldset, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        onControlMount: this.handleControlMount.bind(this),
        onControlUnmount: this.handleControlUnmount.bind(this),
        onControlChange: this.handleControlChange.bind(this)
      };
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.context.onControlUnmount(this._id, this);
    }
  }, {
    key: 'handleControlMount',
    value: function handleControlMount(control, id, controlValue) {
      this._controls[id] = control;
      control.setForm(this);
      if (controlValue) {
        var value = _extends({}, this.value);
        value[control.name] = controlValue;
        this.context.onControlChange(this._id, value, true, true);
      }
    }
  }, {
    key: 'handleControlUnmount',
    value: function handleControlUnmount(id) {
      delete this._controls[id];
    }
  }, {
    key: 'handleControlChange',
    value: function handleControlChange(id, val, change, silent) {
      if (this.props.value) {
        change = false;
      }
      var control = this._controls[id];
      var name = control.name;
      var newValue = _extends({}, this.value);
      newValue[name] = val;
      var changes = _defineProperty({}, name, val);
      if (this.props.onChange && !silent) {
        this.props.onChange(changes, newValue);
      }
      this.context.onControlChange(this.id, newValue, change, silent);
    }
  }, {
    key: 'getControlValue',
    value: function getControlValue(name, id) {
      return this.value[name];
    }
  }, {
    key: 'getErrors',
    value: function getErrors() {
      var errors = Object.entries(this._controls).map(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            id = _ref3[0],
            c = _ref3[1];

        var errs = c.getErrors();
        if (errs.length) {
          return _defineProperty({}, id, errs);
        }
        return null;
      }).filter(Boolean);
      return [].concat(_toConsumableArray(this.getValidatorsErrors()), _toConsumableArray(errors));
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);

  return Fieldset;
}(BaseControl);

Fieldset.contextTypes = {
  onControlMount: PropTypes.func,
  onControlUnmount: PropTypes.func,
  onControlChange: PropTypes.func
};
Fieldset.childContextTypes = {
  onControlMount: PropTypes.func,
  onControlUnmount: PropTypes.func,
  onControlChange: PropTypes.func
};


export default Fieldset;