import React from 'react';
import { Button, Icon, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';



export default function NavBar() {


    return (
        <Menu inverted size='small' fixed='top'>
            <Menu.Item as={NavLink} to='/' exact header>
                <Icon name='new pied piper' circular inverted size='big' />
                Nadlan
            </Menu.Item>
            <Menu.Item
                as={NavLink} to='/listings'
                name='Listings'
            />
            <Menu.Item
                as={NavLink} to='/errors'
                name='Errors'
            />cd c
            <Menu.Item>
                <Button as={NavLink} to='/createListing' primary content='Create Listing' />
            </Menu.Item>

            
        </Menu>
    )
}