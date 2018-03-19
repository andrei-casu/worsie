import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import Logo from '../../images/logo.png';

export default class Header extends Component{

	render(){

		return(
			<div className="header-content">

				<div className="header-content-logo"> <img src={Logo}/> </div>

				<NavLink className="header-content-link" to="/events/main"><i className="fas fa-home"/></NavLink>
				<NavLink className="header-content-link" to="/events/3_hours">Next 3 hours</NavLink>
				{
					[1, 2, 3, 4, 5, 6, 7].map((nr) => (
						<NavLink key={nr} className="header-content-link" to={`/events/${nr}`}> {nr} day(s)</NavLink>
					))
				}
			</div>
		);
	}
}