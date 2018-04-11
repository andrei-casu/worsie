import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import LayoutAdmin from './LayoutAdmin';
import Wrapper from '../Wrapper';
// import EventItem from '../pages/EventItem';

// import pair from '../../dummy/pair_info';
// import Pair from './Pair';

class Admin extends Component{
    constructor(props) {
      super(props);
    }

   

    componentDidMount() {

      const token = localStorage.getItem('token');
      if (token === null){
        this.props.history.push("/login");
      }

      if (Object.keys(this.props.user.userInfo).length === 0)
        this.props.getUserInfo();
      this.getEvents(this.props);
    }


    componentWillReceiveProps(newProps) {
        this.getEvents(newProps);
    }

    getEvents(props) {
      
      const {type, events} = props;

      if (events[type].length === 0) {
        props.getEvents(type);
      }
    }

    render() {
      // const {type, events} = this.props;
      // let dEvents = events[type];

      return (
        <div>
          <LayoutAdmin user={this.props.user.userInfo}>
            <div>ADMIN PAGE </div>
          </LayoutAdmin>
        </div>
      );
    }
}

export default class extends Component {
  render() {
    return (
      <Wrapper type={this.props.match.params.type}>
        <Admin history={this.props.history}/>
      </Wrapper>
    );
  }
}