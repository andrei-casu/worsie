import React, { Component } from 'react';
import PairItem from '../pages/PairItem';

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
        const {events} = this.props;
        const {isEventClicked, eventIndex} = this.state;

        return(
            <div className=" margin-auto main-admin"> 
                <div className="title">Statistici generale </div>
                <div className="subtitle"> Numar total de pariuri: 6347 </div>
                <div className="subtitle"> Profitul total: 215643 lei </div>
                <div className="subtitle"> Evenimentele cu cele mai mari pariuri: </div>

                {
                    events.map((event, index)=>{
                    return (
                        <div key={index} className="event">
                            <div className={`title margin-bottom ${isEventClicked === true && index === eventIndex && "active"}`} onClick={()=>{this.eventNameClick(index);}}>{event.name}</div>
                                <div className={`event-info ${isEventClicked == true && index === eventIndex && "active"}`}>
                                    <div className="sub-title margin-bottom">{event.bet_description}</div>
                                    <div className="date margin-bottom">Data si ora cursei: {new Date(event.timestamp).toLocaleDateString('en-US')}</div>
                                </div>
                                <div className="participants margin-bottom">

                            
                                { isEventClicked === true && index === eventIndex &&
                                    event.pairs.map((pair, index) => {
                                        return (
                                            <PairItem key={index} pair={pair.pair} odd={pair.odd} type="short" hideBet={true}/>
                                        );
                                    })
                                }
                                <div className="sub-title"> Suma totala pariata: 1300 lei</div>
                                </div>
                        </div>
                    );
                })
                }
                <div className="subtitle"> Cei mai activi pariori:</div>
       

            </div>
        );
    }
}