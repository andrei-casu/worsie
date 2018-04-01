import React, {Component} from 'react';
import {Link} from 'react-router-dom';


export default class Login extends Component{
    
    constructor(props){
        super(props);
    }


    render(){
        return(

            <div className="login-page">
                <div className="login">
                    <div className="title">Worsie Login</div>
                    <div className="input">
                        <input type="text" name="username" id="username" tabIndex="1" className="form-control" placeholder="Username"/>
                    </div>
                    <div className="input">
                        <input type="password" name="password" id="password" tabIndex="2" className="form-control" placeholder="Password"/>
                    </div>
                    <div>
                        <div className="checkbox">
                            <input id="checkbox1" type="checkbox" name="remember"/>
                            <label htmlFor="checkbox1">Remember Me</label>   
                        </div>

                        <div className="login-button">     
                                <Link className="" to='/events/main' >
                                    <div className="btn"> Log in</div>
                                </Link>
                        </div>
                        <div className="login-button">     
                                <Link className="" to='/register' >
                                
                                    <div className="btn"> Register</div>
                                    
                                </Link>
                        </div>
                    </div>
                </div>
            </div>
        
        );
    }

}