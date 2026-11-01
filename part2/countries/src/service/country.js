import axios from "axios"

const baseURl = "https://studies.cs.helsinki.fi/restcountries/api"

const getAllCountries = () => {
    return axios.get(`${baseURl}/all`).then(response => response.data)
}

const getCountyByName = (name) => {
    return axios.get(`${baseURl}/name/${name}`).then(response => response.data)
}


export default { getAllCountries, getCountyByName }