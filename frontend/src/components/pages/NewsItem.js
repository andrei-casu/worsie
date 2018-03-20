import React, { Component } from 'react';

export default class NewsItem extends Component{

    constructor(props){
        super(props);
    }

    render(){

        const {news} = this.props;

        return(
            
            <div className="news">

                <div className="sub-title">{news.title}</div>
                <img className="thumbnail" src={news.thumbnail}/>
                <div className="description">{news.description}</div>
            </div>
        );
    }

}