import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class AddPairs extends Component{

    constructor(props){
        super(props);
    
    }
    
    render(){
        
        return (
            <div className="add-races-wrapper">
                <div className="add-races">

                    <div className="races">
                        <div className="title"> Adauga o pereche</div>

                        <div className="input">
                            <div className="text">Nume pereche</div>
                            <input className="form-control" placeholder="Nume pereche" />
                        </div>

                        <div className="input">
                            <div className="text">Descriere scurta</div>
                            <textarea className="form-control" placeholder="Descriere scurta" />
                        </div>

                        <div className="input">
                            <div className="text">Descriere generala</div>
                            <textarea className="form-control" placeholder="Descriere generala" />
                        </div>
                    </div>
                    
                </div>

                <div className="add-races-button">
                    <Link to="/admin/main" className="btn1" >
                      Adauga Pereche
                    </Link>
                    {/* {loading === false && success === false && <span className="input span">{message}</span>} */}
                </div>
            </div>
        );
    }
}