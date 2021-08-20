import React from 'react';
import { connect } from "react-redux";
import { Button, Checkbox } from 'antd';
import CanvasDraw from "react-canvas-draw";

import { addToSend } from '../../redux/actions/messages';

class GameDrawningPage extends React.Component {

  state = {
    selectedArt: 0,
    selectedCaption: -1,

    artList: [
        {
            art: `{"lines":[],"width":375,"height":375}`,
            hash: `088be4d521089432af89f135382f4c29e83442f6`,
            username: "asddasads"
        },
        {
            art:  `{"lines":[{"points":[{"x":186,"y":167},{"x":186,"y":167},{"x":185,"y":166},{"x":182,"y":163},{"x":177,"y":158},{"x":171,"y":151},{"x":165,"y":145},{"x":160,"y":138},{"x":156,"y":131},{"x":154,"y":126},{"x":153,"y":120},{"x":153,"y":115},{"x":153,"y":109},{"x":153,"y":103},{"x":154,"y":98},{"x":157,"y":92},{"x":160,"y":86},{"x":165,"y":81},{"x":171,"y":76},{"x":177,"y":72},{"x":184,"y":69},{"x":189,"y":66},{"x":196,"y":64},{"x":200,"y":62},{"x":206,"y":60},{"x":211,"y":59},{"x":214,"y":58},{"x":217,"y":58},{"x":219,"y":58},{"x":220,"y":58},{"x":221,"y":58},{"x":222,"y":58},{"x":223,"y":58},{"x":225,"y":58},{"x":227,"y":59},{"x":232,"y":61},{"x":233,"y":62},{"x":235,"y":63},{"x":237,"y":66},{"x":240,"y":68},{"x":243,"y":71},{"x":245,"y":74},{"x":246,"y":77},{"x":248,"y":81},{"x":249,"y":86},{"x":250,"y":90},{"x":251,"y":96},{"x":251,"y":103},{"x":251,"y":108},{"x":250,"y":115},{"x":249,"y":120},{"x":248,"y":127},{"x":246,"y":133},{"x":244,"y":141},{"x":242,"y":148},{"x":239,"y":155},{"x":237,"y":161},{"x":235,"y":167},{"x":233,"y":172},{"x":231,"y":176},{"x":228,"y":181},{"x":226,"y":185},{"x":223,"y":189},{"x":221,"y":194},{"x":218,"y":199},{"x":214,"y":203},{"x":211,"y":207},{"x":207,"y":212},{"x":204,"y":217},{"x":200,"y":221},{"x":195,"y":227},{"x":190,"y":232},{"x":185,"y":238},{"x":180,"y":243},{"x":176,"y":248},{"x":173,"y":252},{"x":169,"y":255},{"x":167,"y":258},{"x":165,"y":261},{"x":163,"y":264},{"x":161,"y":267},{"x":159,"y":270},{"x":157,"y":274},{"x":156,"y":276},{"x":154,"y":279},{"x":153,"y":281},{"x":152,"y":284},{"x":151,"y":285},{"x":151,"y":286},{"x":151,"y":287},{"x":151,"y":287}],"brushColor":"#000000","brushRadius":2}],"width":375,"height":375}`,
            hash: `088be4d521089432af89f135382f4c29e83442f6`,
            username: "asddasads"
        },
        {
            art:  `{"lines":[{"points":[{"x":186,"y":167},{"x":186,"y":167},{"x":185,"y":166},{"x":182,"y":163},{"x":177,"y":158},{"x":171,"y":151},{"x":165,"y":145},{"x":160,"y":138},{"x":156,"y":131},{"x":154,"y":126},{"x":153,"y":120},{"x":153,"y":115},{"x":153,"y":109},{"x":153,"y":103},{"x":154,"y":98},{"x":157,"y":92},{"x":160,"y":86},{"x":165,"y":81},{"x":171,"y":76},{"x":177,"y":72},{"x":184,"y":69},{"x":189,"y":66},{"x":196,"y":64},{"x":200,"y":62},{"x":206,"y":60},{"x":211,"y":59},{"x":214,"y":58},{"x":217,"y":58},{"x":219,"y":58},{"x":220,"y":58},{"x":221,"y":58},{"x":222,"y":58},{"x":223,"y":58},{"x":225,"y":58},{"x":227,"y":59},{"x":232,"y":61},{"x":233,"y":62},{"x":235,"y":63},{"x":237,"y":66},{"x":240,"y":68},{"x":243,"y":71},{"x":245,"y":74},{"x":246,"y":77},{"x":248,"y":81},{"x":249,"y":86},{"x":250,"y":90},{"x":251,"y":96},{"x":251,"y":103},{"x":251,"y":108},{"x":250,"y":115},{"x":249,"y":120},{"x":248,"y":127},{"x":246,"y":133},{"x":244,"y":141},{"x":242,"y":148},{"x":239,"y":155},{"x":237,"y":161},{"x":235,"y":167},{"x":233,"y":172},{"x":231,"y":176},{"x":228,"y":181},{"x":226,"y":185},{"x":223,"y":189},{"x":221,"y":194},{"x":218,"y":199},{"x":214,"y":203},{"x":211,"y":207},{"x":207,"y":212},{"x":204,"y":217},{"x":200,"y":221},{"x":195,"y":227},{"x":190,"y":232},{"x":185,"y":238},{"x":180,"y":243},{"x":176,"y":248},{"x":173,"y":252},{"x":169,"y":255},{"x":167,"y":258},{"x":165,"y":261},{"x":163,"y":264},{"x":161,"y":267},{"x":159,"y":270},{"x":157,"y":274},{"x":156,"y":276},{"x":154,"y":279},{"x":153,"y":281},{"x":152,"y":284},{"x":151,"y":285},{"x":151,"y":286},{"x":151,"y":287},{"x":151,"y":287}],"brushColor":"#000000","brushRadius":2}],"width":375,"height":375}`,
            hash: `088be4d521089432af89f135382f4c29e83442f6`,
            username: "asddasads"
        }
    ],
    captionList: [
        {
            caption: "caption1",
            username: "asddasads",
            hash: "81cc74b48d8baa856103ae262c67afcd9bc55694"
        },
        {
            caption: "12344asdsdaasddaadsadsasdasdaaddadasasdasdadsaads",
            username: "asddasads",
            hash: "81cc74b48d8baa856103ae262c67afcd9bc55694"
        },
        {
            caption: "caption1caption1caption1caption1caption1",
            username: "asddasads",
            hash: "81cc74b48d8baa856103ae262c67afcd9bc55694"
        },
        {
            caption: "caption122342caption1",
            username: "asddasads",
            hash: "81cc74b48d8baa856103ae262c67afcd9bc55694"
        },
        {
            caption: "caption1asd",
            username: "asddasads",
            hash: "81cc74b48d8baa856103ae262c67afcd9bc55694"
        }
    ],

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
        art: this.state.artList[this.state.selectedArt - 1],
        caption: this.state.captionList[this.state.selectedCaption]
    })

    // Send the data out to save it.
    this.props.addToSend({ message: payload })
  
    this.props.done();
  }

  componentDidMount(){
    setTimeout(()=>{

        if(this.saveableCanvas1 === null){
            return
        }

        // Set up the canvas for us.
        this.saveableCanvas1.loadSaveData(this.state.artList[0].art, true)
        this.saveableCanvas2.loadSaveData(this.state.artList[1].art, true)
        this.saveableCanvas3.loadSaveData(this.state.artList[2].art, true)
    }, 250);
  }

  /**
   * # render
   */
  render(){

    let captionList = []

    for(let i = 0; i < this.state.captionList.length; i += 1){
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
    return {};
};
  
export default connect(myStateToProps, { addToSend })(GameDrawningPage);