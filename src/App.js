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

class Redirect extends React.Component {
  static contextType = RouterContext;

  componentDidMount() {
    const to = this.props.to;
    history.push(to);
  }

  render() {
    return null;
  }
}

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
        <li><Link to='/black-sea'><code>/black-sea</code></Link></li>
      </ul>
      <hr />
      <Route path='/atlantic' component={Atlantic} />
      <Route path='/pacific' component={Pacific} />
      <Route path='/black-sea' component={BlackSea} />
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

class BlackSea extends React.Component {
  state = {
    counter: 3,
  };
  componentDidMount() {
    this.interval = setInterval(() => (
      this.setState({ counter: this.state.counter - 1 })
    ), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <div>
        <h3>Black Sea</h3>
        <p>Nothing to sea [sic] here ...</p>
        <p>Redirecting in {this.state.counter}...</p>
        {
          (this.state.counter < 1) ? (
            <Redirect to='/' />
          ) : null
        }

      </div>
    );
  }
}
export default App;
