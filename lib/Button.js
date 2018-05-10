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
      props,
      props.children
    );
  }
};
Button.contextTypes = {
  onButtonMount: PropTypes.func,
  onButtonUnmount: PropTypes.func
};


export default Button;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9CdXR0b24uanN4Il0sIm5hbWVzIjpbIlJlYWN0IiwiUHJvcFR5cGVzIiwidXVpZCIsIkJ1dHRvbiIsInN0YXRlIiwiaXNWYWxpZCIsIl9pZCIsInY0IiwiY29udGV4dCIsIm9uQnV0dG9uTW91bnQiLCJvbkJ1dHRvblVubW91bnQiLCJzZXRTdGF0ZSIsInByb3BzIiwiY29tcG9uZW50IiwiaGFzT3duUHJvcGVydHkiLCJkaXNhYmxlZCIsImluZGV4T2YiLCJ0eXBlIiwiQ29tcG9uZW50IiwiZGVmYXVsdFByb3BzIiwiZGlzYWJsZWRPbkludmFsaWQiLCJjaGlsZHJlbiIsImNvbnRleHRUeXBlcyIsImZ1bmMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEtBQUtBLEtBQVosTUFBdUIsT0FBdkI7QUFDQSxPQUFPQyxTQUFQLE1BQXNCLFlBQXRCO0FBQ0EsT0FBT0MsSUFBUCxNQUFpQixNQUFqQjs7SUFFTUMsTTs7Ozs7Ozs7Ozs7Ozs7c0xBYUpDLEssR0FBUTtBQUNOQyxlQUFTO0FBREgsSzs7Ozs7d0NBSVk7QUFDbEIsV0FBS0MsR0FBTCxHQUFXSixLQUFLSyxFQUFMLEVBQVg7QUFDQSxXQUFLQyxPQUFMLENBQWFDLGFBQWIsQ0FBMkIsS0FBS0gsR0FBaEMsRUFBcUMsSUFBckM7QUFDRDs7OzJDQUVzQjtBQUNyQixXQUFLRSxPQUFMLENBQWFFLGVBQWIsQ0FBNkIsS0FBS0osR0FBbEM7QUFDRDs7O2lDQUVZRCxPLEVBQVM7QUFDcEIsV0FBS00sUUFBTCxDQUFjLEVBQUNOLGdCQUFELEVBQWQ7QUFDRDs7OzZCQUNRO0FBQ1AsVUFBSU8scUJBQVksS0FBS0EsS0FBakIsQ0FBSjtBQUNBQSxZQUFNUCxPQUFOLEdBQWdCLEtBQUtELEtBQUwsQ0FBV0MsT0FBM0I7QUFDQSxVQUFJUSxZQUFZRCxNQUFNQyxTQUF0QjtBQUNBLGFBQU9ELE1BQU0sV0FBTixDQUFQOztBQUVBLFVBQUksQ0FBQ0EsTUFBTUUsY0FBTixDQUFxQixVQUFyQixDQUFMLEVBQXVDO0FBQ3JDLFlBQUlGLE1BQU0sbUJBQU4sQ0FBSixFQUFnQztBQUM5QkEsZ0JBQU1HLFFBQU4sR0FBaUIsQ0FBQyxLQUFLWCxLQUFMLENBQVdDLE9BQVosSUFBdUIsQ0FBQyxPQUFELEVBQVUsUUFBVixFQUFvQlcsT0FBcEIsQ0FBNEJKLE1BQU1LLElBQWxDLElBQTBDLENBQWxGO0FBQ0Q7QUFDRjtBQUNELGFBQU9MLE1BQU0sbUJBQU4sQ0FBUDtBQUNBLGFBQU9BLE1BQU0sU0FBTixDQUFQO0FBQ0EsYUFBT0MsVUFBVUQsS0FBVixDQUFQO0FBQ0Q7Ozs7RUEzQ2tCWixNQUFNa0IsUzs7QUFBckJmLE0sQ0FDR2dCLFksR0FBZTtBQUNwQkMscUJBQW1CLElBREM7QUFFcEJQLGFBQVc7QUFBQSxXQUNUO0FBQUE7QUFBWUQsV0FBWjtBQUNHQSxZQUFNUztBQURULEtBRFM7QUFBQTtBQUZTLEM7QUFEbEJsQixNLENBU0dtQixZLEdBQWU7QUFDcEJiLGlCQUFlUixVQUFVc0IsSUFETDtBQUVwQmIsbUJBQWlCVCxVQUFVc0I7QUFGUCxDOzs7QUFxQ3hCLGVBQWVwQixNQUFmIiwiZmlsZSI6IkJ1dHRvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgdXVpZCBmcm9tICd1dWlkJztcblxuY2xhc3MgQnV0dG9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICBkaXNhYmxlZE9uSW52YWxpZDogdHJ1ZSxcbiAgICBjb21wb25lbnQ6IHByb3BzID0+IChcbiAgICAgIDxidXR0b24gey4uLnByb3BzfT5cbiAgICAgICAge3Byb3BzLmNoaWxkcmVufVxuICAgICAgPC9idXR0b24+XG4gICAgKSxcbiAgfTtcbiAgc3RhdGljIGNvbnRleHRUeXBlcyA9IHtcbiAgICBvbkJ1dHRvbk1vdW50OiBQcm9wVHlwZXMuZnVuYyxcbiAgICBvbkJ1dHRvblVubW91bnQ6IFByb3BUeXBlcy5mdW5jLFxuICB9XG4gIHN0YXRlID0ge1xuICAgIGlzVmFsaWQ6IHRydWVcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHRoaXMuX2lkID0gdXVpZC52NCgpO1xuICAgIHRoaXMuY29udGV4dC5vbkJ1dHRvbk1vdW50KHRoaXMuX2lkLCB0aGlzKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHRoaXMuY29udGV4dC5vbkJ1dHRvblVubW91bnQodGhpcy5faWQpO1xuICB9XG5cbiAgc2V0VmFsaWRhdGVkKGlzVmFsaWQpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtpc1ZhbGlkfSk7XG4gIH1cbiAgcmVuZGVyKCkge1xuICAgIGxldCBwcm9wcyA9IHsuLi50aGlzLnByb3BzfTtcbiAgICBwcm9wcy5pc1ZhbGlkID0gdGhpcy5zdGF0ZS5pc1ZhbGlkO1xuICAgIGxldCBjb21wb25lbnQgPSBwcm9wcy5jb21wb25lbnQ7XG4gICAgZGVsZXRlIHByb3BzWydjb21wb25lbnQnXTtcbiAgICBcbiAgICBpZiAoIXByb3BzLmhhc093blByb3BlcnR5KCdkaXNhYmxlZCcpKSB7XG4gICAgICBpZiAocHJvcHNbJ2Rpc2FibGVkT25JbnZhbGlkJ10pIHtcbiAgICAgICAgcHJvcHMuZGlzYWJsZWQgPSAhdGhpcy5zdGF0ZS5pc1ZhbGlkICYmIFsncmVzZXQnLCAnYnV0dG9uJ10uaW5kZXhPZihwcm9wcy50eXBlKSA8IDA7XG4gICAgICB9XG4gICAgfVxuICAgIGRlbGV0ZSBwcm9wc1snZGlzYWJsZWRPbkludmFsaWQnXTtcbiAgICBkZWxldGUgcHJvcHNbJ2lzVmFsaWQnXTtcbiAgICByZXR1cm4gY29tcG9uZW50KHByb3BzKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCdXR0b247XG4iXX0=