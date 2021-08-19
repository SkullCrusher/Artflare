import React from 'react';
import { connect } from "react-redux";
import { Button, Input  } from 'antd';
import CanvasDraw from "react-canvas-draw";

import { addToSend } from '../../redux/actions/messages';

class GameDrawningPage extends React.Component {

  state = {
    done: false,
    submitting: false,

    value: "",
  };
  /**
   * # submit
   * Save the value so we can
   */
  submit = () => {

    this.setState({ submitting: true })

    // Send the data out to save it.
    this.props.addToSend({ message: this.state.value })
  
    setTimeout(()=>{
        this.setState({ value: "", submitting: false })
    }, 2500);
  }

  componentDidMount(){

  }

  /**
   * # render
   */
  render(){

    return (
        <div className="c-captions">
            <div className="title">
                <div className="text">
                    Write some captions! Quickly you have <b>{this.props.secondsLeft}</b> left
                </div>
            </div>
            <div className="content">
               
            </div>
            <div className="c-settings">

                <CanvasDraw
                    ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                    brushColor={this.state.pencilDrawingColor}
                    brushRadius={this.state.pencilBrushRadius}
                    {...this.state}
                />

                <div className="c-submit">
                    <div className="submit">
                    <Button type="primary" size="large" loading={this.state.submitting} danger onClick={this.submit}>
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