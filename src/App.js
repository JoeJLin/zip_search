import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


const apiUrl = "http://ctp-zip-api.herokuapp.com/zip/";

function City(props){
  return (
    <div></div>
  );
}

function ZipSearchFeild(props){

  return (
    <div>
      <input type="text" placeHolder="Enter zip code" />
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cities: [],
      zipCode: "",
    };
  }

  componentDidMount() {
    fetch(apiUrl + "10002")
      .then(response => response.json())
      .then(data => this.setState({cities: data}))
  }

  updateZip(event){
    this.setState({zipCode: event.target.value})
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchFeild zipCode={this.state.zipCode} onChange={this.updateZip} />
        <ul>
          {this.state.zipCode}
          {this.state.cities.map(city => <li>{city.RecordNumber}</li>)}
        </ul>
      </div>
    );
  }
}

export default App;
