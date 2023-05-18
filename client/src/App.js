import './App.css';
import { Route } from 'react-router-dom/cjs/react-router-dom.min';
import Landing from './views/landing/Landing';
import NavBar from './Components/NavBar/NavBar';
import { useLocation } from 'react-router-dom';
import Home from './views/home/Home';
import Detail from './views/detail/Detail';
import Form from './views/form/Form';
import Error from './views/error/Error';

function App() {
  const location=useLocation()

  const knownRoutes=["/","/home", "/form"]
  const noLandingRoutes=["/home", "/detail", "/form"]
  const isDynamicDetailRoute = location.pathname.startsWith("/detail/");
  return (
    <div className="App">
      {noLandingRoutes.includes(location.pathname) && <NavBar/> } 
        <Route exact path='/' render={()=><Landing/>}/>
        <Route exact path='/home' render={()=><Home/>}/>
        <Route exact path='/detail/:id' render={()=><Detail/>}/>
        <Route exact path='/form' render={()=><Form/>}/>
        {!isDynamicDetailRoute && !knownRoutes.includes(location.pathname) && <Route component={() => <Error />} />}
    </div>
  );
}

export default App;
