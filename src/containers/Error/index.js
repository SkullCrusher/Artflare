import React       from 'react';
import { Link }    from "react-router-dom";

export default class Error extends React.Component {

  state = {};

  render(){
    return (
        <div className="c-error-page">
            <div className="title">
                404 - Page Not Found
            </div>
            <div className="sarcastic-text">
                I sent my imaginary friend to find what you are looking for but he never came back
            </div>
            <div className="self-help-video">
                <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/t3otBjVZzT0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
            <div className="go-back">
                <Link to="/">Go back to homepage</Link>
            </div>
        </div>
    )
  };
}