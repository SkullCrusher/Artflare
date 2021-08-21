import React       from 'react';
import { connect } from "react-redux";
import { Button }  from 'antd';

import { setUsernameStatus } from '../../redux/actions/users';
import { addToSend } from '../../redux/actions/messages';


class GameWaitingPage extends React.Component {

  state = {
    currentState: "not-ready"
  };
  /**
   * # loop
   * Just keep resending it until we unmount (for new people).
   */
  loop = () => {
    if(this.state.currentState === "not-ready"){
        return;
    }

    this.props.addToSend({ message: "@@ready@@" })
  }
  /**
   * # handleClick
   */
  handleClick = () => {
    // Send the message out to the others that we are ready.
    this.setState({ currentState: "ready" })

    this.props.setUsernameStatus({ username: this.props.username, newState: true })
    this.props.addToSend({ message: "@@ready@@" })
  }

  componentDidMount(){
    this.timer = setInterval(this.loop, 2500);
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  /**
   * # render
   */
  render(){
    return (
        <div className="c-waiting-page">
            <div className="title">
                <div className="text">
                    Game is waiting for everyone to ready up. Click Ready when you are :)
                </div>
                <div className="sub-text">
                    If the others are mid game you will need to wait for them to finish
                </div>
            </div>
            <div className="button">
                <Button
                    type="primary"
                    size="large"
                    onClick={this.handleClick}
                    disabled={(this.state.currentState === "ready")}
                >
                    {(this.state.currentState === "not-ready") ? "Ready" : "Waiting"}
                </Button>
            </div>
        </div>
    )
  };
}

const myStateToProps = (state) => {
    return {};
};
  
export default connect(myStateToProps, { setUsernameStatus, addToSend })(GameWaitingPage);