import React from 'react';

class Button extends React.Component {
  render() {
    return (
      <div className='language-item'>
        <div className='language-name'>{this.props.number}</div>
      </div>
    );
  }
}

export default Button