import React, {Component} from 'react';
import {Link} from 'react-router-dom';


export default class Register extends Component{
    
    constructor(props){
        super(props);
    }


    render(){
        return(

            <div className="login-page">
                <div className="login">
                    <div className="title">Worsie Register</div>
                    <div className="input">
                        <input type="text" name="username" id="username" tabIndex="1" className="form-control" placeholder="Username"/>
                    </div>
                    <div className="input">
                        <input type="password" name="password" id="password" tabIndex="2" className="form-control" placeholder="Password"/>
                    </div>
                    <div className="input">
                        <input type="password" name="password" id="password" tabIndex="2" className="form-control" placeholder="Password"/>
                    </div>
                    

                        <div className="login-button register-button">     
                                <Link className="" to='/login' >
                                
                                   <div className="btn"> Register</div>
                                    
                                </Link>
                        </div>
                    
                </div>
            </div>
        
        );
    }

}