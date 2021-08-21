import React       from 'react';
import { connect } from "react-redux";
import { Button }  from 'antd';
import CanvasDraw  from "react-canvas-draw";

import { setUsernameStatus } from '../../redux/actions/users';
import { addToSend } from '../../redux/actions/messages';


class GameVotingPage extends React.Component {

  state = {
    selectedIndex: 0,

    // Drawable stuff.
    loadTimeOffset: 5,
    lazyRadius: 0,
    // brushRadius: 6,
    // brushColor: "#000",
    catenaryColor: "#f4f8fe", // "#0a0302",
    gridColor: "rgba(150,150,150,0.17)",
    hideGrid: true, // false,
    canvasWidth: 250, // 375,
    canvasHeight: 250, // 375,
    disabled: true,
    imgSrc: "",
    saveData: null,
    immediateLoading: false,
    hideInterface: false
  };
  /**
   * # handleClick
   */
  handleSubmit = () => {

    console.log("this")

    // maker

    let payload = this.props.combos[this.state.selectedIndex]
    
    payload["voter"] = this.props.username

    /*{
      voter:   this.props.username,
      art:     this.props.combos[this.state.selectedIndex].art,
      caption: this.props.combos[this.state.selectedIndex].caption
    }*/

    // Send our vote.
    this.props.addToSend({ message: "@@addVote@@" + JSON.stringify(payload) })

    // We are done with voting.
    this.props.done();
  }
  /**
   * # handleMove
   * Handle swapping.
   * 
   * @param {int} amount 
   * 
   * @return markup
   */
  handleMove = (amount) => {

    let newAdjusted = this.state.selectedIndex + amount;

    if(newAdjusted < 0){
      newAdjusted = 0;
    }

    if(newAdjusted >= this.props.combos.length){
      newAdjusted = 0;
    }

    this.setState({ selectedIndex: newAdjusted });

    // Update our canvas (if the index exists).
    if(this.props.combos[newAdjusted] !== undefined){
      this.currentCanvas.loadSaveData(this.props.combos[newAdjusted].art.art, true)
    }
  };
  /**
   * # componentDidMount
   * Load the default combination.
   */  
  componentDidMount(){
    setTimeout(()=>{
      this.handleMove(0);
    }, 250);
  }
  /**
   * # render
   */
  render(){
    return (
        <div className="c-voting-page">
            <div className="title">
                <div className="text">
                  Pick your favorite! You are currently looking at <b>{this.state.selectedIndex + 1} of {this.props.combos.length}</b>. Quickly you have <b>{this.props.secondsLeft}</b> left
                </div>
            </div>
            <div className="content">
              <div className="combo">
                <div className="art">
                  <CanvasDraw
                    onClick={()=>{}}
                    ref={canvasDraw => (this.currentCanvas = canvasDraw)}
                    {...this.state}
                  />
                </div>
                <div className="caption">
                  {this.props.combos[this.state.selectedIndex].caption.caption}
                </div>
              </div>
            </div>
            <div className="button">
              <div className="back">
                <Button type="primary" size="large" onClick={()=>{ this.handleMove(-1) }}>Back</Button>
              </div>
              <div>
                <Button type="primary" size="large" onClick={this.handleSubmit} danger> Submit</Button>
              </div>
              <div className="next">
                <Button type="primary" size="large" onClick={()=>{ this.handleMove(1) }}>Next</Button>
              </div>
            </div>
        </div>
    )
  };
}

const myStateToProps = (state) => {
    return {
      combos: state.userMadeReducer.combos,
    };
};
  
export default connect(myStateToProps, { setUsernameStatus, addToSend })(GameVotingPage);