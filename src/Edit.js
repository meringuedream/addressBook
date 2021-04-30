import './App.css';
import {useHistory, useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {Form, Input} from 'semantic-ui-react-form-validator'
import {Button, Dropdown, Segment, List, Message, Breadcrumb} from 'semantic-ui-react'
import {DateInput} from "semantic-ui-calendar-react";
import { v4 as uuidv4 } from 'uuid';

function Edit({contactsToShow, handleEdit}) {
    
    const history = useHistory();
    const { id } = useParams();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState(null);
    const [contactType, setContactType] = useState('');
    const [contactData, setContactData] = useState('');
    const [fullContact, setFullContact] = useState([]);
    const [contactOptions, setContactOptions] = useState([]);
    const [showSubformMessage, setShowSubformMessage] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const keyToIcon = {
        Mobile: 'mobile alternate',
        Fixed: 'phone',
        Email: 'at',
        Pager: 'user doctor'
    }

    const keyToOption = {
        Mobile: {
            key: 'Mobile',
            text: 'Mobile',
            value: 'Mobile',
            icon: 'mobile alternate'
        },
        Fixed: {
            key: 'Fixed',
            text: 'Fixed',
            value: 'Fixed',
            icon: 'phone',
        },
        Email: {
            key: 'Email',
            text: 'Email',
            value: 'Email',
            icon: 'at',
        },
        Pager: {
            key: 'Pager',
            text: 'Pager',
            value: 'Pager',
            icon: 'user doctor',
        }
    }

    const keyToType = {
        Mobile: 'tel',
        Fixed: 'tel',
        Email: 'email',
        Pager: 'tel'
    }

    useEffect(()=>{
        setFirstName(contactsToShow.find(item=>item.id===id).firstName);
        setLastName(contactsToShow.find(item=>item.id===id).lastName);
        setBirthDate(contactsToShow.find(item=>item.id===id).birthDate);
        setFullContact(contactsToShow.find(item=>item.id===id).contacts)
        },[]);

    const handleDateChange = (name, value) => {
        setBirthDate(value);
    }

    const handleContactTypeChange = (name, value) => {
        setContactType(value);
    }

    const handleContactDataChange = e => {
        setContactData(e.target.value)
    }

    const handleSubmitSubform = (e) => { 
        setFullContact(prevContacts => {
          return [...prevContacts, {type: contactType, value: contactData}]
        })
        const remainingOptions = contactOptions.filter(item => item.value != contactType);
        setContactOptions(remainingOptions)
        setContactData('');
    }

    const handleContactTypeRemove = (e) => {
        let newContactTypes = fullContact.filter(item => item.type != e.currentTarget.dataset.contactType);
        setFullContact(newContactTypes);
        const remainingOptions = [...contactOptions, keyToOption[e.currentTarget.dataset.contactType]];
        setContactOptions(remainingOptions);
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (contactOptions.length) {console.log(showSubformMessage); setShowSubformMessage(true); return}
        else {
        const updatedEntry = {id: id, firstName: firstName, lastName: lastName, birthDate: birthDate, contacts: fullContact}
        handleEdit(updatedEntry);
        history.push(`/contact/details/${id}`)
        }
    }

    return (
        <>
            <div className="title">
                <h2>Edit contact</h2>
            </div>
            <div className='backBreadcrumb'>
                  <Breadcrumb>
                    <Breadcrumb.Section link onClick={()=>{history.push('/addressBook')}}>Address Book</Breadcrumb.Section>
                    <Breadcrumb.Divider />
                    <Breadcrumb.Section link onClick={()=>{history.push(`/contact/details/${id}`)}}>Details</Breadcrumb.Section>
                    <Breadcrumb.Divider />
                    <Breadcrumb.Section active>Edit</Breadcrumb.Section>
                </Breadcrumb>
            </div>
            <div className="form-contact">
                <Form
                    autocomplete='off'
                    onClick={()=>{
                        setShowSubformMessage(false);
                        setShowSuccessMessage(false)}
                    }
                    onSubmit={handleSubmitForm}
                    style={{width: '100%', border: '1px solid #ccc', borderRadius: '5px', padding: '1.25rem'}}>
                    <Input 
                        style={{width: "22.375rem"}}
                        required
                        type='text'
                        label='Name'
                        name='firstName'
                        placeholder='Name'
                        value={firstName}
                        validators={['maxStringLength:100']}
                        errorMessages={['First name can contain maximum of 100 characters']}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <Input 
                        style={{width: "22.375rem"}}
                        required
                        type='text'
                        label='Last name'
                        name='lastName'
                        placeholder='Last name'
                        value={lastName}
                        validators={['maxStringLength:300']}
                        errorMessages={['Last name can contain maximum of 300 characters']}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <DateInput
                        dateFormat='DD-MM-YYYY'
                        required
                        clearable
                        closable
                        name="date"
                        label='Date of birth'
                        placeholder="Date of birth"
                        iconPosition="left"
                        value={birthDate}
                        onChange={(a, {name, value}) => handleDateChange(name,value)}
                    />
                    <Segment style={{maxWidth: "313.25px"}}>
                        <Dropdown
                            placeholder='Contact type'
                            fluid
                            selection
                            options={contactOptions}
                            value={contactType}
                            onChange={(a, {name, value}) => handleContactTypeChange(name,value)}
                        />
                        <Input
                            style={{width:'100%'}}
                            type={keyToType[contactType]}
                            name={contactType && keyToOption[contactType]['text']}
                            placeholder={contactType}
                            value={contactData}
                            onChange={handleContactDataChange}
                        />
                        <Button
                            onClick={handleSubmitSubform}
                            type='button'
                            style={{width: "5rem"}}
                            content='Add'
                            disabled={!contactData || !contactType || !contactOptions.length}
                            positive
                            primary />
                        <List>
                        {fullContact.map((item) => (
                            <List.Item style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} key={uuidv4()}>
                                <List.Icon name={`${keyToIcon[item.type]}`} />
                                <List.Content>{item.value}</List.Content>
                                <Button
                                    data-contact-type={item.type}
                                    size='mini'
                                    type='button'
                                    icon={{name: 'delete', pointerEvents: 'none' }}
                                    onClick={handleContactTypeRemove}>
                                </Button>
                            </List.Item>
                        ))}
                        </List>
                        <Message
                            visible={showSubformMessage}
                            warning
                            header='One or more contact types missing'
                            content='New contact cannot be added until all contact type fields are filled.'
                        />
                        <Message
                            style={{width: '100%'}}
                            visible={showSuccessMessage}
                            success
                            header='Contact successfully updated!'
                            content='You can make new changes or use the navigation bar.'
                        />
                    </Segment>
                    <Button
                        style={{width: "10rem"}}
                        content='Update'
                        floated='left'
                        positive
                        primary />
                    <Button
                        onClick={()=>{history.go(-1)}}
                        type='button'
                        style={{width: "10rem"}}
                        content='Back'
                        floated='right'
                    />
                </Form>
            </div>
        </>
    )
}

export default Edit;