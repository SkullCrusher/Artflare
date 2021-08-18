import React       from 'react';

class Loading extends React.Component {

  state = {};

  render(){
    return (
        <div className="c-loading">
            <div class="lds-dual-ring"></div>
            <div>{this.props.text}</div>
        </div>)
    };
}

export default Loading;