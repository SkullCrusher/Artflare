import React from 'react';

import { Button, Input, Card, Divider, message } from 'antd';

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

  validateUsername = (arg) => {
    if(arg.length < 4 || arg.length > 20){
      message.error('Error: Username must be 4 to 20 characters.')
      return false;
    }

    return true;
  }

  validateLobbyCode = (arg) => {
    if(arg.length !== 10){
      message.error('Error: Invalid lobby code.')
      return false;
    }

    return true;
  }

  handleJoinButton = () => {

    // Force the lobby code to be upper case.
    let lobbyCodeFixed = this.state.lobbyCode.toUpperCase();

    if(!this.validateUsername(this.state.username)){
      return;
    }

    if(!this.validateLobbyCode(lobbyCodeFixed)){
      return;
    }

    // Where we are redirecting the user.
    let builtRedirect = `/game?username=${encodeURIComponent(this.state.username)}&lobby=${lobbyCodeFixed}`

    this.setState({
      redirect: builtRedirect
    });
  };

  handleCreateButton = () => {

  };
  /**
   * # render
   */
  render(){
    return (
      <div className="c-lobby">
        <Card>
          <div className="title">
            Ready To Start?
          </div>
          <Divider className="title-divider" />
          <div className="left item">
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
          <div className="right item">
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
            <div className="join-lobby">
              <Button
                className="button"
                type="primary"
                onClick={this.handleJoinButton}
              >Join Lobby</Button>
            </div>
            <Divider>OR</Divider>
            <div className="create-lobby">
              <Button
                className="button"
                type="primary"
                onClick={this.handleCreateButton}
              >Create Lobby</Button>
            </div>
          </div>
        </Card>
      </div>
      )
  };
}

export default Lobby;