import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Header, Icon, Segment } from 'semantic-ui-react'
export default function HomePage() {
    return (
        <Segment inverted textAlign='center' vertical className='masthead' >
            <Container text>
                <Header as='h1' inverted>
                    <Icon size='massive' name='new pied piper' alt='logo' style={{ marginBottom: 12 }} />
                    Nadlan App
                </Header>
                <Header as='h2' inverted content={ 'Welcome to Nadlan App' } />
                <Button as={Link} to='/Listings' size='huge' inverted>
                    Take me To Listing!
                </Button>
            </Container>
        </Segment>
    )
}