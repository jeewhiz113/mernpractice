import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';  //include bootstrap in here.
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import { createStore, applyMiddleware, compose } from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducers/index';
import ItemModal from './components/ItemModal';
import thunk from'redux-thunk';
import { loadUser } from './actions/authActions'

const store = createStore(rootReducer, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())); //make a store and connect the store to the rootReducer

class App extends React.Component {
  componentDidMount(){
    store.dispatch(loadUser());
  }
  render(){
    return (  //Provider here gives our app the store.
      <div className="App">
        <Provider store = {store}>
          <AppNavbar />
          <ItemModal />
          <ShoppingList />
        </Provider>
      </div>
      
    );
  }
  
}

export default App;
