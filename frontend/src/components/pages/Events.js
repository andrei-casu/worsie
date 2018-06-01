import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Layout from './Layout';
import Wrapper from '../Wrapper';
import EventItem from './EventItem';


// import pair from '../../dummy/pair_info';
// import Pair from './Pair';

class Events extends Component{
  constructor(props) {
    super(props);
    this.sendBet = this.sendBet.bind(this);
  }


  
  componentDidMount() {
    // console.log("COMPONENT DID MOUNT");
    if (token === null){
      this.props.history.push("/login");
    }

    this.props.getPairs();
    const token = localStorage.getItem('token');
    
    if (Object.keys(this.props.user.userInfo).length === 0){
      
      this.props.getUserInfo(localStorage.getItem('token'));
    }

    this.getEvents(this.props);
  }

  componentWillReceiveProps(newProps) {
      
      // console.log(newProps.events.loading);
      if (newProps.events.loading === false){

          this.getEvents(newProps);
      }
      
  }

  getEvents(props) {

    const {type, events} = props;

    if (events[type] === null) {
        props.getEvents(type);
    }
  }

  sendBet(obj){
    this.props.sendBet(obj);
  }

  render() {
    const {type, events} = this.props;

    // console.log("PROPSSS");
    // console.log(this.props);
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
                        />
                    );
                  })
                }
              </div>
            )
          }

          </div>
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