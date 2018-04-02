import * as React from 'react';
import Base from './Base';

class Input extends React.Component {
  static defaultProps = {
    component: props => <input {...props}/>,
    initialValue: '',
    getValue: e => e.target.value,
    isEmpty: v => v === undefined || v === ''
  }
  handleKeyDown(e) {
    if (this.props.preventEnter && e.keyCode == 13) {
      e.preventDefault();
    }
    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
  }
  render() {
    let props = {...this.props};
    delete props['preventEnter'];
    return <Base {...props} onKeyDown={::this.handleKeyDown}/>;
  }
}

export default Input;
