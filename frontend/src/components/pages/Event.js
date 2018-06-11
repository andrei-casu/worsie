import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Layout from './Layout';
import Wrapper from '../Wrapper';
import EventItem from './EventItem';
import loader from '../../images/orange_circles.gif';

class Event extends Component{
  constructor(props) {
    super(props);

    this.sendBet = this.sendBet.bind(this);
  }


  componentDidMount() {


    const token = localStorage.getItem('token');
    if (token === null){
      this.props.history.push("/login");
    }

     this.props.getPairs();
    if (Object.keys(this.props.user.userInfo).length === 0)
      this.props.getUserInfo();
    this.getEvent(this.props);
  }


  componentWillReceiveProps(newProps) {
      this.getEvent(newProps);
  }

  getEvent(props) {
    const {id, events} = props;
    if (events[id] === undefined) {
      props.getEvent(id);
    }
  }

  sendBet(obj){

    console.log(obj);
    console.log("SADASDASDASDASDAS");
    this.props.sendBet(obj);
    this.props.getUserInfo();
  }

  render() {
    const {id, events, pairs} = this.props;
    const event = events[id];


    console.log(this.props.user);
    if (event === undefined || Object.keys(pairs).length === 0) 
      return (<div className="backdrop"><img className="loader" src={loader}/></div>);
    

    return (
      <div>
        <Layout news={this.props.news.news} user={this.props.user.userInfo}>
          <div className="page events-page">
              <div className="events-container">
              {event.timestamp < new Date().getTime() ?
                  <EventItem event={event} page_type="finished" pairs={this.props.pairs}/>  
              :
                  <EventItem event={event} pairs={this.props.pairs} sendBet={this.sendBet}/>  
              }
                
              </div>
          </div>
        </Layout>
      </div>
    );
  }
}

export default class extends Component {
  render() {
    return (
      <Wrapper id={this.props.match.params.id}>
        <Event history={this.props.history}/>
      </Wrapper>
    );
  }
}