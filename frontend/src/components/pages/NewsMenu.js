import React, { Component } from 'react';

export default class NewsMenu extends Component{
	render(){
		const {news} = this.props;

		return(
			<div className="news-menu">
				<div className="title">News</div>
				{JSON.stringify(news)}
			</div>
		);
	}
}