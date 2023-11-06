import { Button, Item, Segment } from "semantic-ui-react";
import React, { SyntheticEvent, useState } from 'react';
import logo from './image.png';
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";


export default observer(function ListingList() {

    const { listingStore } = useStore();
    const { deleteListing, listingByDate, loading } = listingStore

    const [target, setTarget] = useState('');
    function handleListingDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteListing(id);
    }

    return (
        <Segment>
            <Item.Group divided>
                {listingByDate.map(listing => (
                    <Item key={listing.id}>
                        <Item.Image src={logo} />
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as='a'>{listing.address}, {listing.city}</Item.Header>
                            <Item.Content>
                                <Button as={Link} to={`/listings/${listing.id}`} floated='right' content='View' color='blue' />
                                <Button
                                    name={listing.id}
                                    loading={loading && target === listing.id}
                                    onClick={(e) => handleListingDelete(e, listing.id)}
                                    floated='right'
                                    content='Delete'
                                    color='red' />
                            </Item.Content>
                        </Item.Content>
                    </Item>
                 ))}      
            </Item.Group>
        </Segment>
    )
})