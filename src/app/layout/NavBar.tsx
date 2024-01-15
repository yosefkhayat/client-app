import React from 'react';
import { Button, Icon, Menu, Image, Dropdown, Container} from 'semantic-ui-react';
import { Link, NavLink } from 'react-router-dom';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';



export default observer( function NavBar() {
    const { userStore: { user, logout } } = useStore();

    return (
        <Menu inverted size='small' fixed='top' >

            
            <Menu.Item as={NavLink} to='/' exact header>
                <Icon name='new pied piper' circular inverted size='big' />
                Nadlan
            </Menu.Item>
            <Menu.Item
                as={NavLink} to='/listings'
                name='Listings'
            />
            {
                user?.roles.includes("Admin") && (
                    <>
                        <Menu.Item
                            as={NavLink} to='/errors'
                            name='Errors'
                        />
                        <Menu.Item
                            as={NavLink} to='/management'
                            name='User Management'
                        />
                    </>
                    
            )}

            <Menu.Item >
                <Button as={NavLink} to='/createListing' primary content='Create Listing' />
            </Menu.Item>
            <Menu.Item position='right'>
                <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                <Dropdown pointing='top right' text={user?.displayName}>
                    <Dropdown.Menu>
                        <Dropdown.Item as={Link} to={`/profiles/${user?.username}`}
                            text='My Profile' icon='user' />
                        <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                    </Dropdown.Menu>
                    
                </Dropdown>
            </Menu.Item>
            
            
        </Menu>
    )
})