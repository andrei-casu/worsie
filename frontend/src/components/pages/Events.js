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
  }

  getEvents(props) {
    const {type, events} = props;
    if (events[type].length === 0) {
      props.getEvents(type);
    }
  }

  componentWillReceiveProps(newProps) {
      this.getEvents(newProps);
  }

  componentDidMount() {
    if (Object.keys(this.props.user.userInfo).length === 0)
      this.props.getUserInfo();
    this.getEvents(this.props);
  }

  render() {
    const {type, events} = this.props;
    let dEvents = events[type];
    return (
      <div>
        <Layout news={this.props.news.news} user={this.props.user.userInfo}>
          <div className="page events-page">
          {
            dEvents.length > 0 && (
              <div className="events-container">
                {
                  dEvents.map((event, index) => {
                    return (
                      <EventItem key={index} event={event}/>
                    );
                  })
                }
              </div>
            )
          }

          {/* <Pair pair={pair}/> */}
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
        <Events/>
      </Wrapper>
    );
  }
}