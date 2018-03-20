import React, { Component } from 'react';

export default class Pair extends Component{
    
    constructor(props){
        super(props);
    }

    render(){

        const {pair} = this.props.pair;

        console.log(pair);
        return(
            <div className="one-pair">
               
               <div className="name margin-bottom">{pair.name}</div>
               <div className="description margin-bottom">{pair.description}</div>
               <div className="odd margin-bottom">Cota: {pair.odd}</div>
               <div onClick={null} className="bet"><i className="fas fa-plus-square"/> Bet </div>
           
                <img className="image" src={pair.img_url}/>

            </div>
        );
    }
}