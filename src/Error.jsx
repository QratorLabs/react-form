import * as React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

class Error extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    onSubmitFailed: PropTypes.func,
    onChange: PropTypes.func,
    validator: PropTypes.func,
  }
  static defaultProps = {
    hideOnChange: true,
  }

  static contextTypes = {
    onErrorMount: PropTypes.func,
    onErrorUnmount: PropTypes.func,
  }

  state = {
    show: false
  }

  componentDidMount() {
    this._id = uuid.v4();
    this.context.onErrorMount(this._id, this);
  }

  onFormChanged(data) {
    let isValid = true;
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

  hide() {
    this.setState({show: false});
  }

  show() {
    this.setState({show: true});
  }

  render() {
    if (this.state.show) {
      return (
        <div className='form-error'>
          {this.props.children}
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Error;
