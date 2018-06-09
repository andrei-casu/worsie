import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import LayoutAdmin from './LayoutAdmin';
import Wrapper from '../Wrapper';
import NextRaces from './NextRaces';
import RacesHistory from './RacesHistory';
import AddRaces from './AddRaces';
import AddPairs from './AddPairs';
import AdminMain from './AdminMain';


class Admin extends Component{
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      // console.log("COMPONENT DID MOUNT");

      const token = localStorage.getItem('token');
      if (token === null){
        this.props.history.push("/login");
      }


      if (Object.keys(this.props.pairs).length === 0){
        this.props.getPairs();
      }

      
      if (Object.keys(this.props.user.userInfo).length === 0){
        this.props.getUserInfo();
      }

      this.getEvents(this.props);

      this.interval = setInterval(() => location.reload(), 300000);
    }


    componentWillReceiveProps(newProps) {
      console.log(newProps);

      if (newProps.events.loading === false){
          this.getEvents(newProps);
      }
      
    }

    componentWillUnmount() {
      clearInterval(this.interval);
    }

    getEvents(props) {

      const {type, events} = props;
      
      if (events[type] === null) {
          props.getEvents(type);
      }
    }
    
    render() {

      const { type, events, user } = this.props;
      
      let dEvents = events[type];    
      

      if (dEvents === null) return null;

      
      console.log(this.props.pairs);
      switch (type){

        case "main_admin":{

            return (
              <div>
                <LayoutAdmin user={this.props.user.userInfo}>
                  <AdminMain events={dEvents} user={user} />
                </LayoutAdmin>
              </div>
            );
        }

        case "races_list":{

            return (
              <div>
                <LayoutAdmin user={this.props.user.userInfo}>
                  <NextRaces events={dEvents} pairs={this.props.pairs} />
                </LayoutAdmin>
              </div>
            );
        }

        case "races_history":{

            return (
              <div>
                <LayoutAdmin user={this.props.user.userInfo}>
                  <RacesHistory events={dEvents}/>
                </LayoutAdmin>
              </div>
            );
        }

        default: {

          return (
            <div>
              <LayoutAdmin user={this.props.user.userInfo}>
                <AdminMain events={dEvents} user={user}/>
              </LayoutAdmin>
            </div>
          );
        }
      }
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