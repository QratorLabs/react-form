import * as React from 'react';
import Form from '../../Form';
import { InputControl } from '../../Control';

class TestInput extends React.Component {
  render() {
    return (
      <Form>
        <InputControl {...this.props}/>
      </Form>
    );
  }
}

export default TestInput;