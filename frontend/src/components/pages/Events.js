import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Layout from './Layout';
import Wrapper from '../Wrapper';
import EventItem from './EventItem';
import loader from '../../images/orange_circles.gif';


// import pair from '../../dummy/pair_info';
// import Pair from './Pair';

class Events extends Component{
  constructor(props) {
    super(props);
    this.sendBet = this.sendBet.bind(this);
  }

  
  componentDidMount() {
    // console.log("COMPONENT DID MOUNT");

    const token = localStorage.getItem('token');
    if (token === null){
      this.props.history.push("/login");
    }


    if (Object.keys(this.props.pairs).length === 0){
      this.props.getPairs();
    }

    
    // if (Object.keys(this.props.user.userInfo).length === 0){
      this.props.getUserInfo();
    // }

    this.getEvents(this.props);

     this.interval = setInterval(() => this.props.getEvents(this.props.type), 180000); 
  }

  
  componentWillReceiveProps(newProps) {
      // console.log(newProps);
      // console.log("RECEIVE PROPS");

      if (newProps.events.loading === false){
          this.getEvents(newProps);

      }
      
  }

  componentWillUnmount() {
   clearInterval(this.interval);
  }

  getEvents(props) {

    const {type, events} = props;
    
    if (events[type] === null) {
        props.getEvents(type);
    }
  }

  sendBet(obj){
    this.props.sendBet(obj);
    this.props.getUserInfo();
  }

  render() {
    const {type, events} = this.props;
    const {loading} = events;

    // console.log("PROPSSS");
    // console.log(loading);
    let dEvents = events[type];    

    return (


      <div>
        <Layout news={this.props.news.news} user={this.props.user.userInfo}>
          <div className="page events-page">
          {
            dEvents !== null && (
              <div className="events-container">
                {
                  dEvents.map((event, index) => {
                    return (
                         <EventItem 
                            key={index} 
                            event={event} 
                            pairs={this.props.pairs} 
                            sendBet={this.sendBet}
                            page_type={this.props.type}
                            userCredit={this.props.user.userInfo.credit}
                            getEvents = {this.props.getEvents}
                            eventType={this.props.type}
                        />
                    );
                  })
                }
              </div>
            )
          }

          </div>
           {loading === true && <div className="backdrop"><img className="loader" src={loader}/></div>}
        </Layout>
      </div>
    );
  }
}

export default class extends Component {
  render() {
    return (
      <Wrapper type={this.props.match.params.type}>
        <Events history={this.props.history}/>
      </Wrapper>
    );
  }
}