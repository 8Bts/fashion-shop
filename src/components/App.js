import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ItemList from '../containers/ItemList';

const App = () => {
  const signedIn = true;

  return (
    <div className={`main ${signedIn ? 'bg-dashboard' : 'bg-home'}`}>
      <Switch>
        <Route path="/" component={signedIn ? ItemList : Home} exact />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </div>
  );
};

export default App;
