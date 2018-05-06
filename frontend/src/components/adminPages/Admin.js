import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import LayoutAdmin from './LayoutAdmin';
import Wrapper from '../Wrapper';
import NextRaces from './NextRaces';
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

      if (Object.keys(this.props.user.userInfo).length === 0){
        
        this.props.getUserInfo(JSON.parse(localStorage.getItem('token')));
      }
      this.getEvents(this.props);
      
  }

  getEvents(props) {
    const {events} = props;
    const type = "main";
    if (events[type].length === 0) {
      props.getEvents(type);
    }
  }

    render() {

      const { type, events } = this.props;

      switch (type){

        case "general-statistics":{

            return (
              <div>
                <LayoutAdmin user={this.props.user.userInfo}>
                  <div>ADMIN PAGEbbbbbb</div>
                </LayoutAdmin>
              </div>
            );
        }

        case "races-statistics":{

            return (
              <div>
                <LayoutAdmin user={this.props.user.userInfo}>
                  
                  <NextRaces events={events["main"]}/>
                </LayoutAdmin>
              </div>
            );
        }

        case "add-races":{

            return (
              <div>
                <LayoutAdmin user={this.props.user.userInfo}>
                  <div>ADMIN PAGddddddd</div>
                </LayoutAdmin>
              </div>
            );
        }
      }

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