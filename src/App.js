import React, {useState, useEffect} from 'react';
import { 
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent } from '@material-ui/core';
import InfoBox from './components/InfoBox';
import Map from './components/Map';
import Table from './components/Table';
import {sortData} from "./utilities";
import LineGraph from './components/LineGraph';
import './css/main.css';

function App() {

  const [countries, setCountries] = useState([]); // This creates the default value to be an empty array due to the empty curly braces
  const [global, setCountry] = useState("global");
  const [countryInfo, setCountryInfo] = useState({}); // This creates the default value to be an empty object due to the empty curly braces
  const [tableData, setTableData] = useState([]); // This creates an empty object 

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    });

  }, []);

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

        const sortedData = sortData(data);
        setTableData(data);
        setCountries(countries);
      });
    }
    // call the function the gets the data for the countries
    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url = 
      countryCode === 'worldwide'
        ? "http://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    
    await fetch(url)
    .then(response => response.json())
    .then ((data) => {
      // 
      setCountry(countryCode);
      // This stores all the data from the country response
      setCountryInfo(data);
    });
  };

  return (
    <div className="app"> 
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 Tracker</h1>
          <FormControl className="app__dropdown"> 
            <Select variant = "outlined" onChange = {onCountryChange} value = {global} >
              <MenuItem value = "global">Global</MenuItem>
              {countries.map(country => (<MenuItem value = {country.value}>{country.name}</MenuItem>))} 
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">

          <InfoBox title="Coronavirus cases" 
          cases = {countryInfo.todayCases} 
          total = {countryInfo.cases} 
          />
          <InfoBox title="Recovered" 
          cases = {countryInfo.todayRecovered} 
          total = {countryInfo.recovered} 
          />
          <InfoBox title="Deaths" 
          cases = {countryInfo.todayDeaths} 
          total = {countryInfo.deaths} 
          /> 
        </div>
        <Map /> { /* This is the Map component */ }
      </div>
      <Card className="app__right">
        <CardContent>
          <h3> Live Cases by Country</h3>
          <Table countries ={tableData} />
          <h3> Total Cases by Country</h3>
          {/* Insert a linr graph*/}
        </CardContent>
      </Card>
      
    </div>
  );
}

export default App;