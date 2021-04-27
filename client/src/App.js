import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {ApolloProvider} from '@apollo/client/react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import client from './config/graphql'
import Navbar from './components/navbar'
import Footer from './components/footer'
import Home from './pages/home'
import Movies from './pages/movies'
import Series from './pages/series'
import Favorites from './pages/favorites'

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="page1">
          <div className="tail-top">  
            <div className="tail-bottom">
              <div id="main">
                <Navbar></Navbar>
                <Switch>
                  <Route path="/movies">
                    <Movies />
                  </Route>
                  <Route path="/series">
                    <Series />
                  </Route>
                  <Route path="/favorites">
                    <Favorites />
                  </Route>
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
                <Footer></Footer>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
