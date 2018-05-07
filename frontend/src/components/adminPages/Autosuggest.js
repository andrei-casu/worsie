import React, { Component } from 'react';
import pairsName from './pairsName';


export default class Autosuggest extends Component {
    constructor(props) {
        super(props);

        
        
        this.state = {
            value: '',
            focused: true,
            error: true,
            errorText: '',
            name: props.name,
            suggestions: [],
            keyIndex: 0
        };
        this.onChange = this.onChange.bind(this);
        this.onFocus = this.onFocus.bind(this);
        this.onOptionClick = this.onOptionClick.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        // this.props.onChange(this.state);
    }

    onFocus(to) {
        return () => {
            const newState = {...this.state, focused: to};
            // this.props.onChange(newState);
            this.setState(newState);
        };
    }

    getSuggestions(value){

        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
      
        return inputLength <= 1 ? [] : pairsName.filter(pair =>
          pair.toLowerCase().slice(0, inputLength) === inputValue
        );
    }

    onOptionClick(value){

        const obj = this.state;
        obj.value = value;
        obj.error = false;
        obj.suggestions = [];
        // this.props.onChange(obj);
        this.setState(obj);
    }
    
    onChange(e) {

        const obj = this.state;
        let newValue = e.target.value;



        obj.value = newValue;
        obj.suggestions = this.getSuggestions(newValue);
        obj.error = true;

        // this.props.onChange(obj);
        this.setState(obj);
    }

    handleKeyPress(event){
        
        const { suggestions } = this.state;
        let {keyIndex} = this.state;
        const obj = this.state;

        if (suggestions.length === 0) return;

        
        if (event.key === "ArrowDown"){
            keyIndex++;
        }

        if (event.key === "ArrowUp"){

            if (keyIndex !== 0){
                keyIndex--;
            }
            else{
                keyIndex = suggestions.length - 1;
            }
        }

        if (keyIndex !== 0){
            keyIndex %=  suggestions.length;
        }

        if (event.key === "Enter"){
            event.preventDefault();
        
            obj.value = suggestions[keyIndex];
            obj.error = false;
            obj.focused = false;
            obj.suggestions = [];
            keyIndex = 0;

        }

        obj.keyIndex = keyIndex;
        // this.props.onChange(obj);
        this.setState(obj);
    }

    render() {
        
        const { className, name, placeholder, id } = this.props;
        const { value, suggestions, keyIndex } = this.state;

        
        return (

            <div>
                <input 
                    onFocus={this.onFocus(true)} 
                    onBlur={this.onFocus(false)} 
                    onChange={this.onChange} id={id} className={className} type="text" name={name} placeholder={placeholder} value={value}
                    onKeyDown={this.handleKeyPress} 
                    autoComplete="off"
                />
                <div className={`dropdown-content ${suggestions.length > 0 && "block"}`}>

                    {
                        suggestions.map((value, index)=>{
                            return(
                                <div className={`options ${keyIndex === index && "keyHover"}`} key={index}
                                 onClick={()=>{this.onOptionClick(value);}}>{value}</div>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}