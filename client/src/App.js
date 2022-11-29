import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/home/home';
import Detail from './components/Detail/Detail';
import ActivityCreate from './components/ActivityCreate/ActivityCreate';
import Error404 from './components/Error404/Error404'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path = '/' component = {LandingPage}/>
        <Route exact path = '/home' component = {Home}/>
        <Route exact path = '/home/:id' component={Detail}/>
        <Route exact path = '/activities' component={ActivityCreate}/>
        <Route path='*' component={Error404}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
