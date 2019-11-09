import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props){
    super(props);
    // A state eltárol a komponensen belűl értékeket, ha frissül, akkr az oldal újra töltődik
    this.state = {
      number: 0,
      showMap: false
    }
    

    // Itt rögzítjük a függvényeket, amiket a komponens tartalmaz
    // Létrehozza a resetNumber függvényt, ami el tudja érni az osztályt a this kulcsszóval a blokkjában
    this.resetNumber = this.resetNumber.bind(this);
    this.increment = this.increment.bind(this);
    this.decreaseByOne = this.decreaseByOne.bind(this);
    this.funkyFunctionName = this.switchShowMap.bind(this);
  }

  resetNumber(){
    // A setState -el változtatujuk az adott komponens state-jét
    // Egy objektumot adunk át neki, amiben benne van, hogy minek mire kell megváltoznia
    this.setState({number:0})
  }

  increment(num){
    let newNumber = this.state.number + num;
    this.setState({number: newNumber});
  }

  decreaseByOne(){
    let newNumber = this.state.number - 1;
    this.setState({number: newNumber});
  }

  switchShowMap(){
    this.setState({showMap: !this.state.showMap});
  }

  // Ez a függvény gyártja le nekünk a html-t
  render() {
    // Minden egyes renderelésnél ez le fog futni 
    let someClass = this.state.number % 2 == 0 ? "App-link" : "";
    let map = this.state.showMap ? <MapSyntax givenArray={[1,2,"Macska","Kutya"]}/> : "";

    // A return egy html objektuomt ad vissza
    return (
      <div>
        <header className="App-header">
          <div className={someClass}>
            <span>Jelenlegi értéke a number-nek:</span>
            <span>{this.state.number}</span>
          </div>
          <MyComponent resetFunction={this.resetNumber} givenNumber="3"/>

          <button onClick={this.decreaseByOne}>Csökkentés</button>
          {/* Amikor azt mondjuk, hogy this.decreaseByOne, akkor átadunk neki egy függvényt, amit meghív
            * Azonban, amikor paramétert is át akarunkadni a függvénynek, akkor kell a () => fgv(params), hogy függvény legyen, és ne egy 
            *   függvény hívásként értelmezze a jelöléset 
            */}
          <button onClick={() => this.increment(2)}>Növelés 2-vel</button>
          <button onClick={() => this.increment("I told you not to do that")}>Don't touch me</button>
          <button onClick={this.funkyFunctionName}>Show Map Function</button>
          {map}
        </header>
      </div>
    );
  }
}

export default App;

class MyComponent extends Component {
  // A constructor nem szükséges, de inkább írjuk ki
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div>
        {/* A this.props - al hívatkozunk arra, amit a a meghívásakor passzolunk át a komponensnek
          * Az ősében lévő state-et csak az által tudjuk változtatni a gyerekben, ha az ősebn megírt függvényt 
          * passzoljuk át a gyereknek és ő azt hívja meg
          */}
        <button onClick={this.props.resetFunction}>
          Reset Counter
        </button>
      </div>
    );
  }
}

class MapSyntax extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    return (
      <div>          
          {
            // Végigmegyünk a tömbön, és minden elem értékét felveszi az 'e' változó, az indexet pedig az 'index'
            // Majd minden egyes elem után visszaadunk egy <p> tagot, amivel kiírjunk, hogy mi az elem az adott indexen
            // A paragrafus key attribútuma azért kell, mert így tudja a react a különböző elemeket elválasztani egymástól, ez egydinek kell legyen 
            this.props.givenArray.map((e,index) => <p key={index}> {index}. elem:  {e} </p>)            
          }
      </div>
    );
  }
}
