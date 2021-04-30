import './App.css';
import {useHistory} from 'react-router-dom';
import {useState} from 'react';
import {Form, Input} from 'semantic-ui-react-form-validator'
import {Button, Dropdown, Segment, List, Message, Breadcrumb, Confirm} from 'semantic-ui-react'
import {DateInput} from "semantic-ui-calendar-react";
import { v4 as uuidv4 } from 'uuid';

function Contact({addNew}) {

    const history = useHistory();
    const initialOptions = [{
        key: 'Mobile',
        text: 'Mobile',
        value: 'Mobile',
        icon: 'mobile alternate',
      },
      {
        key: 'Fixed',
        text: 'Fixed',
        value: 'Fixed',
        icon: 'phone',
      },
      {
        key: 'Email',
        text: 'Email',
        value: 'Email',
        icon: 'at',
      },
      {
        key: 'Pager',
        text: 'Pager',
        value: 'Pager',
        icon: 'user doctor',
      }];

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState(null);
    const [contactOptions, setContactOptions] = useState(initialOptions)
    const [contactType, setContactType] = useState('');
    const [contactData, setContactData] = useState('');
    const [fullContact, setFullContact] = useState([]);
    const [showSubformMessage, setShowSubformMessage] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [resetModalOpen, setResetModalOpen] = useState(false);
    const [unsavedModalOpen, setUnsavedModalOpen] = useState(false);


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
        Mobile: 'number',
        Fixed: 'number',
        Email: 'email',
        Pager: 'number'
    }

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
        remainingOptions.length ? setContactType(remainingOptions[0]['key']) : setContactType('');
    }

    const handleContactTypeRemove = (e) => {
        let newContactTypes = fullContact.filter(item => item.type != e.currentTarget.dataset.contactType);
        setFullContact(newContactTypes);
        const remainingOptions = [...contactOptions, keyToOption[e.currentTarget.dataset.contactType]];
        setContactOptions(remainingOptions);
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();
        if (contactOptions.length) {setShowSubformMessage(true); return}
        else {
        const newEntry = {id: uuidv4(), firstName: firstName, lastName: lastName, birthDate: birthDate, contacts: fullContact, favorite: false}
        addNew(newEntry);
        history.push('/addressBook');
        setContactData([]);
        }
    }

    const handleResetAll = () => {
        setFirstName('');
        setLastName('');
        setBirthDate(null);
        setContactType('');
        setContactData('');
        setFullContact([]);
        setContactOptions(initialOptions);
    }

    return (
        <>
            <div className="title">
                <h2>Add new contact</h2>
            </div>
            <div className='backBreadcrumb'>
                  <Breadcrumb>
                    <Breadcrumb.Section link onClick={()=>{fullContact.length ? setUnsavedModalOpen(true) : history.push('/addressBook')}}>Address Book</Breadcrumb.Section>
                    <Breadcrumb.Divider />
                    <Breadcrumb.Section active>New contact</Breadcrumb.Section>
                </Breadcrumb>
            </div>
            <div className="form-contact">
                <Form
                    autocomplete='off'
                    onClick={()=>{
                        console.log('on change forme');
                        setShowSubformMessage(false);
                        setShowSuccessMessage(false)}
                    }
                    onSubmit={handleSubmitForm}
                    >
                    <Input 
                        style={{width: "363px"}}
                        required
                        fluid
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
                        style={{width: "363px"}}
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
                    <Segment >
                        <Dropdown
                            placeholder='Contact type'
                            fluid
                            selection
                            options={contactOptions}
                            value={contactType}
                            onChange={(a, {name, value}) => handleContactTypeChange(name,value)}
                        />
                        <Input
                            type={keyToType[contactType]}
                            name={contactType && keyToOption[contactType]['text']}
                            placeholder={contactType ? contactType : ''}
                            value={contactData}
                            disabled={!contactType}
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
                    <div>
                    <Button
                        style={{width: "11rem"}}
                        content='Create'
                        floated='left'
                        positive
                        primary />
                    <Button
                        onClick={()=>{setResetModalOpen(true)}}
                        type='button'
                        style={{width: "11rem"}}
                        content='Reset form'
                        floated='right'
                        negative
                        secondary />
                    </div>
                    <Confirm
                        open={resetModalOpen}
                        onCancel={()=>{setResetModalOpen(false)}}
                        onConfirm={()=>{
                            setResetModalOpen(false);
                            handleResetAll();
                        }}
                        content='Are you sure you want to reset the form?'
                        cancelButton='Back'
                        confirmButtom='Yes'
                    />
                    <Confirm
                        open={unsavedModalOpen}
                        onCancel={()=>{setUnsavedModalOpen(false)}}
                        onConfirm={()=>{
                            setUnsavedModalOpen(false);
                            history.push('/addressBook');
                        }}
                        content='You have unsaved changes. Are you sure you want to leave the page?'
                        cancelButton='Back'
                        confirmButtom='Yes'
                    />
                </Form>
            </div>
        </>
    )
}

export default Contact;