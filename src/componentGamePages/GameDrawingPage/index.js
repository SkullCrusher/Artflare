import React from 'react';
import { connect } from "react-redux";
import { Button, Slider } from 'antd';
import CanvasDraw from "react-canvas-draw";
import Loading          from '../../component/Loading';

import { addToSend } from '../../redux/actions/messages';

// I'm colorblind so we are just copied the choices from paint.net (I removed two to even out the lines).
const colors = [
    "#000000", "#404040", "#FF0000", "#FF6A00", "#FFD800", "#B6FF00", "#4CFF00", "#00FF21", "#00FF90", "#00FFFF", "#0094FF", "#0026FF", "#4800FF", "#B200FF", "#FF00DC", "#FF006E",
    "#FFFFFF", "#808080", "#7F0000", "#7F3300", "#7F6A00", /* "#5B7F00", "#267F00", */ "#007F0E", "#007F46", "#007F7F", "#004A7F", "#00137F", "#21007F", "#57007F", "#7F006E", "#7F0037",
]

const finishedDrawingText = "Good Job! We are waiting on the others now."


class GameDrawningPage extends React.Component {

  state = {

    done: false,

    pencilDrawingColor: colors[0],
    pencilBrushRadius: 2,
    submitting: false,

    // Drawable stuff.
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
  /**
   * # submit
   * Save the value so we can
   */
  submit = (force) => {

    this.setState({ submitting: true })

    // Get the data we want to save.
    let save = this.saveableCanvas.getSaveData()

    // Send the data out to save it.
    this.props.addToSend({ message: "@@art@@" + save })
    
    // Clear our current canvas so we can start again.
    this.saveableCanvas.clear()

    // Bump us to the next record.
    if(force){
        // this.props.drawSubmit()
    }

    this.setState({ submitting: false })
  }
  /**
   * # componentDidUpdate
   * Handle auto saving when the user runs out of time.
   */
  componentDidUpdate(prevProps, prevState){
      if(this.props.drawingCount !== prevProps.drawingCount){
        if(this.props.totalDrawings < this.props.drawingCount){

            if(!this.state.done){
                this.submit(false);
                this.setState({ done: true })

                setTimeout(()=>{
                    this.props.drawSubmit();    
                }, 250);
            }
        }else{
            this.submit(false);
        }
      }
  };
  /**
   * # render
   */
  render(){

    // Prevent rending if we are done.
    if(this.state.done){
        return <Loading text={finishedDrawingText} />
    }

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
                    Draw your art! Quickly you have <b>{this.props.secondsLeft}</b> left
                </div>
            </div>
            <div className="drawing-container">
            <div className="c-drawable-component">
                <CanvasDraw
                    ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                    brushColor={this.state.pencilDrawingColor}
                    brushRadius={this.state.pencilBrushRadius}
                    {...this.state}
                />
            </div>
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
                    <Button type="primary" size="large" loading={this.state.submitting} danger onClick={()=>{ this.props.drawSubmit() }}>
                        Submit
                    </Button>
                    </div>
                </div>
            </div>
        </div>
    )
  };
}

const myStateToProps = (state) => {
    return {};
};
  
export default connect(myStateToProps, { addToSend })(GameDrawningPage);