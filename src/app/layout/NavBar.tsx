import React from 'react';
import { Button, Icon, Menu } from 'semantic-ui-react';

interface Props {
    openForm: () => void;
}

export default function NavBar({openForm }:Props) {
    return (
        <Menu inverted size='small' fixed='top'>
            <Menu.Item>
                <Icon name='new pied piper' circular inverted size='big' />   
            </Menu.Item>
            <Menu.Item
                name='Listings'
            />
            <Menu.Item>
                <Button onClick={openForm} primary content='Create Listing' />
            </Menu.Item>

            
        </Menu>
    )
}