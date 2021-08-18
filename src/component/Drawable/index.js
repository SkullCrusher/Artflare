// https://www.npmjs.com/package/react-canvas-draw
import React      from 'react';
import CanvasDraw from "react-canvas-draw";

let tmp = "";

class Drawable extends React.Component {

  state = {
    loadTimeOffset: 5,
    lazyRadius: 0,
    // brushRadius: 6,
   // brushColor: "#000",
    catenaryColor: "#f4f8fe", // "#0a0302",
    gridColor: "rgba(150,150,150,0.17)",
    hideGrid: false,
    canvasWidth: 375,
    canvasHeight: 375,
    disabled: false,
    imgSrc: "",
    saveData: null,
    immediateLoading: false,
    hideInterface: false
  };

  debug = () => {
    console.log(this.saveableCanvas.getSaveData())
  }

  render(){

    /*
      <div onClick={this.debug}></div>
    */

    return (
      <div className="c-drawable-component">
        <CanvasDraw
          ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
          brushColor={this.props.brushColor}
          brushRadius={this.props.brushRadius}
          {...this.state}
        />
      </div>
    )
  };
}

export default Drawable;