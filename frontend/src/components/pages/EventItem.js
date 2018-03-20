import React, { Component } from 'react';
import PairItem from './PairItem';

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
                                <PairItem key={index} pair={pair.pair} odd={pair.odd} type="short"/>
                            );
                        })
                    }
                    </div>
                </div>
        );
    }
}