import React       from 'react';
import { connect } from "react-redux";
import { Card }    from 'antd';
import crypto      from 'crypto';

// Component.
import GameDrawningPage from '../../component/GameDrawingPage';
import GameWaitingPage  from '../../component/GameWaitingPage';
import GameErrorPage    from '../../component/GameErrorPage';
import GameCaptionPage  from '../../component/GameCaptionPage';
import GameChoicePage   from '../../component/GameChoicePage';
import Loading          from '../../component/Loading';
import PlannerBanner    from '../../component/PlayerBanner';

// Redux.
import { addUsername, removeUsername, setUsernameStatus } from "../../redux/actions/users";
import { removeFirstToSend } from  '../../redux/actions/messages';
import { addArt, addCaption, addCombo } from '../../redux/actions/userMade';

/*
  Configuration
*/

// How many players to actually start a match (aka 2).
const numberOfPlayersRequired = 1; // 2;
const secondsToDrawEachImage  = 10; // 90;
const secondsToWriteCaptions  = 10; // 60;
const totalDrawings           = 3; // How many pictures are they gonna draw.
const bufferTime              = 10; // How many seconds buffer do we give each client.

const finishedDrawingText = "Good Job! We are waiting on the others now."
const domain = "wss://art-name-wip.radiolaria.workers.dev/api/room/##room##/websocket"

/*
  Helpers
*/
function secondsToCountdown(arg){
  return `${Math.floor(arg / 60)}:${((arg % 60) >= 10) ? (arg % 60) : ("0" + arg % 60)}`
}

/*
  hash the file.
*/
function hash(arg) {
  let shasum = crypto.createHash('sha1')
  shasum.update(arg)
  return shasum.digest('hex');
}

class Game extends React.Component {

  ws = null;

  state = {
    // If our websocket is ready.
    ready: false,
    
    // Help track timing for each.
    currentTime:    0,
    startTimestamp: 0,
    secondsLeft:    0,
    
    // Drawing variables.
    drawingCount: 1, // (1 of 3)

    username: "",
    lobbyCode: "",

    phase: "preload", // "preload", "waiting", "drawing", "captions", "sync", "choices", "sync", "voting", "winner"
  };
  /**
   * # loop
   * Basically the game ticker to move things forward.
   */
  loop = () => {
    
    if(!this.state.ready){
      return;
    }

    // If they run out of time force them to the next section.
    if(this.state.currentTime !== Math.floor(Date.now() / 1000)){
      this.setState({
        currentTime: Math.floor(Date.now() / 1000)
      });
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
            startTimestamp: Math.floor(Date.now() / 1000)
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
      return
    }

    if(this.state.phase === "drawing"){
      
      // Update our seconds left.
      let secondsLeft = (this.state.startTimestamp + (secondsToDrawEachImage * this.state.drawingCount)) - this.state.currentTime;
      
      // Force it to be at least 0.
      if(secondsLeft < 0){
        secondsLeft = 0;

        // Go to the next drawing state.
        this.setState({ drawingCount: this.state.drawingCount + 1 })
      }

      if(this.state.drawingCount > (totalDrawings + 2)){
        this.setState({ phase: "captions" });
      }

      // Only update if it's not the same.
      if(this.state.secondsLeft !== secondsLeft){
        this.setState({ secondsLeft: secondsLeft });
      }
    
      return
    }

    if(this.state.phase === "captions"){

      // Update our seconds left.
      const base = (this.state.startTimestamp + (secondsToDrawEachImage * totalDrawings)) + secondsToWriteCaptions;
      let secondsLeft = base - this.state.currentTime;
      
      // Force it to be at least 0.
      if(secondsLeft < 0){
        secondsLeft = 0;
 
        // Go to the next drawing state.
        this.setState({ phase: "sync" })
      }

      // Only update if it's not the same.
      if(this.state.secondsLeft !== secondsLeft){
        this.setState({ secondsLeft: secondsLeft });
      }
    }

    if(this.state.phase === "sync"){
      // Update our seconds left.
      const base = (this.state.startTimestamp + (secondsToDrawEachImage * totalDrawings)) + bufferTime + secondsToWriteCaptions;
     
      if(this.state.currentTime > base){
        this.setState({ phase: "choices" });
      }
    }

    if(this.state.phase === "choices"){
      
    }

    if(this.state.phase === "voting"){

    }
  }

  // example: {"name":"dddebig1","message":"","timestamp":1629332971906}
  handleMessage = (arg) => {
    // console.log("[message]: ", arg)

    // We ignore any message that is before our ready state.
    if(!this.state.ready){
      return
    }

    // @@art@@
    if(arg.message.includes("@@art@@")){
      let cleanedMessage = arg.message.replace("@@art@@", "")

      this.props.addArt({
        username: arg.name,
        art: cleanedMessage,
        hash: hash(cleanedMessage),
      })
      return
    }

    // @@message@@
    if(arg.message.includes("@@message@@")){
      let cleanedMessage = arg.message.replace("@@message@@", "")

      this.props.addCaption({
        username: arg.name,
        caption: cleanedMessage,
        hash: hash(cleanedMessage),
      })
      return
    }

    if(arg.message.includes("@@combo@@")){
      let cleanedMessage = arg.message.replace("@@combo@@", "").split("##")

      if(cleanedMessage.length < 2){
        return
      }

      this.props.addCombo({
        username: arg.name,
        art: cleanedMessage[0],
        caption: cleanedMessage[1],
        hash: hash(cleanedMessage[0] + "##" + cleanedMessage[1]),
      })
      return
    }

    
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
      case "drawing": 
        return {
          content: (
            <GameDrawningPage
              drawingCount={this.state.drawingCount}
              secondsLeft={secondsToCountdown(this.state.secondsLeft)}
              drawSubmit={()=>{ this.setState({ drawingCount: this.state.drawingCount + 1 }) }}
              totalDrawings={totalDrawings}
            />),
          text: `Drawing Phase (${(this.state.drawingCount <= totalDrawings) ? this.state.drawingCount : totalDrawings} of ${totalDrawings})`
        };

      // (CSP-10): Generate the page for the user to write captions for art.
      case "captions": return { content: (<GameCaptionPage secondsLeft={secondsToCountdown(this.state.secondsLeft)} />), text: "Write some captions"};

      // Make sure everyone is done syncing.
      case "sync": return { content: (<Loading text={finishedDrawingText} />), text: "Waiting for players to catch up" }

      // (CSP-30): Generate the page for the user to create a combo for voting.
      case "choices": return { content: (<GameChoicePage />), text: "Create a combo!" }

      // (CSP-9): Generate the page for voting.
      case "voting": return { content: (<Loading text={finishedDrawingText} />), text: "Create a submission" }

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
          <PlannerBanner phase={this.state.phase} />
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

export default connect(myStateToProps, { addUsername, removeUsername, removeFirstToSend, setUsernameStatus, addArt, addCaption, addCombo })(Game);
