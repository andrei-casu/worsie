import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Autosuggest from './Autosuggest';


export default class AddRaces extends Component {

    constructor(props) {
        super(props);

    }


    render() {        

        return (
            <div className="add-races-wrapper">
                <div className="add-races">
                    <div className="races">
                        <div className="title"> Adauga o cursa</div>

                        <div className="input">
                            <div className="text">Titlu cursa</div>
                            <input className="form-control" placeholder="Titlu cursa" />
                        </div>

                        <div className="input">
                            <div className="text">Descriere cursa</div>
                            <textarea className="form-control" placeholder="Descriere cursa" />
                        </div>

                        <div className="input">
                            <div className="text">Descriere pariu</div>
                            <textarea className="form-control" placeholder="Descriere pariu" />
                        </div>
                        <div className="input">
                            <div className="text">Data si ora</div>
                            <input className="form-control" placeholder="dd/ll/aaaa" />
                        </div>
                        <div className="input">
                            
                            <input className="form-control" placeholder="hh:mm" />
                        </div>

                    </div>
                    <div className="pairs">

                        <div className="title"> Adauga  perechile</div>
                        <div className="input">
                            <div className="text">Perechea 1</div>
                            <div className="input-display">
                                <Autosuggest className="form-control" placeholder="Numele perechii" />
                                <input className="form-control-odd" placeholder="Cota" />
                            </div>
                        </div>

                        <div className="input">
                            <div className="text">Perechea 2</div>

                            <input className="form-control" placeholder="Numele perechii" />
                            <input className="form-control-odd" placeholder="Cota" />
                        </div>
                        <div className="input">
                            <div className="text">Perechea 3</div>

                            <input className="form-control" placeholder="Numele perechii" />
                            <input className="form-control-odd" placeholder="Cota" />
                        </div>
                        <div className="input">
                            <div className="text">Perechea 4</div>

                            <input className="form-control" placeholder="Numele perechii" />
                            <input className="form-control-odd" placeholder="Cota" />
                        </div>
                        <div className="input">
                            <div className="text">Perechea 5</div>

                            <input className="form-control" placeholder="Numele perechii" />
                            <input className="form-control-odd" placeholder="Cota" />
                        </div>
                    </div>
                </div>

                <div className="add-races-button">
                    <Link to="/admin/main" className="btn1" >
                      Adauga Cursa
                    </Link>
                    {/* {loading === false && success === false && <span className="input span">{message}</span>} */}
                </div>
            </div>
        );
    }
}