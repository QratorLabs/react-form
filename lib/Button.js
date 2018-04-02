var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import * as React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

var Button = function (_React$Component) {
  _inherits(Button, _React$Component);

  function Button() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Button);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Button.__proto__ || Object.getPrototypeOf(Button)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isValid: true
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Button, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._id = uuid.v4();
      this.context.onButtonMount(this._id, this);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.context.onButtonUnmount(this._id);
    }
  }, {
    key: 'setValidated',
    value: function setValidated(isValid) {
      this.setState({ isValid: isValid });
    }
  }, {
    key: 'render',
    value: function render() {
      var props = _extends({}, this.props);
      props.isValid = this.state.isValid;
      var component = props.component;
      delete props['component'];

      if (!props.hasOwnProperty('disabled')) {
        if (props['disabledOnInvalid']) {
          props.disabled = !this.state.isValid && ['reset', 'button'].indexOf(props.type) < 0;
        }
      }
      delete props['disabledOnInvalid'];
      delete props['isValid'];
      return component(props);
    }
  }]);

  return Button;
}(React.Component);

Button.defaultProps = {
  disabledOnInvalid: true,
  component: function component(props) {
    return React.createElement(
      'button',
      _extends({ disabled: disabled }, props),
      btnProps.children
    );
  }
};
Button.contextTypes = {
  onButtonMount: PropTypes.func,
  onButtonUnmount: PropTypes.func
};


export default Button;