import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';  //include bootstrap in here.
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import { createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import rootReducer from './reducers/rootReducer';
import ItemModal from './components/ItemModal';
import thunk from'redux-thunk';

const store = createStore(rootReducer,applyMiddleware(thunk)); //make a store and connect the store to the rootReducer

class App extends React.Component {
  render(){
    return (  //Provider here gives our app the store.
      <div className="App">
        <AppNavbar />
        <Provider store = {store}>
            <ItemModal />
            <ShoppingList />
        </Provider>
      </div>
      
    );
  }
  
}

export default App;
