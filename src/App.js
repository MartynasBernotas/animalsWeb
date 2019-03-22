import React, { Component } from 'react';
import './App.css';
import Button from './Button';
import AnimalForm from './AnimalForm';
import 'tachyons';

class App extends Component {
  
	constructor(props) {
    super(props);
    this.state = {
    	welcome: true,
      guess: false,
    	animal: "none",
    	trait: "none",
      index: 0,
      checkedQuestions : [],
      newAnimal: false
    };
  }

  componentDidMount(){
      this.startingFetch();

  }

  startingFetch(){
    fetch("http://localhost:5555/api/animal/start/?index=0")
      .then(response => response.json())
      .then(result => {
          this.setState({trait: result});
          this.setState({index: this.state.index+1})
          var joined = this.state.checkedQuestions.concat(result);   
          this.setState({checkedQuestions: joined});
        });
  }


  noWelcome(){
  		this.setState({welcome:false});
  }

  toQuestions(){
    let one = 1;
    fetch("http://localhost:5555/api/animal/nono/?index=" + (+this.state.index*2 + +one))
    .then(response => response.json())
    .then(result => {
          this.setState({trait: result,
                        guess: false});
          this.IfNoAnimal(result); 
        });
  }

  Congragulations(animal){
      alert('Your animal is ' + animal + '! Press OK to try again!');
      this.setState({welcome: true,
      guess: false,
      animal: "none",
      trait: "none",
      index: 0,
      checkedQuestions : []});
      this.startingFetch();
  }

  Send(){
    let one = 1;
    fetch("http://localhost:5555/api/animal/yes/?index=" +(+this.state.index*2 + +one))
    .then(response => response.json())
    .then(result => {
          this.setState({animal: result, guess: true});
          this.setState({index: (+this.state.index*2 + +one)});
          this.IfNoAnimal(result);
        });
  }

  SendIfNo(){
    console.log(this.state.index*2);
    fetch("http://localhost:5555/api/animal/no/?index=" + this.state.index*2)
    .then(response => response.json())
    .then(result => {
          this.setState({trait: result});
          this.setState({index: this.state.index*2});
          this.IfNoAnimal(result);
        });
  }

  IfNoAnimal(string){
    if(string === "noanimal"){
      this.restartOrAdd();
    }
    this.state.checkedQuestions.forEach(trait => {
        if (string === trait){
          this.restartOrAdd();
        }});
        console.log(this.state.checkedQuestions);
        var joined = this.state.checkedQuestions.concat(string);   
        this.setState({checkedQuestions: joined});
  }

  restartOrAdd(){
      if (window.confirm("I don't know your animal! Do you want to add one?")) { 
        this.setState({newAnimal:true});
      }else{
          this.setState({welcome: true,
      guess: false,
      animal: "none",
      trait: "none",
      index: 0,
      checkedQuestions : []});
      this.startingFetch();
      }
  }

  render() {
    return (this.state.newAnimal ? <AnimalForm />
      :(this.state.welcome ? 
      (<div className = 'tc pa3 bg-transparent  b-dark-blue br3 shadow-5'>
        <h1 className='f1'>Welcome!</h1>
        <h2>Choose your animal and hit "Get Started!"</h2>
        <Button message={"Get Started!"} onClick={() => this.noWelcome()} />
      </div>) 
      : (this.state.guess ? 
          (<div className='tc pa3 bg-transparent b-dark-blue br3 shadow-5'>
            <h2 className='f2'>Is your animal {this.state.animal}?</h2>
            <Button message={"Yes"} onClick={() => this.Congragulations(this.state.animal)} />
            <Button message={"No"} onClick={() => this.toQuestions()} />
          </div>)
      : 
        (<div className='tc pa3 bg-transparent b-dark-blue br3 shadow-5'>
    	     <h2>Does your animal {this.state.trait}?</h2>
           <Button message={"Yes"} onClick={() => this.Send()} />
           <Button message={"No"} onClick={() => this.SendIfNo()} />
        </div>))
      ))
 
    
  }
}

export default App;
