import {Switch, Route, Redirect} from 'react-router-dom'

import SignUp from './components/SignUp';
import Login from './components/Login'
import Profile from './components/Profile';
import Task from './components/Task';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path='/login' component={Login} />
      <Route exact path='/signup' component={SignUp} />
      <ProtectedRoute exact path='/' component={Task} />
      <ProtectedRoute exact path='/profile' component={Profile} />
      <Redirect to='/' />
    </Switch>
  );
}

export default App;
