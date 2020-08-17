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
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
//import PropTypes from 'prop-types';

class RegisterModal extends Component {
  state = {
    modal:false,
    name: '',
    email:'',
    password:'',
    msg:null
  }
  toggle = ()=>{
    //Clear errors:
    this.props.clearErrors();
    this.setState({
      modal:!this.state.modal
    });
  }

  //Whats the difference between componentDidMount and componentDidUpdate?
  componentDidUpdate(preProps){
    const {error, isAuthenticated} = this.props;
    if (error !== preProps.error){
      if (error.id === 'REGISTER_FAIL'){  //set the state of the RegisterModal
        this.setState({msg: error.msg.msg});
      }else {
        this.setState({msg:null})
      }
    }
    if (this.state.modal){ //if open
      if (isAuthenticated){ //if authenticated, close modal
        this.toggle();
      }
    }
  }

  onChange = (e) =>{
    this.setState({
      [e.target.name] : e.target.value
    });
  }
  onSubmit = e =>{
    e.preventDefault();
    const {name, email, password} = this.state;
    //Create a user object:
    const newUser = {
      name,
      email,
      password
    };
    //attempt to register
    this.props.register(newUser);
    
  }

  render(){
    console.log(this.props);  //We see that when we log this here, with the mapDispatchToProps passed in to the connect function, the addItem function is now mapped to the props of this component.
    return(
      <div>
        <NavLink onClick={this.toggle} href="#">Register</NavLink>
        <Modal isOpen = {this.state.modal} toggle = {this.toggle}>
          <ModalHeader toggle = {this.toggle}>Register</ModalHeader>
            <ModalBody>
              {this.state.msg ? <Alert color='danger'>{this.state.msg}</Alert> : null}
              <Form onSubmit = {this.onSubmit}>
                <FormGroup>
                  <Label for='name'>Name</Label>
                  <Input type = 'text' name="name" id = "name" placeholder = "Name" className="mb-3" onChange = {this.onChange}/>
                  <Label for='email'>Email</Label>
                  <Input type = 'email' name="email" id = "email" placeholder = "Email" className="mb-3" onChange = {this.onChange}/>
                  <Label for='password'>Password</Label>
                  <Input type = 'password' name="password" id = "password" placeholder = "Password" className="mb-3" onChange = {this.onChange}/>
                  <Button color='dark' style={{marginTop: '2rem'}} block> Register</Button>
                </FormGroup>
              </Form>
            </ModalBody>
          
        </Modal>
      </div>
    )
  }
}
const mapStateToProps = (state) =>({
  isAuthenticated: state.auth.isAuthenticated,  //if the user is authenticated or not.
  error: state.error
}) 
//Then we need to think about how to lift these up with combineReducer
const mapDispatchToProps = (dispatch) =>{
  return {  
    register : (newUser)=>{dispatch(register(newUser))},
    clearErrors: () =>{dispatch(clearErrors())}
  }
  //mapDispatchToProps
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);