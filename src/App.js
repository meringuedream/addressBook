import './App.css';
import {useState, useEffect} from 'react';
import Home from './Home';
import Nav from './Nav';
import Kontakt from './Contact';
import Adresar from './AddressBook';
import Detalji from './Details';
import Edit from './Edit';
import Omiljeni from './Favorites';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import faker from 'faker';

function App() {

  const initialState = JSON.parse(window.localStorage.getItem('items'));

  const initialItems = _.times(5, () => ({
    id: uuidv4(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    birthDate: randomDate(),
    contacts: [
      {
        type: 'Mobile',
        value: faker.phone.phoneNumber('+3859########')
      },
      {
        type: 'Fixed',
        value: faker.phone.phoneNumber('+385#########')
      },
      {
        type: 'Email',
        value: faker.internet.email()
      },
      {
        type: 'Pager',
        value: faker.phone.phoneNumber('##########')
      }
    ],
    favorite: faker.random.boolean()
  }))

  function randomDate(){
    let test = faker.date.past(105);
    let day = (test.getDate()) < 10 ? `0${test.getDate()}` : `${test.getDate()}`;
    let month = (test.getMonth()+1) < 10 ? `0${test.getMonth()+1}` : `${test.getMonth()+1}`;
    return `${day}-${month}-${test.getFullYear()}`
  }

// STATE

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [addressBook, setAddressBook] = useState(initialState && initialState.length ? initialState : initialItems);

  useEffect(() => {
    window.localStorage.setItem('items', JSON.stringify(addressBook));
  }, [addressBook])

  const handleAddNew = (newEntry) => {
    if (!newEntry) return 
    setAddressBook(prevContacts => {
      return [...prevContacts, newEntry]
    });
  }

  const handleDelete = (id) => {
    if (!id) return
    let newContacts = addressBook.filter(item => item.id != id)
    setAddressBook(newContacts);
  }

  const handleEdit = (updatedEntry) => {
    if (!updatedEntry) return
    let originalContacts = [...addressBook]
    let updatedContacts = originalContacts.map(obj => [updatedEntry].find(o => o.id === obj.id) || obj);
    setAddressBook(updatedContacts);
  }

  const handleToggleFavorite = (selectedEntry) => {
    selectedEntry.favorite = !selectedEntry.favorite;
    handleEdit(selectedEntry)
  }

  const handleAddRandom = (randomEntries) => {
    if (!randomEntries.length) return
    
    setAddressBook(prevContacts => {
      return [...prevContacts, ...randomEntries]
    })
  }

  return (  
    <Router>
    <div className="App">
      <Nav />
      <Switch>
        <Route path="/" exact >
          <Home setIsLoggedIn={setIsLoggedIn} />
        </Route>
        {isLoggedIn ? (
          <Route exact path="/addressBook">
          <Adresar contactsToShow={addressBook} handleToggleFavorite={handleToggleFavorite} handleAddRandom={handleAddRandom}/>
          </Route>
        ) : (
          <Redirect to="/" />
        )}

        {isLoggedIn ? (
          <Route exact path="/addressBook/favorites">
            <Omiljeni contactsToShow={addressBook} />
          </Route>
        ) : (
          <Redirect to="/" />
        )}
        {isLoggedIn ? (
          <Route path="/contact" exact>
            <Kontakt addNew={handleAddNew}/>
          </Route>
        ) : (
          <Redirect to="/" />
        )}

        {isLoggedIn ? (
          <Route path="/contact/details/:id/edit">
            <Edit contactsToShow={addressBook} handleEdit={handleEdit} />
          </Route>
        ) : (
          <Redirect to="/" />
        )}

        {isLoggedIn ? (
          <Route path="/contact/details/:id">
            <Detalji contactsToShow={addressBook} handleDelete={handleDelete} />
          </Route>
        ) : (
          <Redirect to="/" />
        )}
      
      </Switch>
    </div>
    </Router>
  );
}

export default App;
