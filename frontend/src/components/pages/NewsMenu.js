import React, { Component } from 'react';
import NewsItem from './NewsItem';

export default class NewsMenu extends Component{
	render(){
		const {news} = this.props;
		if (news.length === 0) return null;

		return(
			<div className="news-menu">
				<div className="title">News</div>
				{
					news.map((element, index) => {
						return (
							<NewsItem key={index} news={element}/>
						);
					})
				}
			</div>
		);
	}
}