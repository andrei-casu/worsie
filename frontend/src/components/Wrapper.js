import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import * as EventsActions from '../actions/events';
import * as UserActions from '../actions/user';
import * as PairsActions from '../actions/pairs';
import * as NewsActions from '../actions/news';
import * as RegisterActions from '../actions/register';
import * as LoginActions from '../actions/login';

class Wrapper extends Component {
  constructor(props) {
    super(props);
    props.getNews();
  }

  componentDidMount() {
    // this.props.openFlights();
  }

  render() {

    
    const {children} = this.props;
    let childrenArray = [];

    if (children.length === undefined)
      childrenArray.push(children);
    else 
      childrenArray = children;

    const childrenWithProps = childrenArray.map((child, index) => {
      let res;
      // if it's not a function leave the element as it is
      if (typeof(child.type) === 'string')
        res = child;
      else res = React.cloneElement(child, this.props);

      return (<div key={`child-${index}`}>{res}</div>);
    });
    return (
      <div>
        {childrenWithProps}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      ...EventsActions, 
      ...UserActions,
      ...PairsActions,
      ...NewsActions,
      ...RegisterActions,
      ...LoginActions
    }, dispatch);
}

function mapStateToProps(state) {
  // console.log('state');
  // console.log(state);
  return { ...state };
}

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);