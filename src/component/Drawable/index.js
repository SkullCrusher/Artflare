// https://www.npmjs.com/package/react-canvas-draw
import React      from 'react';
import CanvasDraw from "react-canvas-draw";

class Drawable extends React.Component {

  state = {
    loadTimeOffset: 5,
    lazyRadius: 0,
    brushRadius: 6,
    brushColor: "#000",
    catenaryColor: "#0a0302",
    gridColor: "rgba(150,150,150,0.17)",
    hideGrid: false,
    canvasWidth: 400,
    canvasHeight: 400,
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
    return (
      <div>
        <CanvasDraw
          ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
          {...this.state}
        />
        <div onClick={this.debug}>
          debug
        </div>
      </div>
    )
  };
}

export default Drawable;