import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

export default class Header extends Component{

	render(){

		return(
			<div className="header-content">

				<div className="header-content-logo"> LOGO </div>

				<NavLink className="header-content-link" to="/">Your Bets</NavLink>
				<NavLink className="header-content-link" to="/calendar">Calendar</NavLink>
				<NavLink className="header-content-link" to="/user-history">Your Bets History</NavLink>
				<NavLink className="header-content-link" to="/horses-history">Horses History</NavLink>

				<div className="header-content-logo"> Current Money Situation </div>
				<div className="header-content-logo"> Name+Account Info </div>
			</div>
		);
	}
}