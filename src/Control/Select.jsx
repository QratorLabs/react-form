import * as React from 'react';
import Base from './Base';

class Select extends React.Component {
  static defaultProps = {
    component: props => (
      <select {...props}>
        {props.children}
      </select>
    ),
  }
  render() {
    let initialValue = undefined,
        isEmpty = v => v === undefined;
    if (this.props.multiple) {
      initialValue = [];
      isEmpty = v => !v || v.length == 0;
    }
    let props = {...this.props, initialValue, isEmpty};
    return <Base {...props}/>;
  }
}

export default Select;
