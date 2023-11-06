import { Header } from "semantic-ui-react";
import React, { Fragment } from 'react';
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import ListingListItem from "./ListingListItem";


export default observer(function ListingList() {

    const { listingStore } = useStore();
    const { groupedListings } = listingStore


    return (

        <>
            {groupedListings.map(([group, listings]) =>(
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group }
                    </Header>
                    
                            {listings.map(listing => (
                                <ListingListItem key={listing.id} listing={listing }/>
                            )) }
                        
                </Fragment>
            )) }
        </>

        
    )
})