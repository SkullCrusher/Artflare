import React       from 'react';
import { Link }    from "react-router-dom";

class Legal extends React.Component {

  state = {};

  render(){
    return (<div>legal {this.props.type}</div>)
  };
}

export default Legal;