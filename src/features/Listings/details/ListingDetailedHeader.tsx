import { observer } from 'mobx-react-lite';
import React from 'react'
import { Button, Header, Item, Segment, Image } from 'semantic-ui-react'
import logo from '../dashboard/image.png';
import { Listing } from '../../../app/models/listing';

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
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
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
                <Button color='teal'>Request vist </Button>
                <Button>Cancel Request</Button>
                <Button color='orange' floated='right'>
                    Manage Listing
                </Button>
            </Segment>
        </Segment.Group>
    )
})
