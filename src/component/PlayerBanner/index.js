import React from 'react';
import { connect } from "react-redux";
import { message } from 'antd';
import copy from 'copy-to-clipboard';


class PlayerBanner extends React.Component {

  state = {
    playerCount: 0,
    readyCount: 0,
  };

  loop = () => {
    const playerCount = this.props.users.length;
    let readyCount = 0;

    for(let i = 0; i < this.props.users.length; i += 1){
        if(this.props.users[i].ready){
            readyCount += 1;
        }
    }

    this.setState({ playerCount: playerCount, readyCount: readyCount })
  }

  componentDidMount = () => {
    this.timer = setInterval(this.loop, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  copyCode = () => {

    // If we have a port in the url.
    const port = (Number(window.location.port) !== 80) ? `:${window.location.port}` : ``;

    // Build the url link for users.
    const built = `${window.location.protocol}//${window.location.hostname}${port}?lobby=${this.props.lobbyCode}`;

    // Copy link to clipboard.
    copy(built);

    message.success('Link copied to your clipboard');
  }

  /**
   * # render
   */
  render(){

    let playerCountMarkup = (<div>Player Count: {this.state.playerCount}</div>)
    let readyCountMarkup  = (<div className="padding">Players Ready: {this.state.readyCount}</div>)
    let lobbyInviteMarkup = (<div className="invite" onClick={this.copyCode}>Click to copy room invite</div>)

    if(this.state.playerCount === 0){
        playerCountMarkup = null;
    }

    if(this.state.playerCount === 0 || this.props.phase !== "waiting"){
        readyCountMarkup = null;
    }

    // If we have a lobby code.


    return (
        <div className="c-player-banner">
            {playerCountMarkup}
            {readyCountMarkup}
            {lobbyInviteMarkup}
        </div>
    )
  };
}

const myStateToProps = (state) => {
    return {
        users: state.usersReducer.users
    };
};
  
export default connect(myStateToProps, { })(PlayerBanner);