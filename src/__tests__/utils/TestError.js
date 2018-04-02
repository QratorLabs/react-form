import * as React from 'react';
import Form from '../../Form';
import Error from '../../Error';
import InputControl from '../../Control/Input';

class TestError extends React.Component {
  render() {
    return (
      <Form>
        <Error {...this.props}>
          Login is too short
        </Error>
        <InputControl name='login'/>
      </Form>
    );
  }
}

export default TestError;