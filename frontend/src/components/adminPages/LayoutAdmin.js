import React, { Component } from 'react';
import HeaderAdmin from './HeaderAdmin';
// import UserMenu from './UserMenu';
import AdminMenu from './AdminMenu';


export default class LayoutAdmin extends Component{

	render(){
		return(
			<div>
				<HeaderAdmin user={this.props.user}/>
				<div className="container">
					{/* <AdminMenu/> */}
					{this.props.children}
				</div>
			</div>

		);
	}
}