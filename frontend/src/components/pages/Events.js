import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Layout from './Layout';
import Wrapper from '../Wrapper';

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
    this.props.getUserInfo();
    this.getEvents(this.props);
  }

  render() {
    const {type, events} = this.props;
    let dEvents = events[type];
    return (
      <div>
        <Layout user={this.props.user.userInfo}>
          <div className="page events-page">
          {
            dEvents.length > 0 && (
              <div className="events-container">
                {
                  dEvents.map((event, index) => {
                    return (
                      <div key={index} className="event">
                        <div className="title">{event.name}</div>
                        <div className="sub-title">{event.bet_description}</div>
                        <div className="date">{new Date(event.timestamp).toLocaleDateString('en-US')}</div>
                        <div className="participants">
                          {
                            event.pairs.map((pair, index) => {
                              return (
                                <div key={index} className="pair">
                                  <div onClick={null} className="bet"><i className="fas fa-plus-square"/> Bet </div>
                                  <div className="odd">{pair.odd}</div>
                                  <div className="name">{pair.pair.name}</div>
                                  <div className="description">{pair.pair.description}</div>
                                  <div className="image"><img src={pair.pair.img_url}/></div>
                                </div>
                              )
                            })
                          }
                        </div>
                      </div>
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
        <Events/>
      </Wrapper>
    );
  }
}