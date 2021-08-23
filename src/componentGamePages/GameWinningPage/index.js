import React       from 'react';
import { connect } from "react-redux";
import CanvasDraw  from "react-canvas-draw";
import Confetti    from 'react-confetti'

import { setUsernameStatus } from '../../redux/actions/users';
import { addToSend } from '../../redux/actions/messages';


class GameWinningPage extends React.Component {

  state = {

    winner: "",

    art: "",
    caption: "",

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
   * # componentDidMount
   * Load the default combination.
   */  
  componentDidMount(){
    setTimeout(()=>{

      try {

        let compiledMap = {}

        // Sum up the votes.
        for(let i = 0; i < this.props.votes.length; i += 1){
            let current = this.props.votes[i];

            // compiledMap
            if(compiledMap[current.username] === undefined){
                compiledMap[current.username] = 1;
            }else{
                compiledMap[current.username] += 1;
            }
        }

        // Find the highest one.
        let keys    = Object.keys(compiledMap);
        let highest = "";
        let count   = 0;

        for(let i = 0; i < keys.length; i += 1){
            if(compiledMap[keys[i]] > count){
                highest = keys[i];
                count = compiledMap[keys[i]];
            }
        }

        let found = null;

        // The winner.
        for(let i = 0; i < this.props.combos.length; i += 1){
            if(this.props.combos[i].username === highest){
                found = this.props.combos[i]
                break
            }
        }

        // Block if we were not able to find it.
        if(found === null){
            return;
        }

        // Set the variables in place.
        this.setState({
            winner:  found.username,
            art:     found.art,
            caption: found.caption,
        });

        // Render the art.
        this.currentCanvas.loadSaveData(found.art.art, true)
      }catch(e){
        console.log("e", e)
      }
    }, 250);
  }
  /**
   * # render
   */
  render(){
    return (
        <div className="c-winner">
            <div className="title">
                <div className="text">
                  The winner is "{this.state.winner}"
                </div>
                <div className="sub-text">
                    The game will automatically start a new round please wait.
                </div>
            </div>
            <div className="details">
                <div className="text">
                    Art was made by "{this.state.art.username}".
                </div>
                <div className="text">
                    Caption was made by "{this.state.caption.username}".
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
                  {this.state.caption.caption}
                </div>
              </div>
            </div>
          <div>
          <Confetti
            width={960}
            height={750}
          />
          </div>
        </div>
    )
  };
}

const myStateToProps = (state) => {
    return {
        combos: state.userMadeReducer.combos,
        votes:  state.userMadeReducer.votes,
    };
};
  
export default connect(myStateToProps, { setUsernameStatus, addToSend })(GameWinningPage);