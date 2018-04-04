import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Layout from './Layout';
import Wrapper from '../Wrapper';
import EventItem from './EventItem';

class Event extends Component{
  constructor(props) {
    super(props);
  }


  componentDidMount() {
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

  render() {
    const {id, events} = this.props;
    const event = events[id];
    if (event === undefined) return null;
    return (
      <div>
        <Layout news={this.props.news.news} user={this.props.user.userInfo}>
          <div className="page events-page">
              <div className="events-container">
                <EventItem event={event}/>
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
        <Event/>
      </Wrapper>
    );
  }
}