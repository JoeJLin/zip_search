import React, { Component } from 'react';
import './App.css';


const apiUrl = "http://ctp-zip-api.herokuapp.com/zip/";

function City(props){
  return (
    <div className="">
      {props.cities.map((city, key) =>
      <div className="row justify-content-center" key={city.RecordNumber}>
        <div className="card col-lg-4 col-md-4">
          <div className="card-header" >
            {city.LocationText}
          </div>
          <ul>
            <li>State: {city.State}</li>
            <li>Location: ({city.Lat}, {city.Long})</li>
            <li>Population: {city.EstimatedPopulation}</li>
            <li>Total Wages: {city.TotalWages}</li>
          </ul>
        </div>
        </div>
    )}
    </div>
  );
}
      // <ul>
      //   {props.cities.map((city, key) => 
      //   <li key={key}>{city.City}</li>)}
      // </ul>

function ZipSearchFeild(props){
  // const update = (event) => {
  //   console.log(event.target.value)
  //   console.log(props)
  //   // props.updateTarget({update})
  //   // props.updateTarget({data: "event.target.value"})
  // }
  const handleChange = (event) => {
    props.updateTarget(event.target.value);
  }
  return (
    <div>
      <label><strong>Zip Code:</strong></label>
      <input type="text" maxLength="5" placeholder="Enter zip code" onChange={handleChange.bind(this)}/>
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
    this.updateZip = this.updateZip.bind(this)
  }

  // componentDidMount() {
  //   fetch(apiUrl + this.state.zipCode)
  //     .then(response => response.json())
  //     .then(data => this.setState({cities: data}))
  // }

  componentDidUpdate(){
    if (this.state.zipCode.length === 5 && this.state.cities === '') {
      this.api();
    } else {
      this.state.cities = [];
    }
  }

  api() {
    fetch(apiUrl + this.state.zipCode)
      .then((response) => {
        return response.json();
      })
      .then(data => this.setState({
        cities: data
      }))
      .then(() => console.log(this.state))
      .catch((err) => {
        console.log(err);
      })
  }

  updateZip(data){
    this.setState({zipCode: data}, function(){
      if(this.state.zipCode.length === 5){
        this.api();
      }
      console.log(this.state.zipCode)
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Zip Code Search</h1>
        </div>
        <ZipSearchFeild updateTarget={(response) => this.updateZip(response)} />
        {/* <ZipSearchFeild updateTarget={(response) => this.setState({zipCode: response})} /> */}
        <City cities={this.state.cities} zipCode={this.state.zipCode}/>
      </div>
    );
  }
}

export default App;
