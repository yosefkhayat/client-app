import React from 'react';
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react';
import { Listing } from '../../../app/models/listing';
import { Link } from 'react-router-dom';
import logo from './image.png';
import ListingListItemVisitor from './ListingListItemVisitor';


interface Props {
    listing: Listing
}


export default function ListingListItem({ listing }: Props) {

    return (
        <Segment.Group>
            <Segment>
                {listing.isCancelled &&
                    <Label attached='top' color='red' content='On Hold' style={{ textAlign:'center'} }/>
                }
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' rounded src={ listing.creator?.image || logo } />
                        <Item.Content>
                            <Item.Header as={Link} to={`/listings/${listing.id}`}>
                                {listing.address}
                            </Item.Header>
                            <Item.Description>postal:{listing.postalCode}, {listing.city} and created by <Link to={`/profiles/${listing.creatorUsername}`}>{listing.creator?.displayName}</Link> </Item.Description>
                                {listing.isCreator && (
                                    <Item.Description>
                                        <Label basic color='orange'>
                                            you created this listing
                                        </Label>
                                    </Item.Description>
                                )}
                                {listing.isVisiting && !listing.isCreator && (
                                    <Item.Description>
                                        <Label basic color='green'>
                                            you want to visit this listing
                                        </Label>
                                    </Item.Description>
                                )}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <Item>
                    <span>
                        <Icon name='shekel sign' /> {listing.price}
                        <Icon name='marker' /> {listing.region} region
                    </span>
                </Item>
                <Item >
                    <Icon name='info' />{listing.description}
                </Item>
                
            </Segment>
            <Segment secondary>
                <ListingListItemVisitor visitors={listing.visitors!} />
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