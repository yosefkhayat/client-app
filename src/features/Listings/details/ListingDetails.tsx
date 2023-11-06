import React, { useEffect } from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import logo from '../dashboard/image.png';
import { useStore } from '../../../app/stores/store';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { Link, useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';


export default observer( function ListingDetails() {
    const { listingStore } = useStore();
    const { selectedListing: listing, loadListing, loadingInitial } = listingStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) loadListing(id);
    }, [id, loadListing])

    if (loadingInitial || !listing) return <LoadingComponent/>;

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
                    <Button as={Link} to={`/manage/${listing.id}`} basic color='blue' content='Edit' />
                    <Button as={Link} to='/listings' basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
})