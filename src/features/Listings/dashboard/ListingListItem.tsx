import React from 'react';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { Listing } from '../../../app/models/listing';
import { Link } from 'react-router-dom';

import logo from './image.png';

interface Props {
    listing: Listing
}


export default function ListingListItem({ listing }: Props) {

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' rounded src={logo} />
                        <Item.Content>
                            <Item.Header as={Link} to={`/listings/${listing.id}`}>
                                {listing.address}
                                <Item.Description>postal:{listing.postalCode}, {listing.city}</Item.Description>
                            </Item.Header>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='shekel sign' /> {listing.price}
                    <Icon name='marker' /> {listing.region} region
                </span>
            </Segment>
            <Segment secondary>
                Description will go here
            </Segment>
            <Segment clearing>
                <Button
                    as={Link}
                    to={`/listings/${listing.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                    />
            </Segment>
        </Segment.Group>
    )
}