import React from 'react';
import { connect } from "react-redux";
import { Button, Checkbox } from 'antd';
import CanvasDraw from "react-canvas-draw";

import { addToSend } from '../../redux/actions/messages';

const artPlaceholder = {
    art: `{"lines":[],"width":375,"height":375}`,
    hash: `388be4d521089432af89f135382f4c29e83442f6`,
    username: "developer"
}

const captionPlaceholder = {
    caption: "No Caption",
    username: "developer",
    hash: "81cc74b48d8baa856103ae262c67afcd9bc55694"
}

function sortListByUsername(arg){
    arg.sort(function (a, b) {
        return ('' + a.username).localeCompare(b.username);
    })

    return arg;
}

function sortListByHash(arg){
    arg.sort(function (a, b) {
        return ('' + a.hash).localeCompare(b.hash);
    })

    return arg;
}

// Give out the resources to the users in a guaranteed order.
function dishOutTheGoods(arg, count, userList, placeholder){

    let results = {}

    // Give every user a record.
    for(let i = 0; i < userList.length; i += 1){
        results[userList[i].username] = []
    }

    // Loop over all of the records we want to give out and give one to each user.
    let index = 0;
    for(let i = 0; i < arg.length; i += 1){
        results[userList[index].username].push(arg[i]);

        // Bump us to the next one.
        index += 1;
        if(index >= userList.length){
            index = 0;
        }
    }
 
    // Pad out any users that do not have enough.
    for(let i = 0; i < userList.length; i += 1){
        let current = userList[i].username;

        while(results[current].length < count){
            results[current].push(placeholder);
        }
    }

    return results;
}

class GameDrawningPage extends React.Component {

    state = {
    selectedArt: 0,
    selectedCaption: -1,

    artList: [],
    captionList: [],

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
    * # submit
    * Save the value so we can
    */
    submit = () => {

    // Prevent submission if we don't have a art and caption selected.
    if(this.state.selectedArt === 0 || this.state.selectedCaption === - 1){
        return;
    }

    this.setState({ submitting: true })

    let payload = "@@combo@@" + JSON.stringify({ 
        maker: this.props.username,
        art: this.state.artList[this.state.selectedArt - 1],
        caption: this.state.captionList[this.state.selectedCaption]
    })

    // Send the data out to save it.
    this.props.addToSend({ message: payload })
  
    this.props.done();
    }
    /**
     * # handleDistribution
     * Sort the material and handle giving it to users.
     */
    handleDistribution = () => {

        // We have to sort it so everyone is on the same page.
        const sortedArt           = sortListByHash(this.props.art)
        const sortedCaptions      = sortListByHash(this.props.captions)
        const sortedPlayers       = sortListByUsername(this.props.users)

        const distributedArt      = dishOutTheGoods(sortedArt,      3, sortedPlayers, artPlaceholder)
        const distributedCaptions = dishOutTheGoods(sortedCaptions, 5, sortedPlayers, captionPlaceholder)

        // Update our state.
        this.setState({
            artList:     distributedArt[this.props.username],
            captionList: distributedCaptions[this.props.username],
        })

        // Once we find what we want, tell it to render the images.
        setTimeout(()=>{

            // Just block it if canvas didn't load because it will crash (shouldn't happen).
            if(this.saveableCanvas1 === null){ return }

            // Set up the canvas for us.
            this.saveableCanvas1.loadSaveData(this.state.artList[0].art, true)
            this.saveableCanvas2.loadSaveData(this.state.artList[1].art, true)
            this.saveableCanvas3.loadSaveData(this.state.artList[2].art, true)
        }, 250);
    }

    componentDidMount(){
        this.handleDistribution();
    }

  /**
   * # render
   */
  render(){

    let captionList = []

    for(let i = 0; i < this.state.captionList.length && i < 5; i += 1){
        captionList.push((
            <div className="item">
                <Checkbox
                    onChange={()=>{ this.setState({ selectedCaption: i })}}
                    checked={(i === this.state.selectedCaption)}
                >
                    {this.state.captionList[i].caption}
                </Checkbox>
            </div>
        ))
    }

    return (
        <div className="c-choices">
            <div className="title">
                <div className="text">
                    Combine a piece of art and a caption! Quickly you have <b>{this.props.secondsLeft}</b> left
                </div>
            </div>
            <div className="content">
                <div
                    className={"item" + ((this.state.selectedArt === 1) ? " selected" : "")}
                    onClick={()=>{ this.setState({ selectedArt: 1 }) }}
                >
                    <CanvasDraw
                        onClick={()=>{}}
                        ref={canvasDraw => (this.saveableCanvas1 = canvasDraw)}
                        {...this.state}
                    />
                </div>
                <div
                    className={"item" + ((this.state.selectedArt === 2) ? " selected" : "")}
                    onClick={()=>{ this.setState({ selectedArt: 2 }) }}
                >
                    <CanvasDraw
                        ref={canvasDraw => (this.saveableCanvas2 = canvasDraw)}
                        {...this.state}
                    />
                </div>
                <div
                    className={"item" + ((this.state.selectedArt === 3) ? " selected" : "")}
                    onClick={()=>{ this.setState({ selectedArt: 3 }) }}
                >
                    <CanvasDraw
                        ref={canvasDraw => (this.saveableCanvas3 = canvasDraw)}
                        {...this.state}
                    />
                </div>
            </div>
            <div className="content-captions">
                <div className="title">
                    Select a caption for the art
                </div>
                {captionList}
            </div>
            <div className="c-settings">
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
    return {
        art: state.userMadeReducer.art,
        captions: state.userMadeReducer.captions,
        users: state.usersReducer.users,
    };
};
  
export default connect(myStateToProps, { addToSend })(GameDrawningPage);