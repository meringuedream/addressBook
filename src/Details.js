import './App.css';
import {useState, useEffect} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {Button, List, Breadcrumb, Confirm} from 'semantic-ui-react'

function Details({contactsToShow, handleDelete}) {
    
    const { id } = useParams();
    const [contactData, setContactData] = useState(contactsToShow);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);

    const history = useHistory();

    useEffect(() => {setContactData(contactsToShow)}, [])

    return (
        <>
            <div className="title">
                <h2>Contact details</h2>
            </div>
            <div className='backBreadcrumb'>
                  <Breadcrumb>
                    <Breadcrumb.Section link onClick={()=>{history.push('/addressBook')}}>Address Book</Breadcrumb.Section>
                    <Breadcrumb.Divider />
                    <Breadcrumb.Section active>Details</Breadcrumb.Section>
                </Breadcrumb>
            </div>
            <div className="addressBook">
                <div className='addressList-buttons'>
                    <Button
                        content='Edit'
                        color='yellow'
                        icon='edit'
                        labelPosition='left'
                        onClick = {()=>{
                            history.push(`/contact/details/${id}/edit`)}
                        }
                    />
                    <Button
                        content='Delete'
                        negative
                        icon='user delete'
                        labelPosition='left'
                        onClick={()=>{setDeleteModalOpen(true)}}
                    />
                </div>
                <Confirm
                    open={deleteModalOpen}
                    onCancel={()=>{setDeleteModalOpen(false)}}
                    onConfirm={()=>{
                        setDeleteModalOpen(false);
                        handleDelete(id);
                        history.push('/addressBook')
                    }}
                    content='Are you sure you want to delete this contact?'
                    cancelButton='Back'
                    confirmButtom='Yes'
                />
                <List style={{width: '75vw', minWidth: '1110px'}} divided>
                    <List.Item style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} verticalAlign='middle'>
                        <List.Content style={{width: '10%', flex: '1'}} floated='left'><strong>First name</strong></List.Content>
                        <List.Content style={{width: '10%', flex: '1'}} floated='left'><strong>Last name</strong></List.Content>
                        <List.Content style={{width: '20%', flex: '2'}} floated='left'><strong>Date of birth</strong></List.Content>
                        <List.Content style={{width: '15%', flex: '2'}} floated='left'><strong>Mobile</strong></List.Content>
                        <List.Content style={{width: '15%', flex: '2'}} floated='left'><strong>Fixed</strong></List.Content>
                        <List.Content style={{width: '15%', flex: '2'}} floated='left'><strong>Email</strong></List.Content>
                        <List.Content style={{width: '15%', flex: '2'}} floated='left'><strong>Pager</strong></List.Content>
                    </List.Item>
                    <List.Item style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}} key={id} verticalAlign='middle'>
                        {contactData && <>
                            {contactData.filter(item => item.id === id).map(item => (
                                <>
                                <List.Content style={{width: '10%', flex: '1'}} floated='left'>{item.firstName}</List.Content>
                                <List.Content style={{width: '10%', flex: '1'}} floated='left'>{item.lastName}</List.Content>
                                <List.Content style={{width: '20%', flex: '2'}} floated='left'>{item.birthDate}</List.Content>
                                <List.Content style={{width: '15%', flex: '2'}} floated='left'>{item.contacts.find(item => item.type === 'Mobile').value}</List.Content>
                                <List.Content style={{width: '15%', flex: '2'}} floated='left'>{item.contacts.find(item => item.type === 'Fixed').value}</List.Content>
                                <List.Content style={{width: '15%', flex: '2'}} floated='left'>{item.contacts.find(item => item.type === 'Email').value}</List.Content>
                                <List.Content style={{width: '15%', flex: '2'}} floated='left'>{item.contacts.find(item => item.type === 'Pager').value}</List.Content>
                                </>
                            ))}
                            </>
                        }
                    </List.Item>
                </List>
            </div>
        </>
    )
    }

export default Details