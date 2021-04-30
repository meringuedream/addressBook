import './App.css';
import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {Form, Input} from 'semantic-ui-react-form-validator'
import {Button} from 'semantic-ui-react'

const Home = ({setIsLoggedIn}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoggedIn(true);
        history.push('/addressBook');
    }

    return (
        <div className="form-contact form-login">
            <h3>Access with your login account</h3>
            <Form
                autocomplete='off'
                onSubmit={handleSubmit}
                onError={()=>{history.go(0)}}>
                <Input 
                    style={{width: "22.375rem"}}
                    icon='at'
                    fluid
                    iconPosition='left'
                    required
                    type='text'
                    label='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='ivan@horvat.hr'
                    validators={['isEmail']}
                    errorMessages={['Please enter a valid e-mail address']}
                />
                <Input
                    style={{width: "22.375rem"}}
                    icon='lock'
                    fluid
                    iconPosition='left'
                    required
                    type='password'
                    label='Lozinka'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    validators={password ? ['minStringLength:6', 'matchRegexp:[0-9]+', 'matchRegexp:[-!#\$\+]+'] : []}
                    errorMessages={['Password must contain at least 6 characters','Password must contain at least one number', 'Password must contain one of the following symbols +-!#$']}
                />
                <Button
                    fluid
                    content='Login'
                    primary
                    disabled={!username || !password}
                />
            </Form>
        </div>
    )
}

export default Home
