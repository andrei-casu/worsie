import React, { Component } from 'react';
import {Link} from 'react-router-dom';
// import { Link } from 'react-router-dom';
import Layout from './Layout';
import Wrapper from '../Wrapper';

class UserBets extends Component{
  componentDidMount() {
    if (Object.keys(this.props.user.userInfo).length === 0)
      this.props.getUserInfo();
  }

  render() {
    const {userInfo} = this.props.user;
    return (
      <div>
        <Layout user={userInfo}>
           <div className="page">
            <div className="page-title">Your bets</div>

            {
              userInfo.pending_bets.length > 0 && 
              <div className="page-subtitle">
                Pending bets
              </div>
            }
            {
              userInfo.pending_bets.map((bet, index) => {
                return (
                  <div key={index} className="bet-short">
                    <Link to={`/event/${bet.event_id}`}>Event</Link>
                    <Link to={`/pair/${bet.pair_id}`}>Pair</Link>
                    <div className="bet-amount">{bet.amount}</div>
                  </div>
                );
              })
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
      <Wrapper> 
        <UserBets/>
      </Wrapper>
    );
  }
}