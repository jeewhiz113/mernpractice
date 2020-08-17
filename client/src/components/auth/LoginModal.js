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
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';
//import PropTypes from 'prop-types';

class LoginModal extends Component {
  state = {
    modal:false,
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
      if (error.id === 'LOGIN_FAIL'){  //set the state of the RegisterModal
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
    const {email, password} = this.state;

    const user = {
      email,
      password
    }
    //attempt to login:
    this.props.login(user);
  }

  render(){
    console.log(this.props);  //We see that when we log this here, with the mapDispatchToProps passed in to the connect function, the addItem function is now mapped to the props of this component.
    return(
      <div>
        <NavLink onClick={this.toggle} href="#">Login</NavLink>
        <Modal isOpen = {this.state.modal} toggle = {this.toggle}>
          <ModalHeader toggle = {this.toggle}>Login</ModalHeader>
            <ModalBody>
              {this.state.msg ? <Alert color='danger'>{this.state.msg}</Alert> : null}
              <Form onSubmit = {this.onSubmit}>
                <FormGroup>
                  <Label for='email'>Email</Label>
                  <Input type = 'email' name="email" id = "email" placeholder = "Email" className="mb-3" onChange = {this.onChange}/>
                  <Label for='password'>Password</Label>
                  <Input type = 'password' name="password" id = "password" placeholder = "Password" className="mb-3" onChange = {this.onChange}/>
                  <Button color='dark' style={{marginTop: '2rem'}} block> Login</Button>
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
    login : (user)=>{dispatch(login(user))},
    clearErrors: () =>{dispatch(clearErrors())}
  }
  //mapDispatchToProps
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);