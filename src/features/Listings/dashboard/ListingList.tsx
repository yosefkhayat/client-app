import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Listing } from "../../../app/models/listing";
import React from 'react';
import logo from './image.png';

interface Props {
    listings: Listing[];
    selectListing: (id: string) => void;
    deleteListing: (id: string) => void;
}

export default function ListingList({ listings, selectListing, deleteListing }: Props) {
    return (
        <Segment>
            <Item.Group divided>
                
                {listings.map(listing => (
                    <Item key={listing.id}>
                        <Item.Image src={logo} />
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as='a'>{listing.address}, {listing.city}</Item.Header>
                            <Item.Content>
                                <Button onClick={() => selectListing(listing.id)} floated='right' content='View' color='blue' />
                                <Button onClick={() => deleteListing(listing.id)} floated='right' content='Delete' color='red' />
                            </Item.Content>
                        </Item.Content>
                    </Item>
                 ))}

                    
                
            </Item.Group>
        </Segment>
    )
}