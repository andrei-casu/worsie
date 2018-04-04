import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class PairItem extends Component{
    
    constructor(props){
        super(props);
        this.onShowBet = this.onShowBet.bind(this);

        this.state = {
            showBetInput: false
        };
    }

    onShowBet(to) {
        return () => {
            this.setState({
                showBetInput: to
            });
        };
    }


    render(){
        const {pair, odd, type} = this.props;
        const {showBetInput} = this.state;
        if (pair === undefined) return null;

        if (type === 'short')
          return (
            <div className="pair">
              <div className="pair-info">
                <Link to={`/pair/${pair.id}`}><div className="name margin-bottom">{pair.name}</div></Link>
                <div className="description margin-bottom">{pair.description}</div>
                <div className="odd margin-bottom">Cota: {odd}</div>
                <div onClick={this.onShowBet(true)} className="bet"><i className="fas fa-plus-square" /> Bet </div>
                {
                    showBetInput === true &&   
                    <div className="bet-input">
                        <div className="input"><input className="form-control" type="text" placeholder="MONEY"/></div>
                        <div onClick={this.onShowBet(false)} className="btn">Continue</div>
                    </div>
                }
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
                        <div key={index} className="pair-history">
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