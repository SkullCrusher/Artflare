import React       from 'react';

import AboutUs from "../../component/AboutUs";
import Lobby   from "../../component/Lobby";

class Homepage extends React.Component {

  state = {};

  render(){
    return (
      <div className="c-homepage">
        <div className="title">
          <div className="text">
            Connect To Game
          </div>
        </div>
        <Lobby />
        <AboutUs />
      </div>
      )
  };
}

export default Homepage;