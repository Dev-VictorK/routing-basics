import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

const App = () => (
  <Router>
    <div className='container'>
      <h2>Which body of water?</h2>
      <ul>
        <li><Link to='/atlantic'><code>/atlantic</code></Link></li>
        <li><Link to='/atlantic/ocean'><code>/atlantic/ocean</code></Link></li>
        <li><Link to='/pacific'><code>/pacific</code></Link></li>
        <li><Link to='/black-sea'><code>/black-sea</code></Link></li>
      </ul>
      <hr />
      <Routes>
        <Route path='/atlantic/ocean' element={
          <div>
            <h3>Atlantic Ocean — Again!</h3>
            <p>Also known as "The Pond."</p>
          </div>
        } />
        <Route path='/atlantic' element={<Atlantic />} />
        <Route path='/pacific' element={<Pacific />} />
        <Route path='/black-sea' element={<Navigate to="/" />} />
        <Route path='/' element={
          <h3>Welcome! Select a body of saline water above.</h3>
        } />
      </Routes>
    </div>
  </Router>
);

const Atlantic = () => (
  <div>
    <h3>Atlantic Ocean</h3>
    <p>The Atlantic Ocean covers approximately 1/5th of the surface of the earth.</p>
  </div>
);

const Pacific = () => (
  <div>
    <h3>Pacific Ocean</h3>
    <p>Ferdinand Magellan, a Portuguese explorer, named the ocean 'mar pacifico' in 1521.</p>
  </div>
);

export default App;
