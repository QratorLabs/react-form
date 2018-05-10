import * as React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

class Button extends React.Component {
  static defaultProps = {
    disabledOnInvalid: true,
    component: props => (
      <button {...props}>
        {props.children}
      </button>
    ),
  };
  static contextTypes = {
    onButtonMount: PropTypes.func,
    onButtonUnmount: PropTypes.func,
  }
  state = {
    isValid: true
  }

  componentDidMount() {
    this._id = uuid.v4();
    this.context.onButtonMount(this._id, this);
  }

  componentWillUnmount() {
    this.context.onButtonUnmount(this._id);
  }

  setValidated(isValid) {
    this.setState({isValid});
  }
  render() {
    let props = {...this.props};
    props.isValid = this.state.isValid;
    let component = props.component;
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
}

export default Button;
