import React, { Component } from 'react';
import Header from './Header';
import UserMenu from './UserMenu';
import NewsMenu from './NewsMenu';

export default class Layout extends Component{

	render(){
		return(
			<div>
				<Header user={this.props.user}/>
				<div className="container">
					<UserMenu/>
					{this.props.children}
					<NewsMenu/>
				</div>
			</div>

		);
	}
}