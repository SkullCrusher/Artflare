import React from 'react';

import { Card } from 'antd';

import GameDrawningPage from '../../component/GameDrawingPage';


class Game extends React.Component {

  state = {
    phase: "drawing",
  };
  /**
   * # generateDrawing
   * (CSP-11): Generate the page for the user to draw on to make their art.
   * 
   * return {markup}
   */
  generateDrawing = () => {
    return <GameDrawningPage />
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

  pageSelector = () => {
    switch(this.state.phase){
        case "drawing": return this.generateDrawing();
    }
    
    return null;
  }

  /**
   * # render
   */
  render(){

    const content = this.pageSelector();

    return (
      <div className="c-game">
        <div className="user-info">
            your username "todo", etc
        </div>
        <Card className="game-content">
            <div className="banner">
                Drawing Phase (1 of 3)
            </div>
            {content}
        </Card>
      </div>
    );
  };
}

export default Game;