import { Switch, Route } from 'react-router-dom';
import Home from '../components/Home';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import welcome from '../styles/welcome.module.css';

const Welcome = () => {
  
  return (
    <main className={welcome.main}>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </main>
  )
};

export default Welcome;