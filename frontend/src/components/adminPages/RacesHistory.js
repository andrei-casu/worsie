import React, { Component } from 'react';

export default class RacesHistory extends Component{

    constructor(props){
        super(props);
    
        this.searchWinnerData = this.searchWinnerData.bind(this);
    }


 

    searchWinnerData(event){
        
        const { pairs }= this.props;
        let winner_id;
        let winner_odd;
        let winner_name;


        for (let index in event.pairs){
            if (event.pairs[index].result === 1){
                winner_id = event.pairs[index].pair;
                winner_odd = event.pairs[index].odd;
                break;
            }
        }

        for (let index in pairs){
            if (pairs[index]._id === winner_id){
                winner_name =  pairs[index].name;
                break;
            }
        }

        if (winner_name && winner_odd && winner_id){
            return {winner_name, winner_odd, winner_id};
        }

        return "undefined";
    }



    render(){


        if (this.props.events === null) return null;

        const {events} = this.props.events;     
    
        return (
            <div className="margin-auto"> 
                {
                    events.map((event, index) => {

                      const eventData = this.searchWinnerData(event);
                      if (new Date().getTime() > event.timestamp)
                        return (
                            <div key={index}>
                                <div className="event admin">
                                    <div className={`title margin-bottom `} >{event.name}</div>
                                    <div className={`event-info`}>
                                        
                                        <div className="sub-title margin-bottom">Castigatoari: {eventData.winner_name}</div>
                                        <div className="date margin-bottom">Data si ora cursei: {new Date(event.timestamp).toLocaleString('en-US')}</div>
                                        <div className="date margin-bottom">Id pereche: {eventData.winner_id}</div>
                                        <div className="date margin-bottom">Cota: {eventData.winner_odd}</div>
                                        <div className="date margin-bottom">Numar total de pariuri: {event.totalBets}</div>
                                        <div className="date margin-bottom">Suma totala pariata: {event.totalSum}</div>
                                        <div className="date margin-bottom">Profit obtinut: {event.totalProfit}</div>
                                        <div className="date margin-bottom">Pierderi: {event.totalSumWon}</div>
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