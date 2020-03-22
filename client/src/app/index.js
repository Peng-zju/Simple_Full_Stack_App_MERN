import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {NavBar} from '../components'
import {MoviesList, MoviesInsert, MoviesUpdate} from '../pages'


function App() {
  return (

   <Router>
     <NavBar/>
     <Switch>
         <Route path='/'  exact component={MoviesList}/>
         <Route path='/movies/list'  exact component={MoviesList}/>
         <Route path='/movies/create' >
             <MoviesInsert/>
         </Route>
         <Route path='/movies/update/:id' exact component={MoviesUpdate} />
     </Switch>
   </Router>
  );
}

export default App;
