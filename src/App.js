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

const Atlantic = () => {
  <div>
    <h3>Atlantic Ocean</h3>
    <p>The Atlantic Ocean covers approximately 1/5th of The
      surface of the earth
    </p>
  </div>
};

const Pacific = () => {
  <div>
    <h3>Pacific Ocean</h3>
    <p>
      Ferdinande Magellan, a portuguese explorer, named the Ocean
      `mar pacifico` in 1521, which means peaceful sea.
    </p>
  </div>
};

export default App;