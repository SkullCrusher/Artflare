import React       from 'react';
import { connect } from "react-redux";
import { Card }    from 'antd';
import crypto      from 'crypto';

// Component.
import GameDrawningPage from '../../componentGamePages/GameDrawingPage';
import GameWaitingPage  from '../../componentGamePages/GameWaitingPage';
import GameErrorPage    from '../../componentGamePages/GameErrorPage';
import GameCaptionPage  from '../../componentGamePages/GameCaptionPage';
import GameChoicePage   from '../../componentGamePages/GameChoicePage';
import GameVotingPage   from '../../componentGamePages/GameVotingPage';
import GameWinningPage  from '../../componentGamePages/GameWinningPage';
import Loading          from '../../component/Loading';
import PlannerBanner    from '../../component/PlayerBanner';

// Redux.
import { addUsername, removeUsername, setUsernameStatus, resetUsers } from "../../redux/actions/users";
import { removeFirstToSend } from  '../../redux/actions/messages';
import { addArt, addCaption, addCombo, addVote, resetUserMade } from '../../redux/actions/userMade';

/*
  Configuration
*/

const totalDrawings           = 3;  // How many pictures are they gonna draw.
const bufferTime              = 10; // How many seconds buffer do we give each client.

// How many players to actually start a match (aka 2).
const numberOfPlayersRequired = 1;  // 2;
const secondsToDrawEachImage  = 10; // 90;
const secondsToWriteCaptions  = 10; // 60;
const secondsToChoose         = 20; //
const secondsToVote           = 20; //
const secondsOnWinningPage    = 20;

// Base time calc.
const captionStart         = (secondsToDrawEachImage * totalDrawings) + secondsToWriteCaptions;
const syncStart            = captionStart + bufferTime;
const choicesStart         = syncStart + secondsToChoose;
const choicesWaitStart     = choicesStart + bufferTime;
const voteTimeStart        = choicesWaitStart + secondsToVote;
const voteWaitingTimeStart = voteTimeStart + bufferTime;
const winningTimeStart     = voteWaitingTimeStart + secondsOnWinningPage

const finishedDrawingText = "Good Job! We are waiting on the others now."
const domain = "wss://art-name-wip.radiolaria.workers.dev/api/room/##room##/websocket"

// Block automatic redirecting to waiting.
const blockRedirect = false

/*
  Helpers
*/
function secondsToCountdown(arg){
  return `${Math.floor(arg / 60)}:${((arg % 60) >= 10) ? (arg % 60) : ("0" + arg % 60)}`
}

// hash the file.
function hash(arg) {
  let shasum = crypto.createHash('sha1')
  shasum.update(arg)
  return shasum.digest('hex');
}

class Game extends React.Component {

  ws = null;

  state = {
    // If our websocket is ready.
    ready:          false,

    // Lobby settings.
    username:       "",
    lobbyCode:      "",

    // Help track timing for each.
    currentTime:    0,
    startTimestamp: 0,
    secondsLeft:    0,

    // Drawing variables.
    drawingCount:   1,

    // "preload", "waiting", "drawing", "captions", "sync", "choices", "waiting-for-choices", "voting", "winning"
    phase:          "preload",
  };
  /**
   * # forceBackToWaiting
   * on the voting page if no one voted force it back.
   */
  forceBackToWaiting = () => {
    // Reset redux.
    this.props.resetUserMade();

    // Reset our state.
    this.reset();
  }
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
      let secondsLeft = (this.state.startTimestamp + captionStart) - this.state.currentTime;

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
      const base = this.state.startTimestamp + syncStart;

      if(this.state.currentTime > base){
        this.setState({ phase: "choices" });
      }
    }

    if(this.state.phase === "choices"){

       // Update our seconds left.
       const base = this.state.startTimestamp + choicesStart;

       if(this.state.currentTime > base){
         this.setState({ phase: "waiting-for-choices" });
       }

       let secondsLeft = base - this.state.currentTime;

        // Force it to be at least 0.
        if(secondsLeft < 0){
          secondsLeft = 0;

          // Go to the next drawing state.
          this.setState({ phase: "waiting-for-choices" })
        }

        // Only update if it's not the same.
        if(this.state.secondsLeft !== secondsLeft){
          this.setState({ secondsLeft: secondsLeft });
        }
    }

    if(this.state.phase === "waiting-for-choices"){

       // Update our seconds left.
       const base = this.state.startTimestamp + choicesWaitStart;

       if(this.state.currentTime > base){
         this.setState({ phase: "voting" });
       }

       let secondsLeft = base - this.state.currentTime;

        // Force it to be at least 0.
        if(secondsLeft < 0){
          secondsLeft = 0;

          // Go to the next drawing state.
          this.setState({ phase: "voting" })
        }

        // Only update if it's not the same.
        if(this.state.secondsLeft !== secondsLeft){
          this.setState({ secondsLeft: secondsLeft });
        }
    }

    if(this.state.phase === "voting"){

      // Update our seconds left.
      const base = this.state.startTimestamp + voteTimeStart;

      if(this.state.currentTime > base){
        this.setState({ phase: "waiting-for-votes" });
      }

      let secondsLeft = base - this.state.currentTime;

      // Force it to be at least 0.
      if(secondsLeft < 0){
        secondsLeft = 0;

        // Go to the next drawing state.
        this.setState({ phase: "waiting-for-votes" })
      }

      // Only update if it's not the same.
      if(this.state.secondsLeft !== secondsLeft){
        this.setState({ secondsLeft: secondsLeft });
      }
      
    }

    if(this.state.phase === "waiting-for-votes"){
      // Update our seconds left.
      const base = this.state.startTimestamp + voteWaitingTimeStart;

      if(this.state.currentTime > base){
        this.setState({ phase: "winning" });
      }

      let secondsLeft = base - this.state.currentTime;

      // Force it to be at least 0.
      if(secondsLeft < 0){
        secondsLeft = 0;

        // Go to the next drawing state.
        this.setState({ phase: "winning" })
      }

      // Only update if it's not the same.
      if(this.state.secondsLeft !== secondsLeft){
        this.setState({ secondsLeft: secondsLeft });
      }
    }

    if(this.state.phase === "winning"){
      // Update our seconds left.
      const base = this.state.startTimestamp + winningTimeStart;

      // If we are past our time, reset the round.
      if(this.state.currentTime > base){

        // Reset redux.
        this.props.resetUserMade();

        // Reset our state.
        this.reset();
      }
    }
  }

  // example: {"name":"dddebig1","message":"","timestamp":1629332971906}
  handleMessage = (arg) => {
    // console.log("[message]: ", arg)

    try{

      // We ignore any message that is before our ready state.
      if(!this.state.ready){
        return
      }

       // @@art@@
      if(arg.message.includes("@@ready@@")){
        this.props.setUsernameStatus({
          username: arg.name,
          newState: true,
        });
      }

      // @@art@@
      if(arg.message.includes("@@art@@")){
        let cleanedMessage = arg.message.replace("@@art@@", "")

        this.props.addArt({
          username: arg.name,
          art: cleanedMessage,
          hash: hash(cleanedMessage),
        })
      }

      // @@message@@
      if(arg.message.includes("@@message@@")){
        let cleanedMessage = arg.message.replace("@@message@@", "")

        this.props.addCaption({
          username: arg.name,
          caption: cleanedMessage,
          hash: hash(cleanedMessage),
        })
      }

      // @@combo@@
      if(arg.message.includes("@@combo@@")){
        let cleanedMessage = JSON.parse(arg.message.replace("@@combo@@", ""))

        this.props.addCombo({
          username: arg.name,
          art: cleanedMessage.art,
          caption: cleanedMessage.caption,
          hash: hash(arg.message),
        })
      }

      // @@addVote@@
      if(arg.message.includes("@@addVote@@")){

        let cleanedMessage = arg.message.replace("@@addVote@@", "")

        if(cleanedMessage.length < 2){
          return
        }

        try{
          let tmp = JSON.parse(cleanedMessage);
          this.props.addVote(tmp)
        }catch(e){}
      }    
    
    }catch(e){
      console.log("[error]: handleMessage", e)
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
      if(!blockRedirect){
        this.setState({ phase: "waiting" });
      }
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

      if(parsed.quit !== undefined){
        this.props.removeUsername(parsed.quit);
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
  /**
   * # reset
   * Reset the state so we can start a new round.
   */
  reset = () => {
    this.setState({
      currentTime:    0,
      startTimestamp: 0,
      secondsLeft:    0,
      drawingCount:   1,
      phase:          "waiting",
    });
  };
  /**
   * # pageSelector
   * Generate the page.
   * 
   * @returns {markup}
   */
  pageSelector = () => {

    switch(this.state.phase){

      // Waiting for the websocket connection.
      case "preload": return {
        content: (<Loading text="Waiting for connection" />),
        text: "Connecting to lobby"
      };

      // Waiting for the match to start.
      case "waiting": return {
        content: (<GameWaitingPage username={this.state.username} />),
        text: "Waiting for players to ready up"
      };

      // (CSP-11): Generate the page for the user to draw on to make their art.
      case "drawing": return {
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
      case "captions": return {
        content: (<GameCaptionPage secondsLeft={secondsToCountdown(this.state.secondsLeft)} />),
        text: "Write some captions"
      };

      // Make sure everyone is done syncing.
      case "sync": return {
        content: (<Loading text={finishedDrawingText} />),
        text: "Waiting for players to catch up"
      };

      // (CSP-30): Generate the page for the user to create a combo for voting.
      case "choices": return {
        content: (
          <GameChoicePage
            secondsLeft={secondsToCountdown(this.state.secondsLeft)}
            done={()=>{ this.setState({ phase: "waiting-for-choices" }) }}
            username={this.state.username}
          />),
        text: "Create a combo!"
      };

      // Make sure everyone is done picking.
      case "waiting-for-choices": return {
        content: (
          <Loading
            text={finishedDrawingText}
            secondsLeft={secondsToCountdown(this.state.secondsLeft)}
          />),
        text: "Waiting for players to catch up"
      };

      // (CSP-9): Generate the page for voting.
      case "voting": return {
        content: (
          <GameVotingPage
            done={()=>{ this.setState({ phase: "waiting-for-votes" }) }}
            username={this.state.username}
            secondsLeft={secondsToCountdown(this.state.secondsLeft)}
            triggerReset={this.forceBackToWaiting}
          />),
        text: "Vote for your favorite"
      };

      // Wait for the users to finish voting.
      case "waiting-for-votes": return {
        content: (
          <Loading
            text={finishedDrawingText}
            secondsLeft={secondsToCountdown(this.state.secondsLeft)}
          />),
        text: "Waiting for players to catch up"
      };

      // (CSP-12): Winner phase for the gamemode.
      case "winning": return {
        content: (
          <GameWinningPage
            done={()=>{ this.setState({ phase: "waiting-for-votes" }) }}
            username={this.state.username}
            secondsLeft={secondsToCountdown(this.state.secondsLeft)}
          />),
        text: "The winner!"
      };

      // We had an error or lost internet access.
      case "disconnected": return {
        content: (<GameErrorPage />),
        text: "Error: Connecting to server"
      };

      default:
        return { content: null, text: "Error"};
    }
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

    // Close our websocket and reset our redux.
    this.props.resetUsers();
    this.props.resetUserMade();
    this.ws.close();
  }

  /**
   * # render
   */
  render(){
  
    const { content, text } = this.pageSelector();

    return (
      <div className="c-game">
        <div className="user-info">
          <PlannerBanner lobbyCode={this.state.lobbyCode} phase={this.state.phase} />
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

export default connect(myStateToProps, { resetUsers, addUsername, removeUsername, removeFirstToSend, setUsernameStatus, addVote, addArt, addCaption, addCombo, resetUserMade })(Game);
