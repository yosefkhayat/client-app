import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import logo from '../dashboard/image.png';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';


export default function ListingDetails() {
    const { listingStore } = useStore();
    const { selectedListing: listing, openForm, cancelSelectedListing } = listingStore;
    if (!listing) return <LoadingComponent/>;

    return (
        <Card fluid>
            <Image src={logo} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{listing.address}</Card.Header>
                <Card.Meta>
                    <span className='date'>published in {listing.dateTime.toString()}</span>
                </Card.Meta>
                <Card.Description>
                    The propery is loacated in {listing.city} city, That is in the {listing.region},
                    and has a {listing.area}.
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Icon name='dollar sign' />
                {listing.price}
             </Card.Content>
            <Card.Content extra textAlign="center">
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(listing.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectedListing} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}