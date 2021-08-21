import React       from 'react';
// import { Link }    from "react-router-dom";

import Lobby from "../../component/Lobby";

class Homepage extends React.Component {

  state = {};

  render(){
    return (
      <div className="c-homepage">
        HOME PAGE
        <Lobby />
      </div>
      )
  };
}

export default Homepage;