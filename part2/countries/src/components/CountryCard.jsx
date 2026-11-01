const CountryCard = ({ data }) => {
    return (
        <div>
            <h1>{data.countryName}</h1>
            <div>
                <p>Capital : {data.capital.join(", ")}</p>
                <p>Area : {data.area}</p>
            </div>
            <h2>Languages</h2>
            <div>
                <ul>
                    {Object.keys(data.languages) ? Object.keys(data.languages).map((lang, id) => <li key={id}>{data.languages[lang]}</li>) : "no data"}
                </ul>
            </div>
            <img src={data.flag.svg} alt={data.flag.alt} className="imgFlag" />
            {/* <h2>Weather in {data.capital}</h2>
            <div>
                <p>Temperature {data.temperature} Celsius</p>
                <img src="" alt="???" className="imgWeather" />
                <p>Wind {data.wind} m/s</p>
            </div> */}

        </div>
    )
}

export default CountryCard