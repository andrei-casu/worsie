import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import Wrapper from '../Wrapper';


class Register extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            username: "",
            email: "",
            password: "",
            cPassword: ""
        };

        this.inputChange = this.inputChange.bind(this);
        this.registerClick = this.registerClick.bind(this);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.register.success === true){
            this.props.history.push("/login");
        }
    }

    registerClick(){

        let obj = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password
        };
        
        this.props.startRegister(obj);
    }

    inputChange(id) {
        
        return (event) => {

            const newState = this.state;
            newState[id] = event.target.value;
            this.setState(newState);       
        };
    }

    render(){

        const {name, password, email, cPassword} = this.state;
        
        return(

            <div className="login-page">
                <div className="login">
                    <div className="title">Worsie Register</div>
                    <div className="input">
                        <input type="text" className="form-control" placeholder="Username" value={name} onChange={this.inputChange("username")}/>
                    </div>
                    <div className="input">
                        <input type="text" className="form-control" placeholder="Email" value={email} onChange={this.inputChange("email")}/>
                    </div>
                    <div className="input">
                        <input type="password" className="form-control" placeholder="Password" value={password} onChange={this.inputChange("password")}/>
                    </div>
                    <div className="input">
                        <input type="cPassword" className="form-control" placeholder="Confirm Password" value={cPassword} onChange={this.inputChange("cPassword")}/>
                    </div>


                        <div className="login-button register-button">     
                            <div className="btn register" onClick={this.registerClick}> Register</div>
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
        <Register history={this.props.history}/>
      </Wrapper>
    );
  }
}