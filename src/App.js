import React, { createContext, useContext, useState, useEffect } from 'react';
import { createBrowserHistory } from 'history';

// Create history once globally
const history = createBrowserHistory();

// Create context with default value
const RouterContext = createContext({
  history: history,
  location: history.location
});

// RouterContextProvider with state-based location
const RouterContextProvider = ({ children }) => {
  const [location, setLocation] = useState(history.location);

  useEffect(() => {
    const unlisten = history.listen(({ location }) => {
      setLocation(location); // This triggers re-render
    });

    return () => unlisten(); // Clean up on unmount
  }, []);

  return (
    <RouterContext.Provider value={{ history, location }}>
      {children}
    </RouterContext.Provider>
  );
};

// Route component
const Route = ({ path, component }) => {
  const { location } = useContext(RouterContext);
  const pathname = location.pathname;

  if (pathname.match(path)) {
    return React.createElement(component);
  } else {
    return null;
  }
};

// Link component
const Link = ({ to, children }) => {
  const { history } = useContext(RouterContext);

  return (
    <a
      href={to}
      onClick={(e) => {
        e.preventDefault();
        history.push(to); // Will trigger re-render via context
      }}
    >
      {children}
    </a>
  );
};

// Sample App and components
const App = () => (
  <RouterContextProvider>
    <div className='container'>
      <h2>Which body of water?</h2>
      <ul>
        <li><Link to='/atlantic'><code>/atlantic</code></Link></li>
        <li><Link to='/pacific'><code>/pacific</code></Link></li>
      </ul>
      <hr />
      <Route path='/atlantic' component={Atlantic} />
      <Route path='/pacific' component={Pacific} />
    </div>
  </RouterContextProvider>
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
    <p>Ferdinand Magellan, a Portuguese explorer, named the ocean `mar pacifico` in 1521.</p>
  </div>
);

export default App;
