import './App.css';
import {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {List, Breadcrumb} from 'semantic-ui-react'

function Favorites({contactsToShow}) {
    
    const [contactData, setContactData] = useState(contactsToShow);

    const history = useHistory();

    useEffect(() => {setContactData(contactsToShow)}, [])

    return (
        <>
            <div className="title">
                <h2>Favorite contacts</h2>
            </div>
            <div className='backBreadcrumb'>
                  <Breadcrumb>
                    <Breadcrumb.Section link onClick={()=>{history.push('/addressBook')}}>Address Book</Breadcrumb.Section>
                    <Breadcrumb.Divider />
                    <Breadcrumb.Section active>Favorites</Breadcrumb.Section>
                </Breadcrumb>
            </div>
            <div className="addressBook">

                <List style={{width: '75vw', minWidth: '1110px'}} divided>
                    <List.Item style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} verticalAlign='middle'>
                        <List.Content style={{width: '10%', flex: '2'}} floated='left'><strong>First name</strong></List.Content>
                        <List.Content style={{width: '10%', flex: '2'}} floated='left'><strong>Last name</strong></List.Content>
                        <List.Content style={{width: '20%', flex: '2'}} floated='left'><strong>Date of birth</strong></List.Content>
                        <List.Content style={{width: '15%', flex: '2'}} floated='left'><strong>Mobile</strong></List.Content>
                        <List.Content style={{width: '15%', flex: '2'}} floated='left'><strong>Fixed</strong></List.Content>
                        <List.Content style={{width: '15%', flex: '3'}} floated='left'><strong>Email</strong></List.Content>
                        <List.Content style={{width: '15%', flex: '1'}} floated='left'><strong>Pager</strong></List.Content>
                    </List.Item>
                    {contactData && <>
                        {contactData.filter(item => item.favorite).map(item => (
                            <List.Item style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} key={item.id} verticalAlign='middle'>
                                <List.Content style={{width: '10%', flex: '2'}} floated='left'>{item.firstName}</List.Content>
                                <List.Content style={{width: '10%', flex: '2'}} floated='left'>{item.lastName}</List.Content>
                                <List.Content style={{width: '20%', flex: '2'}} floated='left'>{item.birthDate}</List.Content>
                                <List.Content style={{width: '15%', flex: '2'}} floated='left'>{item.contacts.find(item => item.type === 'Mobile').value}</List.Content>
                                <List.Content style={{width: '15%', flex: '2'}} floated='left'>{item.contacts.find(item => item.type === 'Fixed').value}</List.Content>
                                <List.Content style={{width: '15%', flex: '3'}} floated='left'>{item.contacts.find(item => item.type === 'Email').value}</List.Content>
                                <List.Content style={{width: '15%', flex: '1'}} floated='left'>{item.contacts.find(item => item.type === 'Pager').value}</List.Content>
                            </List.Item>
                        ))}
                        </>
                    }
                </List>
            </div>
        </>
    )
    }

export default Favorites