import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../images/logo.png';

export default class Header extends Component {


	constructor(props) {
		super(props);


		this.state = {
			showMenu: false
		};
		this.menuClick = this.menuClick.bind(this);
		this.logoutClick = this.logoutClick.bind(this);

	}

	componentWillReceiveProps() {
		this.setState({ showMenu: false });
	}

	menuClick() {
		this.setState({ showMenu: !this.state.showMenu });
	}


	logoutClick() {

		localStorage.removeItem("token");
	}

	render() {
		const { user } = this.props;
		const { credit } = user;
		const { showMenu } = this.state;

		if (credit === undefined) return null;

		return (
			<div className={`header-content ${showMenu === true && "responsive"}`}>

				<div className="header-content-logo"> <img src={Logo} /> </div>


				
				<NavLink className="header-content-link" to="/events/main"><i className="fas fa-home" /></NavLink>
				{window.innerWidth < 800 && <a className="header-content-link">Credit: {credit.toFixed(2)}</a>}
				
				
				{
					// window.innerWidth < 700 &&
					// <NavLink className="header-content-link" to="/user/bets"><div><i className="fas fa-money-bill-alt"/> My bets</div></NavLink>
				}

				<NavLink className="header-content-link" to="/events/finished">Finished</NavLink>
				<NavLink className="header-content-link" to="/events/1_hour">Next hour</NavLink>
				<NavLink className="header-content-link" to="/events/2_hours">Next 2 hours</NavLink>
				<NavLink className="header-content-link" to="/events/3_hours">Next 3 hours</NavLink>
				{
					window.innerWidth < 700 &&
					<NavLink className="header-content-link" to="/user/profile"><div><i className="fas fa-user" /> Profile</div></NavLink>
				}
				{
					window.innerWidth < 800 &&
					<NavLink onClick={this.logoutClick} className="header-content-link" to="/login"> <i className="fas fa-sign-out-alt" />Logout</NavLink>
				}

{/* 
				{
					[1, 2, 3].map((nr) => (
						<NavLink key={nr} className="header-content-link" to={`/events/${nr}`}> {nr} day(s)</NavLink>
					))
				} */}

				<a className="icon"> <i className="fas fa-bars" onClick={this.menuClick} /></a>


				<div className="user-info">

					{window.innerWidth >= 800 && <div className="user-name">Credit: {credit.toFixed(2)}</div>}
					<div className="user-name">{user.name}</div>
					<img className="user-avatar" src={"https://www.timesnewroman.ro/files/attach/images/127/624084/nea_costel_merge_la_vot.jpg"} />

					{
						window.innerWidth >= 800 &&
						<NavLink onClick={this.logoutClick} className="user-name" to="/login"> <i className="fas fa-sign-out-alt" />Logout</NavLink>
					}
				</div>
			</div>
		);
	}
}