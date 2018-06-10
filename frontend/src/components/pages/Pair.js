import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Layout from './Layout';
import Wrapper from '../Wrapper';
import PairItem from './PairItem';
import loader from '../../images/orange_circles.gif';

class Pair extends Component{
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    
    const token = localStorage.getItem('token');
    if (token === null){
      this.props.history.push("/login");
    }

    // if (Object.keys(this.props.user.userInfo).length === 0)
    //   this.props.getUserInfo();
    this.getPair(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.getPair(newProps);
  }

  getPair(props) {
    const {id, pairs} = props;

    if (pairs[id] === undefined) {
      props.getPair(id);
    }
  }

  
  render() {
    const {id, pairs} = this.props;

    if (pairs[id] === undefined){
       return (
          <Layout news={this.props.news.news} user={this.props.user.userInfo}>
            <div className="page pairs-page">
                <div className="pairs-container"/>
            </div>
            <div className="backdrop"><img className="loader" src={loader}/></div>);
         </Layout>
       );
    }
    const pair = pairs[id];

    return (
      <div>
        <Layout news={this.props.news.news} user={this.props.user.userInfo}>
          <div className="page pairs-page">
              <div className="pairs-container">
                <PairItem pair={pair}/>
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
        <Pair history={this.props.history}/>
      </Wrapper>
    );
  }
}