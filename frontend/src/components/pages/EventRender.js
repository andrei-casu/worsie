import React, { Component } from 'react';

export default class EventRender extends Component{

    constructor(props){
        super(props);
    }

    render(){

        const {event} = this.props;

        return(
            <div  className="event">
                <div className="title margin-bottom">{event.name}</div>
                    <div className="sub-title margin-bottom">{event.bet_description}</div>
                    <div className="date margin-bottom">Data si ora cursei: {new Date(event.timestamp).toLocaleDateString('en-US')}</div>
                    <div className="participants margin-bottom">
                    {
                        event.pairs.map((pair, index) => {
                            return (
                                <div key={index} className="pair">
                                    
                                    <div className="pair-info">
                                        <div className="name margin-bottom">{index+1}. {pair.pair.name}</div>
                                        <div className="description margin-bottom">{pair.pair.description}</div>
                                    </div>
                                    <img className="image" src={pair.pair.img_url}/>
                                </div>
                            );
                        })
                    }
                    </div>
                </div>
        );
    }
}