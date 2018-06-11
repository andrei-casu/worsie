import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class PairItem extends Component{
    
    constructor(props){
        super(props);
        this.onShowBet = this.onShowBet.bind(this);

        this.state = {
            showBetInput: false,
            index: undefined,
            inputVal: "",
            amountError: false,
            inputError: false,
            betAdded: false,
            timeExpired: false
        };

        this.getPairInfo = this.getPairInfo.bind(this);
        this.inputChange = this.inputChange.bind(this);
    }


    componentDidMount(){

        if (this.props.type === "short"){
            this.getPairInfo();
        }
    }

    onShowBet(to, place) {
        return () => {
            
            if (place === true){
                this.setState({
                    showBetInput: !this.state.showBetInput
                });
                return;
            }
            

            const {inputError, inputVal} = this.state;

            if (inputError === false && inputVal > this.props.userCredit ){

                this.setState({amountError: true});
                return;
            }

            if (inputVal.length !== 0 && to === false && inputError === false){
                if (this.props.event_timestamp < new Date().getTime()){
                    this.setState({timeExpired: true});
                    return;
                }
                this.props.sendBet({
                    "bet":{ 
                        "event_id": this.props.event_id,
                        "pair_id" : this.props.pair,
                        "amount" : parseInt(inputVal)
                    }
                });
            }

            if (inputError === true){
                return;
            }

            this.setState({
                showBetInput: to,
                betAdded: !to
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

        if ((/^\d+$/).test(val) === true){
            this.setState({inputVal: val, amountError: false, inputError: false, betAdded: false});
        }
        else{
            this.setState({inputError: true});   
        }
    }

    render(){
        const {pair, odd, type, hideBet, pairs, page_type, place} = this.props;
        const {showBetInput, index, amountError, betAdded, inputVal, timeExpired} = this.state;


        if (pair === undefined || (index === undefined && type === "short")) return null;
    
        if (type === 'short')
          return (
            <div className="pair">
              <div className="pair-info">
                <Link to={`/pair/${pair}`}><div className="name margin-bottom">{pairs[index].name}</div></Link>
                <div className="description margin-bottom">{pairs[index].description}</div>
                <div className="odd margin-bottom">Cota: {odd}</div>
                {betAdded === true && <div className="bet-added"> Pariu adaugat! Castig potential: {(odd * inputVal).toFixed(2)} lei</div>}
                {page_type === "finished" && <div className="odd margin-bottom">Loc obtinut: {place}</div>}

                {page_type !== "finished" && hideBet !== true &&
                    
                    <div onClick={this.onShowBet(true, true)} className="bet"><i className="fas fa-plus-square bet-button" /> Bet </div>
                }
                    {
                        page_type !== "finished" && showBetInput === true &&   
                        <div className="bet-input">
                            <div className="input"><input onChange={this.inputChange} className="form-control" type="text" placeholder="MONEY"/></div>
                            {amountError === true && <div className="amount-error"> Eroare! Creditul tau: {this.props.userCredit}</div>}
                            {timeExpired === true && <div className="amount-error"> Eroare! Cursa a inceput!</div>}
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
           
                <img className="image" />

                <div className="history-text"> Istoricul perechii:</div>
                {pair.history.map((obj, index)=>{

                    if (index > 29) return;
                    return (
                        <div key={index} className="pair-history">
                            <div className="date margin-bottom">{index+1}. Data si ora cursei: {new Date(obj.timestamp).toLocaleString('en-US')}</div>
                            <div className="host margin-bottom">{obj.host}</div>
                            <div className="place margin-bottom">Locul obtinut: {obj.place}</div>
                        </div>
                    );
                })}
                
            </div>
        );
    }
}