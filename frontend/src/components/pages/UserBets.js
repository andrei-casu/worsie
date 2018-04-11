import React, { Component } from 'react';
import {Link} from 'react-router-dom';
// import { Link } from 'react-router-dom';
import Layout from './Layout';
import Wrapper from '../Wrapper';

class UserBets extends Component{
  componentDidMount() {

    const token = localStorage.getItem('token');
    if (token === null){
      this.props.history.push("/login");
    }
    
    if (Object.keys(this.props.user.userInfo).length === 0)
      this.props.getUserInfo();
  }

  render() {
    const {userInfo} = this.props.user;

  
    if (Object.keys(userInfo).length === 0) return null; 
    return (
      <div>
        <Layout news={this.props.news.news} user={userInfo}>
           <div className="page">
            <div className="page-title margin-bottom">Pariurile tale</div>
            <div className="page-money">Suma totala disponibila: 104 lei</div>


            {
              userInfo.pending_bets.length > 0 && 
              <div className="page-subtitle">
                Pariuri in desfasurare
              </div>
            }
            {
              userInfo.pending_bets.map((bet, index) => {
                return (
                  <div key={index} className="bet-short">
                    <Link to={`/event/${bet.event_id}`}>Eveniment</Link><br/>
                    <Link to={`/pair/${bet.pair_id}`}>Perechea pariata</Link>
                    <div className="bet-amount">Suma pariata: {bet.amount} lei</div>
                  </div>
                );
              })
            }

            <div className="page-subtitle">
                Istoric pariuri:
            </div>
            {
              userInfo.history.map((obj, index) => {
                return (
                  <div key={index} className="bet-short">
                    <Link to={`/event/${obj.event_id}`}>Eveniment</Link><br/>
                    <Link to={`/pair/${obj.pair_id}`}>Perechea pariata</Link>
                    <div className="bet-amount">Suma pariata: {obj.amount} lei</div>
                    <div className={`bet-amount ${obj.won === true? "won" : "lost"}`}>{obj.won === true? 'Castigat' : 'Pierdut'} </div>
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
        <UserBets history={this.props.history}/>
      </Wrapper>
    );
  }
}