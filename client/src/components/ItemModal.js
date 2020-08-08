import React, { Component } from 'react';
//import {v4 as uuid} from 'uuid';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions'

class ItemModal extends Component {
  state = {
    modal:false,
    name: ''
  }
  toggle = ()=>{
    this.setState({
      modal:!this.state.modal
    });
  }

  onChange = (e) =>{
    this.setState({
      [e.target.name] : e.target.value
    });
  }
  onSubmit = e =>{
    e.preventDefault();
    const newItem = {
      name: this.state.name
    }
    this.props.addItem(newItem);
    this.toggle();
  }

  render(){
    console.log(this.props);  //We see that when we log this here, with the mapDispatchToProps passed in to the connect function, the addItem function is now mapped to the props of this component.
    return(
      <div>
        <Button color='dark' style={{marginBottom:'2rem'}} onClick = {this.toggle}>Add Item</Button>
        <Modal isOpen = {this.state.modal} toggle = {this.toggle}>
          <ModalHeader toggle = {this.toggle}>Add To Shopping List</ModalHeader>
            <ModalBody>
              <Form onSubmit = {this.onSubmit}>
                <FormGroup>
                  <Label for='item'>Item</Label>
                  <Input type = 'text' name="name" id = "item" placeholder = "Add shopping item" onChange = {this.onChange}/>
                  <Button color='dark' style={{marginTop: '2rem'}} block> Add Item</Button>
                </FormGroup>
              </Form>
            </ModalBody>
          
        </Modal>
      </div>
    )
  }
}
const mapStateToProps = (state) =>({
  items: state.items
}) 

const mapDispatchToProps = (dispatch) =>{
  return {  
    addItem: (item) =>{
      dispatch(addItem(item))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemModal);