import React, { Component } from 'react';
// import PairItem from '../pages/PairItem';


export default class AdminMain extends Component{
    constructor(props){
        super(props);


        this.state ={
            isEventClicked: false,
            eventIndex: undefined
        };
        this.eventNameClick = this.eventNameClick.bind(this);
    }


    eventNameClick(index) {

        const { eventIndex } = this.state;
        if (eventIndex !== index) {
            this.setState({ eventIndex: index });
        }
        else {
            this.setState({ isEventClicked: !this.state.isEventClicked, eventIndex: index });
        }
    }



    render(){
        
        if (this.props.events === null) return null;

        const {generalStatistics, events, userStatistics} = this.props.events;
        const {isEventClicked, eventIndex} = this.state;


        return(
            <div className=" margin-auto main-admin"> 
                <div className="title">Statistici generale </div>
                <div className="subtitle"> Numar total de pariuri: {generalStatistics.totalBets} </div>
                <div className="subtitle"> Profitul total: {generalStatistics.totalProfit} lei </div>
                <div className="subtitle"> Cei mai activi pariori: </div>
                <div className="participants user-results margin-bottom">
                    {
                        userStatistics.map((user, index)=>{

                            if (user.name == "Adminut") return;
                            return(
                                <div key={index} className="active-users">
                                    <div className="sub-title"> Nume parior: {user.name}</div>
                                    <div className="sub-title"> Suma totala pariata: {user.totalSum} lei</div>
                                    <div className="sub-title"> Numar total de pariuri: {user.totalBets}</div>
                                    <div className="sub-title"> Profit user: {(user.totalSum * user.successRate / 100).toFixed(2)} lei</div>
                                    <div className="sub-title"> Rata de succes: {user.successRate}%</div>
                                </div>

                            );
                        })
                    }
                </div>
                <div className="subtitle"> Evenimentele cu cele mai mari pariuri: </div>

                {
                    events.map((event, index)=>{

                    if (index > 30) return;
                    if (event.totalBets === 0) return;
                    
                    return (
                        <div key={index} className="event">
                            <div className={`title margin-bottom ${isEventClicked === true && index === eventIndex && "active"}`} onClick={()=>{this.eventNameClick(index);}}>{event.name}</div>
                      
                                <div className={`event-info ${isEventClicked == true && index === eventIndex && "active"}`}>
                                    
                                    <div className="date margin-bottom">Data si ora cursei: {new Date(event.timestamp).toLocaleString('en-US')}</div>
                                </div>
                                <div className="sub-title"> Numar total de pariuri: {event.totalBets}</div>
                                <div className="sub-title"> Suma totala pariata: {event.totalSum} lei</div>
                                 <div className="sub-title"> Profitul total: {event.totalProfit} lei</div>
                                 <div className="sub-title"> Pierderi: {event.totalSumWon} lei</div>
                                {/*<div className="participants margin-bottom">
                                    { isEventClicked === true && index === eventIndex &&
                                        event.pairs.map((pair, index) => {

                                            
                                            return (
                                                <PairItem page_type="finished"
                                                          event_id={event._id} 
                                                          key={index}
                                                          odd={pair.odd} 
                                                          type="short" 
                                                          hideBet={true}
                                                          pair={pair.pair}
                                                          place={pair.result}
                                                          pairs={this.props.pairs} 
                                                />
                                            );
                                        })
                                    }
                                </div> */}
                        </div>
                    );
                })
                }       
            </div>
        );
    }
}