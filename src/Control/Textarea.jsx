import * as React from 'react';
import Base from './Base';

class Textarea extends React.Component {
  static defaultProps = {
    component: props => <textarea {...props}></textarea>,
    isEmpty: v => v === undefined || v === '',
    initialValue: '',
    getValue: e => e.target.value,
  }
  render() {
    return <Base {...this.props}/>;
  }
}

export default Textarea;
