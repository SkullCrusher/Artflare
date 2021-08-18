import React from 'react';

import { Button } from 'antd';

class GameErrorPage extends React.Component {

  state = {};
  
  /**
   * # render
   */
  render(){

    return (
        <div className="c-waiting-page">
            <div className="title">
                <div className="text">
                    You lost connection to the game or have an invalid room code.
                </div>
            </div>
            <div className="button">
                <Button
                    type="primary"
                    size="large"
                    onClick={()=>{ window.location.reload() }}
                >
                    Reload the page
                </Button>
            </div>
        </div>
    )
  };
}

export default GameErrorPage;