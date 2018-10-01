import React, { Component } from "react";
import "./App.css";

const apiUrl = "http://ctp-zip-api.herokuapp.com/zip/";

function City({ cities }) {
  if (!{ cities }.cities.length) {
    return <div>Not Found!!!!!</div>;
  } else
    return (
      <div>
        {cities.map((city, key) => (
          <div className="row justify-content-center" key={city.RecordNumber}>
            <div className="card col-lg-4 col-md-4">
              <div className="card-header">{city.LocationText}</div>
              <ul>
                <li>State: {city.State}</li>
                <li>
                  Location: ({city.Lat}, {city.Long})
                </li>
                <li>Population: {city.EstimatedPopulation}</li>
                <li>Total Wages: {city.TotalWages}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    );
}

function ZipSearchFeild(props) {
  return (
    <div>
      <label>
        <strong>Zip Code:</strong>
      </label>
      <input
        type="text"
        maxLength="5"
        placeholder="Enter zip code"
        onChange={props.updateTarget}
      />
    </div>
  );
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cities: [],
      zipCode: ""
    };
  }

  api() {
    fetch(apiUrl + this.state.zipCode)
      .then(response => {
        if (response.status !== 404) return response.json();
        else throw new Error("NOT FOUND!!!!!!");
      })
      .then(data =>
        this.setState({
          cities: data
        })
      )
      .then(() => console.log(this.state))
      .catch(err => {
        console.log(err);
      });
  }

  updateZip(event) {
    this.setState({ zipCode: event.target.value }, () => {
      if (this.state.zipCode.length === 5) this.api();
      if (this.state.cities) this.setState({ cities: [] });
      console.log(this.state.zipCode);
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Zip Code Search</h1>
        </div>
        <ZipSearchFeild updateTarget={event => this.updateZip(event)} />
        <City cities={this.state.cities} zipCode={this.state.zipCode} />
      </div>
    );
  }
}

//test
export default App;
