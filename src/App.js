import React from 'react';
import PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';

const Route = ({ path, component }, { location }) => {
  const pathname = location.pathname;
  if (pathname.match(path)) {
    return (
      React.createElement(component)
    );
  } else {
    return null;
  }
};

Route.contextTypes = {
  location: React.PropTypes.object,
};

const Link = ({ to, children }, { history }) => (
  <a
    onClick={(e) => {
      e.preventDefault();
      history.push(to);
    }}
    href={to}>
    {children}
  </a>
);

Link.contextTypes = {
  history: React.PropTypes.object,
};

class Router extends React.Component {

  static childContextTypes = {
    history: React.PropTypes.object,
    location: React.PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.history = createBrowserHistory();
    this.history.listen(() => this.forceUpdate());
  }

  getChildContext() {
    return {
      history: this.history,
      location: window.location,
    };
  }

  render() {
    return this.props.children;
  }

}

const App = () => (
  <Router>
    <div className='container'>
      <h2>Which body of water?</h2>
      <ul>
        <li>
          <Link to='/atlantic'>
            <code>/atlantic</code>
          </Link>
        </li>
        <li>
          <Link to='/pacific'>
            <code>/pacific</code>
          </Link>
        </li>
      </ul>
      <hr />
      <Route path='/atlantic' component={Atlantic} />
      <Route path='/pacific' component={Pacific} />
    </div>
  </Router>
);

const Atlantic = () => (
  <div>
    <h3>Atlantic Ocean</h3>
    <p>The Atlantic Ocean covers approximately 1/5th of The
      surface of the earth
    </p>
  </div>
);

const Pacific = () => (
  <div>
    <h3>Pacific Ocean</h3>
    <p>
      Ferdinande Magellan, a portuguese explorer, named the Ocean
      `mar pacifico` in 1521, which means peaceful sea.
    </p>
  </div>
);

export default App;