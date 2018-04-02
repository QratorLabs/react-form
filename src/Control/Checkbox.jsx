import * as React from 'react';
import Base from './Base';

class Checkbox extends React.Component {
  static defaultProps = {
    component: props => {
      let children = props.children;
      delete props['children'];
      return [
        <input
            {...props}
            key='input'
            type='checkbox'/>,
        children
      ];
    },
    getValue: e => e.target.checked,
    initialValue: false
  }
  render() {
    return <Base {...this.props}/>;
  }
}

export default Checkbox;
