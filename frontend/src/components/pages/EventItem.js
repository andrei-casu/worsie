import React, { Component } from 'react';
import PairItem from './PairItem';
import CountDown from '../CountDown';

export default class EventRender extends Component{

    constructor(props){
        super(props);

        this.state ={
            isEventClicked: false
        };
        this.eventNameClick = this.eventNameClick.bind(this);
    }



    eventNameClick(){
        this.setState({isEventClicked : !this.state.isEventClicked});
    }

    render(){

        const {event, userCredit} = this.props;
        const {isEventClicked} = this.state;

        // console.log(event);
        // console.log(this.props);
        return(
            <div className="event">
                <div className={`title margin-bottom ${isEventClicked === true && "active"}`} onClick={this.eventNameClick}>{event.name}</div>
                    <div className={`event-info ${isEventClicked == true && "active"}`}>
                        <div className="sub-title margin-bottom">{event.bet_description}</div>
                        <div className="date margin-bottom">Data si ora cursei: {new Date(event.timestamp).toLocaleString('en-US')}</div>
                        {this.props.page_type !== "finished" && isEventClicked === true &&
                            <CountDown eventTime={event.timestamp} getEvents={this.props.getEvents} eventType={this.props.eventType}/>
                        }

                    </div>
                    <div className="participants margin-bottom">

                
                    { isEventClicked === true &&
                        event.pairs.map((pair, index) => {

                            return (
                                <PairItem 
                                    sendBet={this.props.sendBet} 
                                    key={index} 
                                    pair={pair.pair} 
                                    odd={pair.odd}
                                    place={pair.result}
                                    type="short" 
                                    pairs={this.props.pairs} 
                                    event_id={event._id}
                                    page_type={this.props.page_type}
                                    userCredit = {userCredit}
                                />
                            );
                        })
                    }
                    </div>
                </div>
        );
    }
}