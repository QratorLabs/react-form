import * as React from 'react';
import Form from '../../Form';
import { InputControl } from '../../Control';


class TestForm extends React.Component {
  static defaultProps = {
    visible: ['email', 'password',],
    validators: {}
  }
  _refs = {}
  getComponents() {
    let { validators } = this.props;
    return [
      <InputControl
          name='email'
          key='email'
          ref={el => this._refs.email = el}
          validators={validators.email || []}/>,
      <InputControl
          name='password'
          key='password'
          ref={el => this._refs.password = el}
          validators={validators.password || []}/>
    ];
  };
  render() {
    return (
      <Form {...this.props}>
        {this.getComponents().filter(c => this.props.visible.indexOf(c.key) > -1)}
        <button type='submit'>Submit</button>
      </Form>
    );
  }
}

export default TestForm;