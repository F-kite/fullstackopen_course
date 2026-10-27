import { useState, useEffect } from "react"
import personService from "../services/person"

const Filter = ({ shownByName, onChange }) => {
  return (
    <div>filter shown with
      <input value={shownByName} onChange={onChange} />
    </div>
  )
}
const PersonForm = ({ onSubmit, newName, onChangeName, newPhone, onChangePhone }) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          name : <input value={newName} onChange={onChangeName} />
        </div>
        <div>
          phone : <input value={newPhone} onChange={onChangePhone} />
        </div>
        <div>
          <button type="submit">add contact</button>
        </div>
      </form></>
  )
}
const Persons = ({ persons, deletePerson }) => {
  return (<ul>
    {persons.map(person => (<li key={person.id}>{person.name} : {person.phone} <button onClick={() => deletePerson(person.id)}>delete</button></li>))}
  </ul>)
}




const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newPhone, setNewPhone] = useState("")
  const [shownByName, setShownByName] = useState("")

  useEffect(() => {
    personService
      .getAll()
      .then(
        persons => setPersons(persons)
      )
  }, [])

  const handleSubmitForm = (event) => {
    event.preventDefault()
    if (!newName || !newPhone) {
      return
    }

    const person = persons.find(person => person.name === newName)

    if (person) {
      const confirmed = confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (confirmed) {
        const newPerson = { ...person, phone: newPhone }
        personService
          .updatePerson(person.id, newPerson)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id === returnedPerson.id ? returnedPerson : p))
          })
      }
      return
    }

    const personObject = {
      id: persons.length + 1,
      name: newName,
      phone: newPhone
    }

    personService
      .createPerson(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(personObject))
        setNewName("")
        setNewPhone("")
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }
  const handleShownByNameChange = (event) => {
    setShownByName(event.target.value)
  }

  const handleDeletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    const confirmed = confirm(`Are you want deleted ${person.name}?`)
    if (confirmed) {
      personService.deletePerson(id).then(_ => {
        setPersons(persons.filter(p => p.id !== id))
      })
    }

  }

  const showNumbers = shownByName ? persons.filter(person => person.name.toLowerCase().includes(shownByName.toLowerCase())) : persons

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter shownByName={shownByName} onChange={handleShownByNameChange} />
      <h2>Add new</h2>
      <PersonForm
        onSubmit={handleSubmitForm}
        newName={newName}
        onChangeName={handleNameChange}
        newPhone={newPhone}
        onChangePhone={handlePhoneChange}
      />

      <h2>Numbers</h2>
      <Persons persons={showNumbers} deletePerson={handleDeletePerson} />
    </div>
  )
}

export default App
