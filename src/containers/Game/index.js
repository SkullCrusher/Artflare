import React       from 'react';
import { connect } from "react-redux";
import { Card }    from 'antd';

import GameDrawningPage from '../../component/GameDrawingPage';
import GameWaitingPage  from '../../component/GameWaitingPage';
import GameErrorPage    from '../../component/GameErrorPage';
import Loading          from '../../component/Loading';

const finishedDrawingText = "Good Job! We are waiting on the others now."
const domain = "wss://art-name-wip.radiolaria.workers.dev/api/room/##room##/websocket"

class Game extends React.Component {

  ws = null;

  state = {
    username: "",
    lobbyCode: "",

    phase: "preload", // "waiting", "drawing",

    connectedUsers: [
      {
        username: "example",
        state:    "ready",
      }
    ],
    art: [
      {
        username: "example",
        data: "data"
      }
    ],
    captions: [
      {
        username: "example",
        data: "some captions :("
      }
    ]
  };

  /**
   * # connectToLobby
   */
  connectToLobby = () => {

    // Build the domain we want to connect to from their lobbyCode.
    let builtDomain = domain.replace("##room##", this.state.lobbyCode) //  + "asd?Z?!" (this will made the room invalid for testing).

    this.ws = new WebSocket(builtDomain)

    this.ws.onopen = () => {
      console.log('[debug]: Connected.')

      this.ws.send(JSON.stringify({ name: this.state.username}))

      this.setState({ phase: "waiting" });


    }

    this.ws.onmessage = evt => {
        // listen to data sent from the websocket server
        // const message = JSON.parse(evt.data)
        // this.setState({dataFromServer: message})
        console.log(evt.data)

        /*
        let a = JSON.parse(evt.data);

        this.setState({
          debug: a.message
        });
        */
    }

    // If our websocket closes, don't even try to reconnect because they will be behind on sync.
    this.ws.onclose = () => {
      console.log('[error]: Disconnected.')
      this.setState({ phase: "disconnected" });
    }
  };

  // Resets the store so we can use it again.
  reset = () => {
    
  }




  /**
   * # generateCaption
   * (CSP-10): Generate the page for the user to enter captions for the art.
   * 
   * return {markup}
   */
  generateCaption = () => {
    return (<div>todo</div>)     
  };
  /**
   * # generateVoting
   * (CSP-9): Generate the page for the users to vote on the art.
   * 
   * return {markup}
   */
  generateVoting = () => {
    return (<div>todo</div>)
  };
  /**
   * # generateWinner
   * (CSP-12): Generate the page for showing who won.
   * 
   * return {markup}
   */
  generateWinner = () => {
    return (<div>todo</div>)
  };

  pageSelector = () => {

    if(false){
        return <Loading text={finishedDrawingText} />
    }

    switch(this.state.phase){

      case "preload": return { content: (<Loading text="Waiting for connection" />), text: "Connecting to lobby"};

      case "waiting": return { content: (<GameWaitingPage />), text: "Waiting for players to ready up"};

      // (CSP-11): Generate the page for the user to draw on to make their art.
      case "drawing": return { content: (<GameDrawningPage />), text: "Drawing Phase (1 of 3)"};

      case "disconnected": return { content: (<GameErrorPage />), text: "Error: Connecting to server" }
    }
    
    return { content: null, text: "Error"};
  }

  componentDidMount = () => {

    // Inject our lobby code and username.
    const username = window.location.search.split("&")[0].replace("?username=", "");
    const code     = window.location.search.split("&")[1].replace("lobby=", "");

    if(code !== ""){ this.setState({ lobbyCode: code }) }
    if(username !== ""){ this.setState({ username: username }) }
    
    setTimeout(this.connectToLobby, 1);
  }

  /**
   * # render
   */
  render(){

    const { content, text } = this.pageSelector();

    return (
      <div className="c-game">
        <div className="user-info">
            your username "todo", etc
        </div>
        <Card className="game-content">
            <div className="banner">
              {text}
            </div>
            {content}
        </Card>
      </div>
    );
  };
}


const myStateToProps = (state) => {

  console.log("state", state)

  return {};
};

export default connect(myStateToProps, {  })(Game);
