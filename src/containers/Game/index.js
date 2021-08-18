import React from 'react';

import { Card } from 'antd';

class Game extends React.Component {

  state = {

  };
  /**
   * # generateDrawing
   * (CSP-11): Generate the page for the user to draw on to make their art.
   * 
   * return {markup}
   */
  generateDrawing = () => {
    return (<div>todo</div>)
  };
  /**
   * # generateCaption
   * (CSP-10): Generate the page for the user to enter captions for the art.
   * 
   * return {markup}
   */
  generateCaption = () => {
    return (<div>todo</div>)     
  };
  /**
   * # generateVoting
   * (CSP-9): Generate the page for the users to vote on the art.
   * 
   * return {markup}
   */
  generateVoting = () => {
    return (<div>todo</div>)
  };
  /**
   * # generateWinner
   * (CSP-12): Generate the page for showing who won.
   * 
   * return {markup}
   */
  generateWinner = () => {
    return (<div>todo</div>)
  };
  /**
   * # render
   */
  render(){
    return (
      <div className="c-game">
        <div className="user-info">
            your username "todo", etc
        </div>
        <Card className="game-content">
            asdasd
        </Card>
      </div>
    );
  };
}

export default Game;