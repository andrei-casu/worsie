import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import Logo from '../../images/logo.png';

export default class HeaderAdmin extends Component{

	render(){
		const {user} = this.props;

		return(
			<div className="header-content">

				<div className="header-content-logo"> <img src={Logo}/> </div>

				<NavLink className="header-content-link" to="/admin/main"><i className="fas fa-home"/></NavLink>
				<NavLink className="header-content-link" to="/admin/general-statistics">Statistici generale</NavLink>
                <NavLink className="header-content-link" to="/admin/races-statistics">Statistici curse</NavLink>

				
				
				<div className="user-info">
					<div className="user-name">{user.name}</div>
					<img className="user-avatar" src={user.avatar}/>
				</div>
			</div>
		);
	}
}