import * as React from 'react';
import Base from './Base';

class Radio extends React.Component {
  static defaultProps = {
    component: props => {
      let children = props.children;
      delete props['children'];
      return [
        <input type="radio" key="input" {...props}/>,
        children
      ];
    },
    initialValue: null,
    mapProps: {
      value: props => props.value,
      checked: props => props.hasOwnProperty('checked') ? props.checked : props.viewValue == props.value
    }
  }
  
  render() {
    let props = {...this.props};
    return <Base {...props}/>;
  }
}

export default Radio;