import React from 'react';

import { Button, Input, Card, Divider, message } from 'antd';
import { Link, Redirect }    from "react-router-dom";

const random = (length = 8) => {
  // Declare all characters
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  // Pick characers randomly
  let str = '';
  for (let i = 0; i < length; i++) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return str;
};

class Lobby extends React.Component {

  state = {
    redirect:  "",
    username:  "",
    lobbyCode: "",
  };
  /**
   * # handleChange
   * Handle the user input.
   * 
   * @param {string} type - The name of the input.
   * 
   * @returns none
   */
  handleChange = (type) => {
    return (e) => {
      this.setState({
        [type]: e.target.value
      })
    }
  };
  /**
   * # validateUsername
   * 
   * @param {string} arg - The username the user wants to use.
   * 
   * @returns {bool}
   */
  validateUsername = (arg) => {
    if(arg.length < 4 || arg.length > 20){
      message.error('Error: Username must be 4 to 20 characters.')
      return false;
    }

    return true;
  };
  /**
   * # validateLobbyCode
   * 
   * @param {string} arg - The lobby code the user wants to use.
   * 
   * @returns {bool}
   */
  validateLobbyCode = (arg) => {
    if(arg.length < 10 || arg.length > 16){
      message.error('Error: Invalid lobby code.')
      return false;
    }

    return true;
  };
  /**
   * # handleJoinButton
   * Handle the user joining a match.
   * 
   * @returns none
   */
  handleJoinButton = () => {

    // Force the lobby code to be upper case.
    let lobbyCodeFixed = this.state.lobbyCode.toUpperCase();

    if(!this.validateUsername(this.state.username) || !this.validateLobbyCode(lobbyCodeFixed)){
      return;
    }

    // Where we are redirecting the user.
    let builtRedirect = `/game?username=${encodeURIComponent(this.state.username)}&lobby=${lobbyCodeFixed}`

    this.setState({ redirect: builtRedirect });
  };
  /**
   * # handleCreateButton
   * Handle the user creating a match.
   * 
   * @returns none
   */
  handleCreateButton = () => {
    // Create them a lobby randomly.
    let lobbyCodeFixed = random(16).toUpperCase();

    if(!this.validateUsername(this.state.username)){
      return;
    }

    // Where we are redirecting the user.
    let builtRedirect = `/game?username=${encodeURIComponent(this.state.username)}&lobby=${lobbyCodeFixed}`

    this.setState({ redirect: builtRedirect });
  };
  /**
   * # componentDidMount
   */
  componentDidMount(){
    // If they already have a lobby code, auto fill it.
    const code = window.location.search.replace("?lobby=", "");

    if(code !== ""){
      this.setState({ lobbyCode: code });
    }
  }

  /**
   * # render
   */
  render(){

    // So we can redirect the user to their lobby.
    let forceRedirect = null;
    
    if(this.state.redirect.length > 0){
      forceRedirect = <Redirect to={this.state.redirect} />;
    }

    return (
      <div className="c-lobby">
        {forceRedirect}
        <Card>
          <div className="title">
            Ready To Start?
          </div>
          <Divider className="title-divider" />
          <div className="left item">
            <div className="c-user-input">
              <div className="sub-title">
                Enter Username
              </div>
              <div>
                <Input
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.handleChange("username")}
                />
              </div>
            </div>
            <div className="c-user-input padding">
              <div className="sub-title">
                Enter Lobby Code
              </div>
              <div className="input">
                <Input
                  placeholder="A4FHUK345FD"
                  value={this.state.lobbyCode}
                  onChange={this.handleChange("lobbyCode")}
                />
              </div>
            </div>
          </div>
          <div className="right item">
            <div className="join-lobby">
              <Button
                className="button"
                type="primary"
                onClick={this.handleJoinButton}
                disabled={(this.state.lobbyCode.length < 1) ? true : false}
              >Join Lobby</Button>
            </div>
            <Divider>OR</Divider>
            <div className="create-lobby">
              <Button
                className="button"
                type="primary"
                onClick={this.handleCreateButton}
                disabled={(this.state.username.length < 1) ? true : false}
              >Create Lobby</Button>
            </div>
          </div>
          <div className="warning">
            By clicking using this site you agree to our <Link to="terms">terms and conditions</Link> and <Link to="privacy">privacy policy</Link>
          </div>
        </Card>
      </div>
      )
  };
}

export default Lobby;