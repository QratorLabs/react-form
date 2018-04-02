import * as React from 'react';
import Form from '../../Form';
import { TextareaControl } from '../../Control';

class TestTextarea extends React.Component {
  render() {
    return (
      <Form>
        <TextareaControl {...this.props}/>
      </Form>
    );
  }
}

export default TestTextarea;
