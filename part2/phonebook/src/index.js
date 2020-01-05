import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import personService from './services/persons'
import './index.css'

const Alert = ({type, message}) => {
  if(message === null){
    return null
  }

  return (
    <div class={`alert ${type}`}>
      {message}
    </div>
  )
}

const Filter = ({searchName, handleSearchNameChange}) => (
  <div>
    filter shown with
    <input value={searchName} onChange={handleSearchNameChange} />
  </div>
)

const PersonForm = ({addNewPerson, newName, newNumber, handleNewNameChange, handleNewNumberChange}) => (
  <div>
    <form onSubmit={addNewPerson}>
      <div> name: <input value={newName} onChange={handleNewNameChange}/> </div>
      <div>number: <input value={newNumber} onChange={handleNewNumberChange}/></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </div>
)

const Persons = ({persons, searchName, deletePerson}) => {
  const includesSearchName = (person) => person.name.toLowerCase().includes(searchName.toLowerCase())
  const rows = () =>
    persons.filter(includesSearchName).map((person, index) => (
      <p key={index}>
        {person.name} {person.number}
        <button onClick={() => deletePerson(person)}>delete</button>
      </p>
    ))

  return (
    <div>
      {rows()}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [infoMessage, setInfoMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const handleNewNameChange = (event) =>
    setNewName(event.target.value)

  const handleNewNumberChange = (event) =>
    setNewNumber(event.target.value)

  const addNewPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }

    personService.getAll().then(allPersons => {
      const replacePerson = allPersons.find(person => person.name === newPerson.name)
      if(replacePerson){
        if(window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with one?`)){
          personService.update(replacePerson.id, newPerson).then(returnedPerson => {
            setPersons(persons.map(person => person.id === returnedPerson.id ? returnedPerson : person))
          })
        }
      }else{
        personService.create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
        })
      }
      setInfoMessage(`Added ${newName}`)
      setTimeout(() => setInfoMessage(null), 2000)
      setNewName('')
      setNewNumber('')
    })
  }

  const deletePerson = (deletePerson) => {
    if (window.confirm(`Delete ${deletePerson.name}?`)){
      personService.remove(deletePerson.id)
      .then( () => {
        setPersons(persons.filter(person => person.id !== deletePerson.id))
      })
      .catch(error => {
        setErrorMessage(`information of ${deletePerson.name} hash already benn removed from server`)
        setTimeout(() => setErrorMessage(null), 2000)
        setPersons(persons.filter(person => person.id !== deletePerson.id))
      })
    }
  }

  const handleSearchNameChange = (event) =>
    setSearchName(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Alert message={infoMessage} type='success' />
      <Alert message={errorMessage} type='error' />
      <Filter searchName={searchName} handleSearchNameChange={handleSearchNameChange} />
      <h2>add a new</h2>
      <PersonForm addNewPerson={addNewPerson} newName={newName} newNumber={newNumber} handleNewNameChange={handleNewNameChange} handleNewNumberChange={handleNewNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} searchName={searchName} deletePerson={deletePerson} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
