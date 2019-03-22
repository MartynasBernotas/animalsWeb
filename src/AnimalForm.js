import React, { Component } from 'react';
import 'tachyons';

class AnimalForm extends Component{
	constructor() {
    super();
    this.state = {
    	animal: {Id:0, Animal1:'', hasFur:null, idBird:null, eatsFruit:null, huntsRabbit:null,},
    	on: 'on'
    }
    this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(event) {
    	event.preventDefault();
    	const data = new FormData(event.target);
    	var temp = {Id:0,
    				Animal1:data.get('Animal1'),
    				hasFur:(data.get('hasFur') === this.state.on),
    				isBird:(data.get('isBird') === this.state.on),
    				eatsFruit:(data.get('eatsFruit') === this.state.on),
    				huntsRabbit:(data.get('huntsRabbit') === this.state.on)};
    	console.log(temp);
    	fetch('http://localhost:5555/api/animal/add', {
    		headers: {
      			'Accept': 'application/json',
      			'Content-Type': 'application/json'
    		},
     		method: 'POST',
      		body: JSON.stringify(temp),
    	})
    	.then(response => response.json())
      	.then(result => console.log(result));
	}
	render(){
		return (
		<div className='tc'>
	      <form className='pa4 black-80' onSubmit={this.handleSubmit}>
	        <label className='f6 b db mb2' htmlFor="animalName">
	          Animal:
	          <input type="text" id="Animal1" name="Animal1"/>
	        </label>
	        <label className='f6 b db mb2'>
	          Has Fur?:
	          <input type="checkbox" id="hasFur" name="hasFur"/>
	        </label>
	        <label className='f6 b db mb2'>
	          Is Bird?:
	          <input type="checkbox"/>
	        </label>
	        <label className='f6 b db mb2'>
	          Eats fruits?:
	          <input type="checkbox"/>
	        </label>
	        <label className='f6 b db mb2'>
	          Hunts Rabbits?:
	          <input type="checkbox"/>
	        </label>
	        <input type="submit" value="Send" />
	      </form>
	      </div>
	    );
	}
}

export default AnimalForm;