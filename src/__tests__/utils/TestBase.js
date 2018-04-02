import * as React from 'react';
import PropTypes from 'prop-types';
import Form from '../../Form';
import { BaseControl } from '../../Control';

class TestComponent extends React.Component {
  change(value) {
    this.props.onChange({target: {value}});
  }
  focus() {
    this.props.onFocus();
  }
  blur() {
    this.props.onBlur();
  }
  render() {
    return null;
  }
}

export { TestComponent };

class TestBaseControl extends React.Component {
  static childContextTypes = {
    onControlChangeID: PropTypes.func,
  }
  getChildContext() {
    return {
      onControlChangeID: ::this.handleControlChangeID
    };
  }
  handleControlChangeID(...args) {
    if (this.props.onControlChangeIDContext) {
      this.props.onControlChangeIDContext(...args);
    }
  }
  render() {
    return (
      <Form>
        <BaseControl 
            {...this.props}
            component={props => <TestComponent {...props.controlProps}/>}/>
      </Form>
    );
  }
}

export default TestBaseControl;