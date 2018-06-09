import React, { Component } from 'react';

export default class CountDown extends Component {

    constructor(props) {
        super(props);

        this.state = {
            now: new Date()
        };
    }

    componentDidMount(){
        this.interval = setInterval(() => {

                            const { eventTime } = this.props;
                            const {now} = this.state;
                    
                            const timestamp = eventTime - now.getTime();
                            if (parseInt(timestamp/1000) % 60 < 0){

                                setTimeout(()=>{
                                    this.props.getEvents(this.props.eventType);
                                }, 2000)
                                
                                // location.reload();
                                return;
                            }
                            this.setState({now: new Date()});

                        },1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
       }
     

    render() {
        const { eventTime } = this.props;
        const {now} = this.state;

        const timestamp = eventTime - now.getTime();


        // if (parseInt(timestamp/1000) % 60 < 0){
        //     this.props.getEvents(this.props.eventType);
        //     // location.reload();
        //     return null;
        // }
        return (
            <div className="date margin-bottom">
                {/* Cursa incepe in: {new Date(timestamp).getDay()} zile,  */}
                {parseInt(timestamp /3600000)} ore, {" "}  
                 {parseInt(timestamp/ 60000)%60} minute, {" "}  
                 {parseInt(timestamp/1000) % 60 > 0 ? parseInt(timestamp/1000) % 60 : 0 } secunde
            </div>
        );
    }
}