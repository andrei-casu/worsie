import React, { Component } from 'react';

export default class NextRaces extends Component{

	constructor(props){
		super(props);

		this.state = {
			updateClick : false,
			indexUpdate: undefined,
			newOdd: undefined
		};
		this.updateClick = this.updateClick.bind(this);
		this.updateOdd = this.updateOdd.bind(this);
		this.oddInput = this.oddInput.bind(this);
	}

	oddInput(e){

		this.setState({newOdd: e.target.value});

	}

	updateOdd(eventIndex, pairIndex){

		//API UPDATE CALL HERE
		this.props.events[eventIndex].pairs[pairIndex].odd = this.state.newOdd;
		this.setState({updateClick: false});

	}

	updateClick(index){
		this.setState({updateClick: true, indexUpdate: index});
	}

	render(){

		const {events} = this.props;
		const {updateClick, indexUpdate} = this.state;
		

		let event = events[0];
		

		if (events.length === 0 ) return null;

        return (

            
              <div>

              <div  className="event admin">
                <div className={`title margin-bottom active`}>{event.name}</div>
                    <div className={`event-info active`}>
                        <div className="sub-title margin-bottom">{event.bet_description}</div>
                        <div className="date margin-bottom">Data si ora cursei: {new Date(event.timestamp).toLocaleDateString('en-US')}</div>
                    </div>
                    <div className="participants margin-bottom">

					<table>
					    <thead>
					        <tr>
					            <th>Pereche</th>
					            {	
					            	event.pairs.map((pair, index) => {
					            	
					            		return (<td key={index}>{(pair.pair.name)}</td>);
					            	})
					        	}
					        </tr>
					    </thead>
					    <tbody>
					    	<tr>
					            <th>Id pereche</th>
					            {	
					            	event.pairs.map((pair, index) => {
					            	
					            		return (<td key={index}>{pair.pair.id}</td>);
					            	})
					        	}
					        </tr>
					        <tr>
					            <th>Cota</th>
					            {	
					            	event.pairs.map((pair, index) => {
					            		
					            		
					            			if (updateClick === true && index === indexUpdate)
					            				return (
					            					<td className="odd margin-bottom" key={index}>
					            						<input onChange={this.oddInput} className="update-input" placeholder={pair.odd}/>
					            						<i onClick={()=>{this.updateOdd(0, index);}} className="fas fa-pen-square update-button"/>
					            					</td>
					            				);
					            			else
					            				return (<td className="odd margin-bottom" key={index}>{pair.odd}</td>);
					            		
					            	})
					        	}
					        </tr>
					        <tr>
					            <th>Update Cota</th>
					           {	
					            	event.pairs.map((pair, index) => {
					            	
					            		return (<td key={index} onClick={()=>{this.updateClick(index);}}><i className="fas fa-pen-square update-button-open"/></td>);
					            	})
					        	}
					        </tr>
					    </tbody>
					</table>

                
                    
                    </div>
                </div>

				
              	
              </div>
          
        );

	}
}