import * as React from 'react';
import Form from '../../Form';
import { CheckboxControl } from '../../Control';

class TestInput extends React.Component {
  render() {
    return (
      <Form>
        <CheckboxControl {...this.props}>
          <label>test checkbox</label>
        </CheckboxControl>
      </Form>
    );
  }
}

export default TestInput;
