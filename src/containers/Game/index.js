import React       from 'react';
import { connect } from "react-redux";
import { Card }    from 'antd';

// Component.
import GameDrawningPage from '../../component/GameDrawingPage';
import GameWaitingPage  from '../../component/GameWaitingPage';
import GameErrorPage    from '../../component/GameErrorPage';
import Loading          from '../../component/Loading';

// Redux.
import { addUsername, removeUsername, setUsernameStatus } from "../../redux/actions/users";
import { removeFirstToSend } from  '../../redux/actions/messages';

// How many players to actually start a match (aka 2).
const numberOfPlayersRequired = 2;

const finishedDrawingText = "Good Job! We are waiting on the others now."
const domain = "wss://art-name-wip.radiolaria.workers.dev/api/room/##room##/websocket"

class Game extends React.Component {

  ws = null;

  state = {

    // If our websocket is ready.
    ready: false,

    startTimestamp: 0,

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

  loop = () => {
    
    if(!this.state.ready){
      return;
    }

    // Send out the messages from our system.
    if(this.props.toSend.length > 0){

      // Send the message.
      this.ws.send(JSON.stringify(this.props.toSend[0]));

      // Remove the message we just sent.
      this.props.removeFirstToSend();      
    }

    // If we are waiting for players and everyone is ready, start.
    if(this.state.phase === "waiting"){

      const total = this.props.users.length;

      // Don't check unless we have enough users to play.
      if(total >= numberOfPlayersRequired){             
        let readyCount = 0;

        for(let i = 0; i < this.props.users.length; i += 1){

          if(this.props.users[i].ready){
            readyCount += 1;
          }
        }

        if(total === readyCount){
          // Set us to drawing.
          this.setState({
            phase: "drawing",
            startTimestamp: Math.floor(Date.now())
          });

          // Reset the ready status for all of the users to false.
          for(let i = 0; i < this.props.users.length; i += 1){
            this.props.setUsernameStatus({
              username: this.props.users[i].username,
              newState: false,
            });
          }
        }
      }
    }

    if(this.state.phase === "drawing"){

    }
  }

  handleMessage = (arg) => {
    // console.log("[Message]: ", arg)

    // We ignore any message that is before our ready state.
    if(!this.state.ready){
      return
    }

    console.log("[Message]: ", arg)

    
  }
  /**
   * # connectToLobby
   */
  connectToLobby = () => {

    // Build the domain we want to connect to from their lobbyCode.
    let builtDomain = domain.replace("##room##", this.state.lobbyCode) //  + "asd?Z?!" (this will made the room invalid for testing).

    this.ws = new WebSocket(builtDomain)

    this.ws.onopen = () => {
      console.log('[debug]: Connected.')

      // Send the cloudflare worker our username.
      this.ws.send(JSON.stringify({ name: this.state.username }))

      // Set our interal state to waiting for the game to start.
      this.setState({ phase: "waiting" });
    };

    this.ws.onmessage = evt => {
      let parsed = JSON.parse(evt.data);

      // Handle us being ready. Example: {"ready":true}
      if(parsed.ready !== undefined){
        console.log("[debug]: System Ready")
        this.setState({ ready: true });
        return
      }

      // Handle user joinned message (also called at first load). Example: {"joined":"dddebig1"}
      if(parsed.joined !== undefined){
        this.props.addUsername({ username: parsed.joined, ready: false });
        return
      }

      // Handle messages (all the data transfer). Example: {"name":"dddebig1","message":"","timestamp":1629332971906}
      if(parsed.message !== undefined){
        this.handleMessage(parsed);
        return
      }
    };

    // If our websocket closes, don't even try to reconnect because they will be behind on sync.
    this.ws.onclose = () => {
      console.log('[error]: Disconnected.')
      this.setState({ phase: "disconnected" });
    };
  };

  // Resets the store so we can use it again.
  reset = () => {
    // TODO.
  };
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

    // return <Loading text={finishedDrawingText} />
    
    switch(this.state.phase){

      // Waiting for the websocket connection.
      case "preload": return { content: (<Loading text="Waiting for connection" />), text: "Connecting to lobby"};

      // Waiting for the match to start.
      case "waiting": return { content: (<GameWaitingPage username={this.state.username} />), text: "Waiting for players to ready up"};

      // (CSP-11): Generate the page for the user to draw on to make their art.
      case "drawing": return { content: (<GameDrawningPage />), text: "Drawing Phase (1 of 3)"};

      // We had an error or lost internet access.
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

    // Start up a timer.
    this.timer = setInterval(this.loop, 250);
  }

  componentWillUnmount(){
    clearInterval(this.timer);
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

  return {
    toSend: state.messagesReducer.list,
    users:  state.usersReducer.users,
  };
};

export default connect(myStateToProps, { addUsername, removeUsername, removeFirstToSend, setUsernameStatus })(Game);
