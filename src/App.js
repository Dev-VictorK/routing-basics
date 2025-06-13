import React from "react";
import './App.css';

class App extends React.Component {
  render() {
    return(
      <div className='container'>
        <h2>which body of water?</h2>
        <ul>
          <li>
            <a href='/atlantic'>
            <code>/atlantic</code>
            </a>
          </li>
          <li>
            <a href='/pacific'>
            <code>/pacific</code>
            </a>
          </li>
        </ul>
        <hr/>
        
      </div>
    );
  }
}

export default App;