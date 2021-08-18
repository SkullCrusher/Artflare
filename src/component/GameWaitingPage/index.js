import React from 'react';

import { Button } from 'antd';

class GameWaitingPage extends React.Component {

  state = {
    currentState: "not-ready"
  };

  handleClick = () => {
    
    // Send the message out to the others that we are ready.


    this.setState({
        currentState: "ready"
    })
  }

  /**
   * # render
   */
  render(){
    return (
        <div className="c-waiting-page">
            <div className="title">
                <div className="text">
                    Game is waiting for everyone to ready up. Click Ready when you are :)
                </div>
                <div className="sub-text">
                    If the others are mid game you will need to wait for them to finish
                </div>
            </div>
            <div className="button">
                <Button
                    type="primary"
                    size="large"
                    onClick={this.handleClick}
                    disabled={(this.state.currentState === "ready")}
                >
                    {(this.state.currentState === "not-ready") ? "Ready" : "Waiting"}
                </Button>
            </div>
        </div>
    )
  };
}

export default GameWaitingPage;