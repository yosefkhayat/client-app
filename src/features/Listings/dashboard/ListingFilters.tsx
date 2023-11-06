import React from 'react'
import { Header, Menu } from 'semantic-ui-react'

export default function ListingFilter() {

    return (
        <>
            <Menu vertical size='large' style={{ width: '100%' ,marginTop:26}}>
                <Header icon='filter' attached color='teal' content='Filters' />
                <Menu.Item content='All Listing' />
                <Menu.Item content='By City' />
                <Menu.Item content='By Date'/>
            </Menu>
            <Header />

        </>
    )

}