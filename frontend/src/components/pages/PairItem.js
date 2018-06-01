import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class PairItem extends Component{
    
    constructor(props){
        super(props);
        this.onShowBet = this.onShowBet.bind(this);

        this.state = {
            showBetInput: false,
            index: undefined,
            inputVal: ""
        };

        this.getPairInfo = this.getPairInfo.bind(this);
        this.inputChange = this.inputChange.bind(this);
    }


    componentDidMount(){
        this.getPairInfo();
    }

    onShowBet(to) {
        return () => {

    
            if (this.state.inputVal.length !== 0){
                this.props.sendBet({"bet":{ 
                    "event_id": this.props.event_id,
                    "pair_id" : this.props.pair,
                    "amount" : parseInt(this.state.inputVal)
                }});
            }
            this.setState({
                showBetInput: to
            });
        };
    }

    getPairInfo(){
        const {pairs, pair} = this.props;

        for(let index in pairs){
            if (pairs[index]._id === pair){
                this.setState({index: index});
                return;
            }
        }
    }


    inputChange(e){
        const val = e.target.value;

        this.setState({inputVal: val});
    }
    render(){
        const {pair, odd, type, hideBet, pairs} = this.props;
        const {showBetInput, index} = this.state;

        if (pair === undefined || index === undefined) return null;

        
        if (type === 'short')
          return (
            <div className="pair">
              <div className="pair-info">
                <Link to={`/pair/${pair}`}><div className="name margin-bottom">{pairs[index].name}</div></Link>
                <div className="description margin-bottom">{pairs[index].description}</div>
                <div className="odd margin-bottom">Cota: {odd}</div>

                {hideBet !== true &&
                    
                    <div onClick={this.onShowBet(true)} className="bet"><i className="fas fa-plus-square bet-button" /> Bet </div>
                }
                    {
                        showBetInput === true &&   
                        <div className="bet-input">
                            <div className="input"><input onChange={this.inputChange} className="form-control" type="text" placeholder="MONEY"/></div>
                            <div onClick={this.onShowBet(false)} className="btn">Continue</div>
                        </div>
                    }
                </div>
                
              <img className="image" src={"https://cdn.techinasia.com/wp-content/uploads/2013/06/jockey-horse-5901.png"} />
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