import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import Layout from './Layout';
import Wrapper from '../Wrapper';

class Pair extends Component{
  constructor(props) {
    super(props);
  }

  getPair(props) {
    const {id, pairs} = props;
    if (pairs[id] === undefined) {
      props.getPair(id);
    }
  }

  componentWillReceiveProps(newProps) {
    this.getPair(newProps);
  }

  componentDidMount() {
    if (Object.keys(this.props.user.userInfo).length === 0)
      this.props.getUserInfo();
    this.getPair(this.props);
  }

  render() {
    const {id, pairs} = this.props;
    console.log(this.props);
    const pair = pairs[id];
    return (
      <div>
        <Layout user={this.props.user.userInfo}>
          <div className="page pairs-page">
              <div className="pairs-container">
                {JSON.stringify(pair)}
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
        <Pair/>
      </Wrapper>
    );
  }
}