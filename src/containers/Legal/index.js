import React       from 'react';
import { Link }    from "react-router-dom";

const legalStuff = {
  "terms": {
    title: "Terms of Service",
    rows: [
      "This is just for fun and hopefully some swag so here is just some simple points.",
      "You grant me the right to send and save whatever you enter on the site.",
      "You understand that you are using this software at your own risk. Any bugs, exploits, or etc that may happen are your own responsiblity.",
      "Do not transfer illegal material using this website.",
      "By using this site you understand and accept that people may transfer material that you find offensive. I do not want anyone to be offended by I do not control any of the material sent to you.",
      "Do not abuse the system or attempt to disrupt others playing the system.",
    ]
  },
  "privacy": {
    title: "Privacy Policy",
    rows: [
      "This is just for fun and hopefully some swag so here is just some simple points.",
      "All of your drawings, captions, and usernames are shared with anyone connected and are stored. If you draw something really good I might even post it in my Discord server.",
      "The site is hosted on Cloudflare workers and pages so please review the privacy policy for more details on what they store.",
      "We are using Cloudflare web analytics please view their privacy policy for more details on what they store.",
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