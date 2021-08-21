import React    from 'react';
import { Link } from "react-router-dom";

class WhyAds extends React.Component {

  state = {};

  render(){
    return (
      <div className="c-why">
        <div className="title">
          Why are there ads on the site?
        </div>
        <div className="content">
          <iframe
            id="funny"
            title="funny"
            src="https://giphy.com/embed/Tfpbc1BGJqLNvjXg4P"
            width="480"
            height="270"
            frameBorder="0"
            class="giphy-embed"
            allowFullScreen
          />
        </div>
        <div className="extended">
          <p>
            Hosting this site is cheap but still costs money.
          </p>
          <p>
            I suggest you turn on adblock for this site. I use adblock for every site so it wont hurt my feelings.
          </p>
        </div>

        <div className="go-back">
          <Link to="/">Go back to homepage</Link>
        </div>
      </div>
    );
  };
}

export default WhyAds;