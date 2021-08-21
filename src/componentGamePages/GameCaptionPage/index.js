import React from 'react';

import { connect } from "react-redux";
import { Button, Input  } from 'antd';

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

    if(this.state.value.length < 4){
        return
    }

    this.setState({ submitting: true })

    // Send the data out to save it.
    this.props.addToSend({ message: "@@message@@" + this.state.value })
  
    setTimeout(()=>{
        this.setState({ value: "", submitting: false })
    }, 500);
  }

  onChange = (type) => {
    return (e) => {

        // Limit the message size to 50 characters.
        this.setState({
            [type]: e.target.value.substring(0, 50)
        })
    }
  }
  /**
   * # componentDidUpdate
   * Handle auto saving when the user runs out of time.
   */
  componentDidUpdate(prevProps, prevState){

  };
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
                <Input
                    value={this.state.value}
                    onChange={this.onChange("value")}
                    placeholder="Party hard, plague hard"
                />
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