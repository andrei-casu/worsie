import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import LayoutAdmin from './LayoutAdmin';
import Wrapper from '../Wrapper';
import NextRaces from './NextRaces';
import RacesHistory from './RacesHistory';
import AddRaces from './AddRaces';
import AddPairs from './AddPairs';


class Admin extends Component{
    constructor(props) {
      super(props);


      this.addRaceClick = this.addRaceClick.bind(this);
      this.addPairClick = this.addPairClick.bind(this);
    
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


    componentWillReceiveProps(newProps) {
      
      this.getEvents(newProps);
    }

  getEvents(props) {

    const {events, type} = props;
  
    if (events[type].length === 0) {
      props.getEvents(type);
    }
  }

  addRaceClick(obj){
    console.log("ADD RACE BLICK", obj);
  }

  addPairClick(obj){
    console.log("ADD Pair CLICK", obj);
  }


    render() {

      const { type, events } = this.props;
      

      switch (type){

        case "main":{

            return (
              <div>
                <LayoutAdmin user={this.props.user.userInfo}>
                  <div>Statistici generale</div>
                </LayoutAdmin>
              </div>
            );
        }

        case "races_list":{

            return (
              <div>
                <LayoutAdmin user={this.props.user.userInfo}>
                  <NextRaces events={events[type]}/>
                </LayoutAdmin>
              </div>
            );
        }
        

        case "add_races":{

            return (
              <div>
                <LayoutAdmin user={this.props.user.userInfo}>
                  <AddRaces addRace={this.addRaceClick}/>
                </LayoutAdmin>
              </div>
            );
        }

        case "add_pairs":{

          return (
            <div>
              <LayoutAdmin user={this.props.user.userInfo}>
                <AddPairs addPair={this.addPairClick}/>
              </LayoutAdmin>
            </div>
          );
      }

        case "races_history":{

            return (
              <div>
                <LayoutAdmin user={this.props.user.userInfo}>
                  <RacesHistory events={events[type]}/>
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