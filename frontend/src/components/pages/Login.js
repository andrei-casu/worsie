import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Wrapper from '../Wrapper';


 class Login extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            username: "",
            password: ""
        };

        this.inputChange = this.inputChange.bind(this);
        this.loginClick = this.loginClick.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.login.success === true){
            this.props.history.push("/events/main");
        }
    }

     loginClick(){
        this.props.startLogin(this.state);
     }

     inputChange(id) {
        
        return (event) => {

            const newState = this.state;
            newState[id] = event.target.value;
            this.setState(newState);       
        };
            // console.log(id, event.target.value);
    }


    render(){

        const {username, password} = this.state;

        return(

            <div className="login-page">
                <div className="login">
                    <div className="title">Worsie Login</div>
                    <div className="input">
                        <input type="text"  className="form-control" placeholder="Username" value={username} onChange={this.inputChange("username")} />
                    </div>
                    <div className="input">
                        <input type="password"  className="form-control" placeholder="Password" value={password} onChange={this.inputChange("password")} />
                    </div>
                    <div>
                        <div className="checkbox">
                            <input id="checkbox1" type="checkbox" name="remember"/>
                            <label htmlFor="checkbox1">Remember Me</label>   
                        </div>

                        <div className="login-button">     
                                
                            <div className="btn"  onClick={this.loginClick}> Log in</div>
                               
                        </div>
                        <div className="login-button">     
                                <Link  to="/register" >
                                
                                    <div className="btn"> Register</div>
                                    
                                </Link>
                        </div>
                    </div>
                </div>
            </div>
        
        );
    }

}


export default class extends Component {
  render() {
    return (
      <Wrapper type={this.props.match.params.type}>
        <Login history={this.props.history}/>
      </Wrapper>
    );
  }
}