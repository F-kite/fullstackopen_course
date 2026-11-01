import { useState, useEffect } from 'react'
import Searchinput from "./components/SearchInput"
import CountryCard from "./components/CountryCard"
import CountryService from "./service/country"
import "./App.css"

function App() {
  const [query, setQuery] = useState("")
  const [countries, setCountries] = useState([])
  const [countryData, setCountryData] = useState({})


  useEffect(() => {
    CountryService.getAllCountries()
      .then(countries => setCountries(
        countries.map(country => country.name.common)
      ))

  }, [])

  const queryHandler = (event) => {
    event.preventDefault()
    setQuery(event.target.value)
  }


  const queryResult = query ? countries.filter(cn => cn.toLowerCase().includes(query.toLowerCase())) : []

  if (query && queryResult.length == 1) {
    CountryService.getCountyByName(queryResult[0].toLowerCase()).then(data =>
      setCountryData({
        countryName: data.name.common,
        capital: data.capital,
        area: data.area,
        languages: data.languages,
        temperature: "",
        wind: "",
        flag: {
          alt: data.flags.alt,
          svg: data.flags.svg
        }
      })
    )
    setQuery("")
  }

  return (
    <div>
      <Searchinput query={query} onChangeHandler={queryHandler} />
      {countries.length == 0 ? <div>Countries are loading...</div> : null}
      {query ?
        <div>
          <h3>results</h3>
          {(queryResult.length == 0) ? (<p>Country not found</p>) :
            queryResult.length > 10 ? (<p>Too many matches, specify another filter</p>) :
              queryResult.map((nameCountry, id) => (
                <div className='searchResult'>
                  <p key={id}>{nameCountry}</p>
                  <button onClick={() => setQuery(nameCountry)}>Show</button>
                </div>
              )
              )
          }
        </div> :
        null}
      {Object.keys(countryData).length !== 0 && <CountryCard data={countryData} />}

    </div>
  )
}
export default App
