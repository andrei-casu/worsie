import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class PairItem extends Component{
    
    constructor(props){
        super(props);
    }

    render(){

        const {pair, odd, type} = this.props;
        if (pair === undefined) return null;

        if (type === 'short')
          return (
            <div className="pair">
              <div className="pair-info">
                <Link to={`/pair/${pair.id}`}><div className="name margin-bottom">{pair.name}</div></Link>
                <div className="description margin-bottom">{pair.description}</div>
                <div className="odd margin-bottom">Cota: {odd}</div>
                <div onClick={null} className="bet"><i className="fas fa-plus-square" /> Bet </div>
              </div>
              <img className="image" src={pair.img_url} />
            </div>
          );
        return(
            <div className="one-pair">
               
                <div className="name margin-bottom">{pair.name}</div>
                <div className="description margin-bottom">{pair.description}</div>
           
                <img className="image" src={pair.img_url}/>

                <div className="history-text"> Istoricul perechii:</div>
                {pair.history.map((obj, index)=>{

                    return (
                        <div className="pair-history">
                            <div className="date margin-bottom">{index+1}. Data si ora cursei: {new Date(obj.timestamp).toLocaleDateString('en-US')}</div>
                            <div className="host margin-bottom">{obj.host}</div>
                            <div className="place margin-bottom">Locul obtinut: {obj.place}</div>
                        </div>
                    );
                })}
                
            </div>
        );
    }
}