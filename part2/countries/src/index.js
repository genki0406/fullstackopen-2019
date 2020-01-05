import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';

const Country = ({country}) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>populaton {country.populaton}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map((l, i) => <li key={i}>{l.name}</li>)}
      </ul>
      <img src={country.flag} alt=''/>
    </div>
  )
}

const Countries = ({countries, searchCountryString}) => {
  const [showCountry, setShowCountry] = useState({})

  const includeSearchCountryString = (country) => country.name.toLowerCase().includes(searchCountryString.toLowerCase())
  const filterd = countries.filter(includeSearchCountryString)

  const rows = () => filterd.map((country, index) => (
    <div>
      <p key={index}>
        {country.name} {country.translations.ja}
        <button onClick={() => setShowCountry(country)}>show</button>
      </p>
    </div>
  ))

  if (filterd.length > 1 && filterd.length <= 10){
    return (
      <div>
        {rows()}
        {Object.keys(showCountry).length !== 0 ? <Country country={showCountry}/> : ''}
      </div>
    )
  }

  if (filterd.length === 1){
    const country = filterd[0]
    return (
      <div>
        <Country country={country} />
      </div>
    )
  }

  return (
    <p>Too many matches, specify filter</p>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchCountryString, setSearchCountryString] = useState('')

  const handleSearchCountryString = (event) => setSearchCountryString(event.target.value)

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      find countries <input value={searchCountryString} onChange={handleSearchCountryString}/>
      <Countries countries={countries} searchCountryString={searchCountryString}/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
