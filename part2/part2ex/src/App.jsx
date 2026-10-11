import { useState } from "react"

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
const Persons = ({ persons }) => {
  return (<ul>
    {persons.map(person => (<li key={person.id}>{person.name} : {person.phone}</li>))}
  </ul>)
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState("")
  const [newPhone, setNewPhone] = useState("")
  const [shownByName, setShownByName] = useState("")

  const handleSubmitForm = (event) => {
    event.preventDefault()
    if (!newName || !newPhone) {
      return
    }

    if (persons.filter(person => person.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    const personObject = {
      id: persons.length + 1,
      name: newName,
      phone: newPhone
    }
    setPersons(persons.concat(personObject))
    setNewName("")
    setNewPhone("")
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
        onChangePhone={handlePhoneChange} />

      <h2>Numbers</h2>
      <Persons persons={showNumbers} />
    </div>
  )
}

export default App
