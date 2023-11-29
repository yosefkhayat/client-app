import { observer } from 'mobx-react-lite'
import React from 'react'
import { Header, Menu } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';

export default observer( function ListingFilter() {
    const { listingStore: { predicate, setPredicate } } = useStore();
    return (
        <>
            <Menu vertical size='large' style={{ width: '100%', marginTop: 25 }}>
                <Header icon='filter' attached color='teal' content='Filters' />
                <Menu.Item
                    content='All Listing'
                    active={predicate.has('all')}
                    onClick={() => setPredicate('all', 'true')}
                />
                <Menu.Item
                    content="By I Want to visit"
                    active={predicate.has('isVisiting')}
                    onClick={() => setPredicate('isVisiting', 'true')}
                />
                <Menu.Item
                    content="By My Listings"
                    active={predicate.has('isCreator')}
                    onClick={() => setPredicate('isCreator', 'true')}
                />
            </Menu>
            <Header />

        </>
    )

})