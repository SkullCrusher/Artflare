import React       from 'react';
import { Link }    from "react-router-dom";

const legalStuff = {
  "terms": {
    title: "Terms of Service",
    rows: [
      "terms wip 1",
      "terms wip 2",
    ]
  },
  "privacy": {
    title: "Privacy Policy",
    rows: [
      "privacy wip 1",
      "privacy wip 2",
    ]
  }
}

class Legal extends React.Component {

  state = {};

  render(){
    
    // Grab the legal text we want to render.
    const selectedTitle = legalStuff[this.props.type].title;
    const selectedRows  = legalStuff[this.props.type].rows;

    // The rows we want to render (helps break it up to be easier to read).
    let rows = [];

    // Loop over the content and split it into chunks.
    for(let i = 0; i < selectedRows.length; i += 1){
      rows.push((<p key={i}>{selectedRows[i]}</p>));
    }

    return (
      <div className="c-legal">
        <div className="title">{selectedTitle}</div>   
        <div className="content">
          {rows}
        </div>
        <div className="go-back">
          <Link to="/">Go back to homepage</Link>
        </div>
      </div>
    );
  };
}

export default Legal;