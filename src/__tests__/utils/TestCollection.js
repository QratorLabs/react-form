import * as React from 'react';
import Form from '../../Form';
import Collection from '../../Collection';
import { InputControl } from '../../Control';

class TestCollection extends React.Component {
  render() {
    return (
      <Form>
        <Collection 
            name='items'
            initialValue={['qwerty']}
            component={
              props => <InputControl validators={[{name: 'len', msg: 'Too shrot', f: val => val.length > 5}]}/>
            }
            {...this.props}/>
      </Form>
    );
  }
}

export default TestCollection;
