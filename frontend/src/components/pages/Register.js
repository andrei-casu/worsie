import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import Wrapper from '../Wrapper';
import loader from '../../images/orange_circles.gif';


class Register extends Component{
    
    constructor(props){
        super(props);

        this.state = {
            username: {
                string: "",
                status: false,
                msg: ""
            },
            email: {
                string: "",
                status: false,
                msg: ""
            },
            password: {
                string: "",
                status: false,
                msg: ""
            },
            cPassword: {
                string: "",
                status: false,
                msg: ""
            },
            allValid: true
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

        if (this.checkAllValid() === false){

            this.setState({allValid: false});
            return;
        }


        let obj = {
            "name": this.state.username.string,
            "mail": this.state.email.string,
            "password": this.state.password.string
        };
        
        this.props.startRegister(obj);
    }

    checkUsername(string){

        if (string.length > 2) return null;
        return "Username prea scurt!";
    }

    checkEmail(string){

        if (string.length === 0){
            return null;
        }

        if (string.indexOf('@') === -1 || string.indexOf('.') === -1 ){
            return  "Adresa de email incorecta!";
        }
        
        if (string[string.length-1] === '.' || string[0] === '@' || string[0] === '.'){
            return  "Adresa de email incorecta!";
        }

        let pos = string.indexOf('@');
        for (let index = pos; index < string.length; index++){
            if (string[index] == '.')
            return null;
        }
        return  "Adresa de email incorecta!";
    }


    checkPassword(string){

        if (string.length === 0){
            return "not ready";
        }

        if ( (/[a-z]/.test(string)) === false ){
            return "Parola trebuie sa aiba macar o litera mica!";
        }
        
        if ( (/[A-Z]/.test(string)) === false){
            return "Parola trebuie sa aiba macar o litera mare!";

        } 
        if (/[0-9]/.test(string) === false){
            return "Parola trebuie sa aiba macar o cifra!";
        }
        if (string.length < 6){
            return "Parola trebuie sa aiba minim 6 caractere!";
        }
        return null;
    }

    checkConfirmPassword(string){


        const { password } = this.state;

        if (string.length < password.string.length || password.string.length === 0) return "Parolele nu se potrivesc!";
        if (string === password.string){
            return null;
        }
        return "Parolele nu se potrivesc!";
    }

    checkAll(id, string){

        switch(id){
            case 'username': return this.checkUsername(string);
            case 'email' :  return this.checkEmail(string);
            case 'password' : return this.checkPassword(string);
            case 'cPassword' : return this.checkConfirmPassword(string);
        }
    }


    inputChange(id) {
        
        return (event) => {

            const newState = this.state;
            
            const res = this.checkAll(id, event.target.value);
            if (res === "not ready"){
                newState[id] = {string: event.target.value, status: false, msg: ""};
            }else
            if (res === null){
                newState[id] = {string: event.target.value, status: true, msg: ""};
            }
            else{
             newState[id] = {string: event.target.value, status: false, msg: res};
            }

            newState.allValid = true;

            if (id === "password" && this.state.cPassword.string.length > 0){
                const res1 = this.checkConfirmPassword(this.state.cPassword.string);
                
                if (res1 === null){
                    newState.cPassword.status =  true;
                }
                else{
                 newState.cPassword.status = false;
                 newState.cPassword.msg = res1;
                }
            }

            this.setState(newState);       
        };
    }


     checkAllValid(){

        const {username, password, email, cPassword} = this.state;

        if (username.status === true && email.status === true && password.status === true && cPassword.status === true)
            return true;
        return false;
     }

    render(){

        const { username, password, email, cPassword, allValid } = this.state;
        const { loading, success, message} = this.props.register;
        
        // console.log(this.state);

        return(

            <div className="login-page">
                <div className="login">
                    <div className="title">Worsie Register</div>
                    <div className="input">
                        <input type="text" className="form-control" placeholder="Username" value={username.string} onChange={this.inputChange("username")}/>
                        {username.status == false && <span className="input span">{username.msg}</span>}
                    </div>
                    <div className="input">
                        <input type="text" className="form-control" placeholder="Email" value={email.string} onChange={this.inputChange("email")}/>
                        {email.status == false && <span className="input span">{email.msg}</span>}
                    </div>
                    <div className="input">
                        <input type="password" className="form-control" placeholder="Password" value={password.string} onChange={this.inputChange("password")}/>
                        {password.status === false && <span className="input span">{password.msg}</span>}
                    </div>
                    <div className="input">
                        <input type="password" className="form-control" placeholder="Confirm Password" value={cPassword.string} onChange={this.inputChange("cPassword")}/>
                        {cPassword.status === false && <span className="input span">{cPassword.msg}</span>}
                    </div>


                        <div className="login-button register-button">     
                            <div className="btn register" onClick={this.registerClick}> Register</div>
                            {allValid === false && <span className="input span">Verifica toate campurile</span>}
                            {loading === false && success === false && <span className="input span">{message}</span>}
                        </div>

                </div>

                {loading=== true && <div className="backdrop"><img className="loader" src={loader}/></div>}
                
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