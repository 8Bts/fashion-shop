import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ItemList from '../containers/ItemList';
import ItemPage from './ItemPage';
import { logUser } from '../redux/actions/index';

const App = ({ currentUser, logUser }) => {
  useEffect(() => {
    window.addEventListener('resize', () => {
      const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      if (vw > 768) window.location.replace('/');
    });
  }, []);

  return (
    <div className="main bg-home">
      <Switch>
        <Route exact path="/">
          {currentUser ? <ItemList currentUser={currentUser} /> : <Home />}
        </Route>
        <Route path="/item/:id" render={(router) => (currentUser ? (<ItemPage match={router.match} currentUser={currentUser} />) : <Home />)} />
        <Route path="/signin" render={() => (<SignIn logUser={logUser} />)} />
        <Route path="/signup" render={() => (<SignUp logUser={logUser} />)} />
      </Switch>
    </div>
  );
};

App.propTypes = {
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    adminLevel: PropTypes.string,
    favourites: PropTypes.arrayOf(PropTypes.object),
  }),
  logUser: PropTypes.func.isRequired,
};
App.defaultProps = { currentUser: null };

const mapStateToProps = (state) => ({ currentUser: state.currentUser });
const mapDispatchToProps = {
  logUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
