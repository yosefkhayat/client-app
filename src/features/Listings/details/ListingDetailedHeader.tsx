import { observer } from 'mobx-react-lite';
import React from 'react'
import { Button, Header, Item, Segment, Image, Label } from 'semantic-ui-react'
import logo from '../dashboard/image.png';
import { Listing } from '../../../app/models/listing';
import { Link } from 'react-router-dom';
import { useStore } from '../../../app/stores/store';

const listingImageStyle = {
    filter: 'brightness(30%)'
};

const listingImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    listing: Listing
}

export default observer(function ActivityDetailedHeader({ listing }: Props) {
    const { listingStore: { updateVisitor, loading,cancelVisitaionToggle } } = useStore();
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                {listing.isCancelled &&
                    <Label style={{ position: 'absolute', zIndex: 1000, left: -14, top: 20 }}
                        ribbon color='red' content='On Hold' />
                }
                <Image src={logo} fluid style={listingImageStyle} />
                <Segment style={listingImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={listing.address}
                                    style={{ color: 'white' }}
                                />
                                <p>postal:{listing.postalCode}, {listing.city}</p>
                                <p>
                                    That is located in the {listing.region} region
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>

                {listing.isCreator ? (
                    <>
                        <Button
                            color={listing.isCancelled ? 'green' : 'red'}
                            floted='left'
                            basic
                            content={listing.isCancelled ? 'Re-active Visitation' : 'Cancel Visitation'}
                            onClick={cancelVisitaionToggle}
                            loading={loading}
                            />
                        <Button
                            disabled={listing.isCancelled}
                            as={Link} to={`/manage/${listing.id}`}
                            color='orange'
                            floated='right'>
                            Manage Listing
                        </Button>


                    
                    </>                ) : listing.isVisiting ? (
                    <Button loading={loading} onClick={updateVisitor}>Cancel Request</Button>
                    ) : (
                            <Button
                                disabled={listing.isCancelled}
                                loading={loading}
                                onClick={updateVisitor}
                                color='teal'>
                                Request vist
                            </Button>
                )}
            </Segment>
        </Segment.Group>
    )
})
