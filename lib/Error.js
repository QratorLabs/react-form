var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import * as React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

var Error = function (_React$Component) {
  _inherits(Error, _React$Component);

  function Error() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Error);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Error.__proto__ || Object.getPrototypeOf(Error)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      show: false
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Error, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._id = uuid.v4();
      this.context.onErrorMount(this._id, this);
    }
  }, {
    key: 'onFormChanged',
    value: function onFormChanged(data) {
      var isValid = true;
      if (this.props.validator) {
        isValid = this.props.validator(data);
      }
      if (isValid) {
        if (this.props.hideOnChange) {
          this.hide();
        }
      } else {
        this.show();
      }
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.setState({ show: false });
    }
  }, {
    key: 'show',
    value: function show() {
      this.setState({ show: true });
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.show) {
        return React.createElement(
          'div',
          { className: 'form-error' },
          this.props.children
        );
      } else {
        return null;
      }
    }
  }]);

  return Error;
}(React.Component);

Error.propTypes = {
  onSubmit: PropTypes.func,
  onSubmitFailed: PropTypes.func,
  onChange: PropTypes.func,
  validator: PropTypes.func
};
Error.defaultProps = {
  hideOnChange: true
};
Error.contextTypes = {
  onErrorMount: PropTypes.func,
  onErrorUnmount: PropTypes.func
};


export default Error;