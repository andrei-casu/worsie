import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../images/logo.png';

export default class HeaderAdmin extends Component {


	constructor(props) {
		super(props);


		this.state = {
			showMenu: false
		};
		this.menuClick = this.menuClick.bind(this);
		this.logoutClick = this.logoutClick.bind(this);

	}

	componentWillReceiveProps(){
		this.setState({showMenu: false});
	}

	menuClick() {
		this.setState({ showMenu: !this.state.showMenu });
	}


	logoutClick(){
		// console.log("LOGOUT");
		localStorage.removeItem("token");
	}

	render() {
		const { user } = this.props;
		const { showMenu } = this.state;

		return (
			<div className={`header-content ${showMenu === true && "responsive"}`}>

				<div className="header-content-logo"> <img src={Logo} /> </div>

				<NavLink className="header-content-link" to="/admin/main_admin"><i className="fas fa-home"/></NavLink> 
				<NavLink className="header-content-link" to="/admin/races_list">Lista curse viitoare</NavLink>
				<NavLink className="header-content-link" to="/admin/races_history">Istoric curse</NavLink>

				{
					window.innerWidth < 800 &&
					<NavLink onClick={this.logoutClick} className="header-content-link" to="/login"> <i className="fas fa-sign-out-alt"/>Logout</NavLink>
				}
				
				
				
				<a className="icon"> <i className="fas fa-bars" onClick={this.menuClick}/></a>
				
				<div className="user-info">
					<div className="user-name">{user.name}</div>
					<img className="user-avatar" src={"https://www.timesnewroman.ro/files/attach/images/127/624084/nea_costel_merge_la_vot.jpg"} />
					
					{
						window.innerWidth >= 800 && 
						<NavLink onClick={this.logoutClick} className="user-name" to="/login"> <i className="fas fa-sign-out-alt"/>Logout</NavLink>
					}
				</div>
			</div>
		);
	}
}
