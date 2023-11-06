import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useHistory, useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { v4 as uuid } from 'uuid'

export default observer(function ListingForm() {
    const history = useHistory();
    const { listingStore } = useStore();
    const { selectedListing, createListing, updateListing, loading, loadListing, loadingInitial } = listingStore;
    const { id } = useParams<{ id: string }>();

    const [listing, setListing] = useState({
        id: '',
        address: '',
        city: '',
        area: 0,
        dateTime: new Date(),
        postalCode: '',
        price: 0,
        region: ''
    });

    useEffect(() => {
        if (id) loadListing(id).then(listing => setListing(listing!))
    }, [id, loadListing]);
    
    function handleSubmit() {
        if (listing.id.length === 0) {
            let newListing = {
                ...listing,
                id: uuid()
            };
            createListing(newListing).then(() => history.push(`/listings/${newListing.id}`))
        } else {
            updateListing(listing).then(() => history.push(`/listings/${listing.id}`))
        }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setListing({ ...listing, [name]: value })

    }

    if (loadingInitial) return <LoadingComponent content='Loading listing...'/>

    return (

        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='address' value={listing.address} name='address' onChange={handleInputChange} />
                <Form.Input placeholder='city' value={listing.city} name='city' onChange={handleInputChange} />
                <Form.Input placeholder='region' value={listing.region} name='region' onChange={handleInputChange} />
                <Form.Input placeholder='price' value={listing.price} name='price' onChange={handleInputChange} />
                <Form.Input placeholder='area' value={listing.area} name='area' onChange={handleInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to='/listings' floated='right' tyoe='button' content='Cancel' />
            </Form>
        </Segment>

    )
})