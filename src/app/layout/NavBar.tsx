import React from 'react';
import { Button, Icon, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';



export default function NavBar() {

    const { listingStore } = useStore();

    return (
        <Menu inverted size='small' fixed='top'>
            <Menu.Item>
                <Icon name='new pied piper' circular inverted size='big' />   
            </Menu.Item>
            <Menu.Item
                name='Listings'
            />
            <Menu.Item>
                <Button onClick={() =>listingStore.openForm()} primary content='Create Listing' />
            </Menu.Item>

            
        </Menu>
    )
}