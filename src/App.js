import './App.css'
import { BrowserRouter,  Switch, Route, Redirect } from 'react-router-dom'
import { useSelector } from "react-redux";
import React from 'react';
import Header from './components/header/header';
import Create from './components/page1/create'
import Details from './components/page2/details'
import Login from './components/login/login';
import Auth from './components/login/auth';

function App() {
  const index = useSelector(state => state.now.now)
  let [token, setToken]  = React.useState(false)

  return (
    <BrowserRouter>
      <div className="App">
        <Header setToken={setToken} token={token}/>
        <Switch>
          <Route exact path='/' render={() => <Create />}/>
          <Route path='/details/:title' render={() => <Details />}/>
          <Route path='/login' render={() => <Login setToken={setToken}/>}/>
          <Route path='/auth' render={() => <Auth />}/>
        </Switch>
        <Redirect to='/login' />
      </div>
    </BrowserRouter>
  );
}

export default App;
