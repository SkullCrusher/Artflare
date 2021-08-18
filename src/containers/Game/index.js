import React from 'react';

import { Button, Card, Slider } from 'antd';

import Drawable from '../../component/Drawable'
import GameDrawningPage from '../../component/GameDrawingPage';

// I'm colorblind so we are just copied the choices from paint.net (I removed two to even out the lines).
const colors = [
    "#000000", "#404040", "#FF0000", "#FF6A00", "#FFD800", "#B6FF00", "#4CFF00", "#00FF21", "#00FF90", "#00FFFF", "#0094FF", "#0026FF", "#4800FF", "#B200FF", "#FF00DC", "#FF006E",
    "#FFFFFF", "#808080", "#7F0000", "#7F3300", "#7F6A00", /* "#5B7F00", "#267F00", */ "#007F0E", "#007F46", "#007F7F", "#004A7F", "#00137F", "#21007F", "#57007F", "#7F006E", "#7F0037",
]

class Game extends React.Component {

  state = {
    pencilDrawingColor: colors[0],
    pencilBrushRadius: 2,
    submitting: false,
  };
  /**
   * # generateDrawing
   * (CSP-11): Generate the page for the user to draw on to make their art.
   * 
   * return {markup}
   */
  generateDrawing = () => {

    let colorMarkup = []

    // Generate the color pickers.
    for(let i = 0; i < colors.length; i += 1){
        colorMarkup.push(
            <div
                className={"item " + ((this.state.pencilDrawingColor === colors[i]) ? "active" : "")}
                style={{ background: colors[i] }}
                onClick={()=>{
                    this.setState({ pencilDrawingColor: colors[i] });
                }}
            />
        );
    }

    return (
        <div className="c-drawable">
            <div className="title">
                <div className="text">
                    Draw your art! Quickly you have <b>{"1:00"}</b> left
                </div>
            </div>
            <div className="drawing-container">
                <Drawable
                    brushColor={this.state.pencilDrawingColor}
                    brushRadius={this.state.pencilBrushRadius}
                />
            </div>
            <div className="c-settings">
                <div className="c-pencil-size">
                    <div className="text">
                        Pencil Size
                    </div>
                    <Slider
                        defaultValue={this.state.pencilBrushRadius}
                        tooltipVisible
                        min={1}
                        max={30}
                        onChange={(value)=>{ this.setState({ pencilBrushRadius: value }) }}
                    />
                </div>
                <div className="c-colors">
                    <div className="text">
                        Pencil Color
                    </div>
                    {colorMarkup}
                </div>
                <div className="c-submit">
                    <div className="text">
                        Finished Drawing?
                    </div>
                    <div className="submit">
                    <Button type="primary" size="large" loading={this.state.submitting} danger>
                        Submit
                    </Button>
                    </div>
                </div>
            </div>
        </div>
    )
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
    return <GameDrawningPage /> // this.generateDrawing();
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