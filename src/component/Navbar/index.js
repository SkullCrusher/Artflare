import React       from 'react';
import { Link }    from "react-router-dom";

class Navbar extends React.Component {

  state = {};

  render(){
    return (
      <div className="c-navigation">
        <div className="logo">
          <Link to="/">
            ArtFlare
          </Link>
        </div>
        <div className="menu-items">
          <div className="item">
            <a href="https://discord.gg/8GWC5xJ53q">Join Discord</a>
          </div>
          <div className="item">
            <Link to="/privacy">Privacy</Link>
          </div>
          <div className="item">
            <Link to="/terms">Terms and Conditions</Link>
          </div>
        </div>
      </div>
    )
  };
}

export default Navbar;