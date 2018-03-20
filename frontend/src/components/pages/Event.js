import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Layout from './Layout';
import Wrapper from '../Wrapper';

class Event extends Component{
  constructor(props) {
    super(props);
  }

  getEvent(props) {
    const {id, events} = props;
    if (events[id] === undefined) {
      props.getEvent(id);
    }
  }

  componentWillReceiveProps(newProps) {
      this.getEvent(newProps);
  }

  componentDidMount() {
    if (Object.keys(this.props.user.userInfo).length === 0)
      this.props.getUserInfo();
    this.getEvent(this.props);
  }

  render() {
    const {id, events} = this.props;
    const event = events[id];
    return (
      <div>
        <Layout user={this.props.user.userInfo}>
          <div className="page events-page">
              <div className="events-container">
                {JSON.stringify(event)}
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