import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; 

// Containers
import Homepage from './containers/Homepage';
import Legal from './containers/Legal';
import Error from './containers/Error';
import WhyAds from './containers/WhyAds';
import Game from './containers/Game';

// Components
import Navbar from './component/Navbar';
import Footer from './component/Footer';
// import Drawable from './component/Drawable';

/*
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
      <p> Edit <code>src/App.js</code> and save to reload. </p>
      <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        Learn React  2
      </a>
  </header>
*/

function App() {
  return (
    <Router>
      <div className="c-App">
        <div className="App">
          <div className="c-nav-bar">
            <Navbar />
          </div>
          <div className="content">
            <Switch>
              <Route path="/why">
                <WhyAds />
              </Route>
              <Route path="/game">
                <Game />
              </Route>
              <Route path="/terms">
                <Legal type="terms" />
              </Route>
              <Route path="/privacy">
                <Legal type="privacy" />
              </Route>
              <Route path="/" exact>
                <Homepage />
              </Route>
              <Route path='*'>
                <Error />
              </Route>

            </Switch>
          </div>
          <div className="c-footer">
            <Footer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
