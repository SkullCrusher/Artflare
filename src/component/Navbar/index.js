import React       from 'react';
import { Link }    from "react-router-dom";

class Navbar extends React.Component {

  state = {};

  render(){
    return (
      <div className="c-navigation">
        <Link to="/">homepage</Link>
        <Link to="/privacy">privacy</Link>
        <Link to="/terms">terms</Link>
      </div>
    )
  };
}

export default Navbar;