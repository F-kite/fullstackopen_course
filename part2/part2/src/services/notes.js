import axios from "axios";
const baseURL = 'http://localhost:3001/notes'

const getAll = () => {
    return axios.get(baseURL).then(response => response.data)
}

const addNote = (noteObject) => {
    return axios.post(baseURL, noteObject).then(response => response.data)
}

const updNote = (id, newNoteObject) => {
    return axios.put(`${baseURL}/${id}`, newNoteObject).then(response => response.data)
}

export default {
    getAll: getAll,
    create: addNote,
    update: updNote
}