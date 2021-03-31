import React, {useState, useEffect} from 'react';
import { 
  FormControl,
  Select,
  MenuItem } from '@material-ui/core';
import InfoBox from './InfoBox';
import './css/main.css';

function App() {

  const [countries, setCountries] = useState([]);
  const [global, setCountry] = useState("global");
  // USEEFFECT runs a piece of code based on a given condition. It kind of reminds me of the while loop 
  useEffect(() => {

    const getCountriesData = async () => {
      // create an async/await function that fetches the data for the UI
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
          name: country.country, // this provides the country
          value: country.countryInfo.iso2, // this provides the country ISO - an abbreviation of the country 
        }));
        setCountries(countries);
      });
    }
    // call the function the gets the data for the countries
    getCountriesData();
  }, []);

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
  }

  return (
    <div className="app">
      {/* Header*/}
      <div className="app__header">
        <h1>COVID-19 Tracker</h1>
        <FormControl> 
          <Select variant = "outlined" onChange = {onCountryChange} value = {global}>
          <MenuItem value = "global">Global</MenuItem>
          {countries.map(country => (<MenuItem value = {country.value}>{country.name}</MenuItem>))} 
          </Select>
        </FormControl>
      </div>

      <div className="app__stats">
        <InfoBox title="Coronavirus cases" cases = {1234} total = {2000} />
        <InfoBox title="Recovered" cases = {1234} total = {5000} />
        <InfoBox title="Deaths" cases = {1234} total = {3000} />

      </div>
      {/* InfoBoxs */}
      
      {/* InfoBoxs */}
      {/* InfoBoxs */}
      
      {/* Table */}
      {/* Graphs */}

      {/* Maps */}
    </div>
  );
}

export default App;