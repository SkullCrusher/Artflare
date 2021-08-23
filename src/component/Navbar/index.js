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
            <a href="https://github.com/SkullCrusher/Artflare">Github</a>
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