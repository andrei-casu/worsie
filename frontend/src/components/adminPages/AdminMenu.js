import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

export default class AdminMenu extends Component{

	render(){

		return(
			<div className="user-menu">

				<div className="user-menu-element simple">User</div>

				<NavLink className="user-menu-element" to="/admin/profile"><div><i className="fas fa-user"/> Profile</div></NavLink>
				{/* <NavLink className="user-menu-element" to="/user/bets"><div><i className="fas fa-money-bill-alt"/> My bets</div></NavLink> */}
			</div>
		);
	}
}