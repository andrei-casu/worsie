import React, { Component } from 'react';

export default class RacesHistory extends Component{

    constructor(props){
        super(props);
    
        this.searchWinnerName = this.searchWinnerName.bind(this);
        this.searchWinnerOdd = this.searchWinnerOdd.bind(this);
    }


    searchWinnerOdd(event){
        const {pairs, winner_id} = event;

        for (let index in pairs){
            if (pairs[index].pair.id === winner_id){
                console.log();
                return pairs[index].odd;
            }
        }

        return undefined;

    }
    searchWinnerName(event){
        
        const {pairs, winner_id} = event;

        for (let index in pairs){
            if (pairs[index].pair.id === winner_id){
                console.log();
                return pairs[index].pair.name;
            }
        }

        return "undefined";
    }

    render(){
        const {events} = this.props;
        
    

        return (
            <div className="margin-auto"> 
                {
                    events.map((event, index) => {
                        return (
                            <div key={index}>
                                <div className="event admin">
                                    <div className={`title margin-bottom `} >{event.name}</div>
                                    <div className={`event-info`}>
                                        
                                        <div className="sub-title margin-bottom">Perechea Castigatoare: {this.searchWinnerName(event)}</div>
                                        <div className="date margin-bottom">Data si ora cursei: {new Date(event.timestamp).toLocaleDateString('en-US')}</div>
                                        <div className="date margin-bottom">Cota: {this.searchWinnerOdd(event)}</div>
                                        <div className="date margin-bottom">Profit obtinut: {event.profit}</div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}