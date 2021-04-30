import './App.css';
import _ from 'lodash';
import faker from 'faker';
import arrowDown from './styles/arrow-down.jpg';
import arrowUp from './styles/arrow-up.jpg';
import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {Button, List, Input, Image, Pagination} from 'semantic-ui-react';
import { v4 as uuidv4 } from 'uuid';

function AddressBook({contactsToShow, handleToggleFavorite, handleAddRandom}) {

  const history = useHistory();
  const [searchInput, setSearchInput] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(contactsToShow);
  const [sortState, setSortState] = useState('noSort');
  const [randomGenerator, setRandomGenerator] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  useEffect(()=>{
    if (searchInput.length) {
      let test = filteredContacts.filter(item=>item.firstName.includes(searchInput) || item.lastName.includes(searchInput) || item.contacts.find(item => item.type === 'Email').value.includes(searchInput))
      setFilteredContacts(test);
    }
    else setFilteredContacts(contactsToShow);
  },[searchInput])

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredContacts.slice(indexOfFirstItem, indexOfLastItem);

  const maxPageNumbers = itemsPerPage && Math.ceil(filteredContacts.length / itemsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredContacts.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(()=>{
    setFilteredContacts(contactsToShow)
  }, [randomGenerator])

  const handleRandomGenerator = () => {

    let source = _.times(randomGenerator, () => ({
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

    handleAddRandom(source);
    setRandomGenerator(0);

    function randomDate(){
      let test = faker.date.past(105);
      let day = (test.getDate()) < 10 ? `0${test.getDate()}` : `${test.getDate()}`;
      let month = (test.getMonth()+1) < 10 ? `0${test.getMonth()+1}` : `${test.getMonth()+1}`;
      return `${day}-${month}-${test.getFullYear()}`
    }
  }

  const handleDetailsClick = (e) => {
    history.push(`/contact/details/${e.currentTarget.dataset.contactId}`)
  }

  const handleSortRequest = (e) => {
    let sortByLastName = [];

    switch(sortState) {
      case 'noSort':
        sortByLastName = filteredContacts.sort(sortAtoZ);
        setFilteredContacts(sortByLastName)
        setSortState('A-Z');
        break;
      case 'A-Z':
        sortByLastName = filteredContacts.sort(sortZtoA);
        setSortState('Z-A');
        setFilteredContacts(sortByLastName)
        break;
      case 'Z-A':
        setSortState('noSort');
        setFilteredContacts(JSON.parse(window.localStorage.getItem('items')));
        break;
      default:
        break;
    }

    function sortAtoZ( a, b ) {
      if ( a.lastName < b.lastName ){
        return -1;
      }
      if ( a.lastName > b.lastName ){
        return 1;
      }
      return 0;
    }
    function sortZtoA( a, b ) {
      if ( a.lastName < b.lastName ){
        return 1;
      }
      if ( a.lastName > b.lastName ){
        return -1;
      }
      return 0;
    }
  }

  return (
    <>
      <div className="title">
        <h2>Contact list</h2>
      </div>
    
    <div className="addressBook">

      <div className='search-input'>
        <Input
          icon='search'
          type='text'
          fluid
          placeholder='Search...'
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div className="addressList-buttons">
        
        <Button
        style={{marginRight: '10px'}}
        content='New contact'
        color='green'
        icon='plus'
        labelPosition='left'
        onClick = {()=>{history.push('/contact')}}
        />
        <Button
        content='Favorites'
        color='purple'
        icon='star'
        labelPosition='left'
        onClick = {()=>{history.push('/addressBook/favorites')}}
        />
      </div>
      <List style={{width: '75vw', minWidth: '1110px'}} divided>
        <List.Item style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} verticalAlign='middle'>
          <List.Content style={{display: 'flex', width: '15%', flex: '1'}} floated='left'>
            <strong>First name</strong>
          </List.Content>
          <List.Content style={{display: 'flex', width: '15%', flex: '1'}} floated='left' onClick={handleSortRequest}>
            <strong>Last name</strong>
            <Image style={{height: '1rem'}} hidden={sortState==='noSort'} src={sortState==='A-Z' ? arrowUp : arrowDown}></Image>
          </List.Content>
          <List.Content style={{display: 'flex', width: '15%', flex: '1'}} floated='left'>
            <strong>Date of birth</strong>
          </List.Content>
          <List.Content style={{display: 'flex', width: '15%', flex: '2.07'}} floated='left'>
            <strong>Email</strong>
          </List.Content>
        </List.Item>
      {currentItems.map((item)=>(
        <List.Item style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} key={item.id} verticalAlign='middle'>
          <List.Content style={{width: '15%', flex: '1'}} floated='left'>{item.firstName}</List.Content>
          <List.Content style={{width: '15%', flex: '1'}} floated='left'>{item.lastName}</List.Content>
          <List.Content style={{width: '15%', flex: '1'}} floated='left'>{item.birthDate}</List.Content>
          <List.Content style={{width: '40%', flex: '1'}} floated='left'>{item.contacts.find(item => item.type === 'Email').value}</List.Content>
          <List.Content style={{width: '15%', flex: '1', display: 'flex', justifyContent: 'flex-end'}} floated='right'>
          <Button.Group>
              <Button
                basic
                icon={{name: 'star outline', pointerEvents: 'none', color: item.favorite ? 'yellow' : 'black'}}
                onClick={()=>{handleToggleFavorite(item)}}
              >
              </Button>
            <Button
              icon={{name: 'ellipsis horizontal', pointerEvents: 'none' }}
              onClick={handleDetailsClick}
              data-contact-id={item.id}>
             </Button>
          </Button.Group>
          </List.Content>
        </List.Item>
        ))
      }      
      </List>
      <Pagination 
          activePage={currentPage}
          defaultActivePage={1}
          onPageChange={(e, pageInfo)=>{setCurrentPage(pageInfo.activePage)}}
          totalPages={maxPageNumbers}
          ellipsisItem={null}
        />
      <div className='random-generator'>
        <div style={{width: '100%'}}>Contact number per page
        <Button.Group fluid>
          <Button basic={itemsPerPage!=15} onClick={(e)=>{setItemsPerPage(Number(e.target.innerText))}}>15</Button>
          <Button basic={itemsPerPage!=30} onClick={(e)=>{setItemsPerPage(Number(e.target.innerText))}}>30</Button>
          <Button basic={itemsPerPage!=45} onClick={(e)=>{setItemsPerPage(Number(e.target.innerText))}}>45</Button>
        </Button.Group>
        </div>
        <div>
          <Input
            fluid
            size='small'
            type='number'
            icon='cube'
            min='0'
            value={randomGenerator}
            onChange={(e) => setRandomGenerator(e.target.value)}
          />
          <Button
            fluid
            size='mini'
            content='Generate contacts'
            onClick={handleRandomGenerator}
          >
          </Button>
        </div>
      </div>
    </div>
    </>
  );
}

export default AddressBook;