//A component to log out of the app

import React, {Component, Fragment} from 'react';
import {NavLink} from 'reactstrap';
import {logout} from '../../actions/authActions';
import {connect} from 'react-redux';

export class Logout extends Component {
  render(){
    return (
      <Fragment>
        <NavLink onClick={this.props.logout} href="#">Logout</NavLink>
      </Fragment>
    );
  }
}

export default connect(null, {logout})(Logout)