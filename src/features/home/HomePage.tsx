import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Header, Icon, Segment } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';
export default observer( function HomePage() {
    const { userStore, modalStore } = useStore();
    return (
        <Segment inverted textAlign='center' vertical className='masthead' >
            <Container text>
                <Header as='h1' inverted>
                    <Icon size='massive' name='new pied piper' alt='logo' style={{ marginBottom: 12 }} />
                    Nadlan App
                </Header>
                <Header as='h2' inverted content={'Welcome to Nadlan App'} />
                {userStore.isLoggerdIn ? (
                    <Button as={Link} to='/listings' size='huge' inverted>
                        Take me To Listings!
                    </Button>
                ) : (
                    <>
                        <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted>
                            Login!
                            </Button>
                            <Button onClick={() => modalStore.openModal(<RegisterForm />)} size='huge' inverted>
                            Register!
                        </Button>
                    </>
                    
                )}
            </Container>
        </Segment>
    )
})