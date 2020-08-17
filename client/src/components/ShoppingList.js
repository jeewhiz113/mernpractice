import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {getItems, deleteItem} from '../actions/itemActions'
import {connect} from 'react-redux';
class ShoppingList extends Component {
  handleClick = (_id) =>{  
    this.props.deleteItem(_id);  
  }
  componentDidMount(){
    this.props.getItems();
  }

  render(){
    const {items} = this.props;  
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="shopping-list">
            {items.map(({_id, name})=>(    
              <CSSTransition key = {_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {this.props.isAuthenticated ? <Button className='remove-btn' color="danger" size="sm" key = {_id} onClick={this.handleClick.bind(this, _id)}>&times;</Button> : null}
                  {name}
                </ListGroupItem>
              </CSSTransition>
              
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}
const mapStateToProps = (state) =>{ 
  return{ 
    items: state.item.items,
    isAuthenticated: state.auth.isAuthenticated 
  }
}
//Then we need to think about how to lift these up with combineReducer

const mapDispatchToProps = (dispatch) =>{
  return {
    getItems : ()=>{dispatch(getItems())}, 
    deleteItem : (id) =>{dispatch(deleteItem(id))}  
  }
} 

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);
